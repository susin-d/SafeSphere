
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, FileText } from 'lucide-react';
import { ChatMessage, BotResponse } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const ChatbotPage: React.FC = () => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [input, setInput] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const { t, language } = useTranslation();

  useEffect(() => {
     // Initialize with welcome message
     setMessages([
       {
         sender: 'bot',
         status: 'success',
         response: {
           answer_text: t('chatbot.initialMessage'),
           quotations: [],
           confidence: 'High',
           sources: [],
           escalate_to_human: false,
         },
       },
     ]);
   }, [t, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const chatRequest = {
        message: currentInput,
        language: language
      };

      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const chatResponse = await response.json();

      // For now, create a basic BotResponse structure since backend returns simple ChatResponse
      const botResponse: BotResponse = {
        answer_text: chatResponse.reply,
        quotations: [],
        confidence: 'High',
        sources: [],
        escalate_to_human: false,
      };

      setMessages(prev => [...prev, { sender: 'bot', status: 'success', response: botResponse }]);

    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage = err instanceof Error ? err.message : t('chatbot.error.unknown');
      setError(errorMessage);
      setMessages(prev => [...prev, { sender: 'bot', status: 'error', error: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: 'High' | 'Medium' | 'Low') => {
    switch (confidence) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAnswerWithCitations = (answerText: string, sources: BotResponse['sources']) => {
    if (!sources || sources.length === 0) {
      return <p className="whitespace-pre-wrap">{answerText}</p>;
    }

    const citationRegex = /(\[Source — .*? \| .*? \| .*?\])/g;
    const parts = answerText.split(citationRegex);

    return (
      <p className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (part.match(citationRegex)) {
            try {
              const cleanedPart = part.replace('[Source — ', '').replace(']', '');
              const [title, section] = cleanedPart.split(' | ').map(s => s.trim());
              
              const source = sources.find(
                s => s.title.trim() === title && s.section.trim() === section
              );

              if (source) {
                return (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-empower font-bold hover:underline"
                  >
                    {`[${title} | ${section}]`}
                  </a>
                );
              }
            } catch (e) {
              console.error("Failed to parse citation:", part, e);
            }
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </p>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-neutral-light">
      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-10 h-10 rounded-full bg-accent-empower flex items-center justify-center text-white flex-shrink-0">
                <Bot size={24} />
              </div>
            )}
            
            <div className={`max-w-xl p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-accent-secondary text-white rounded-br-none' : 'bg-white text-neutral-dark rounded-bl-none'}`}>
              {msg.sender === 'user' ? (
                <p>{msg.text}</p>
              ) : msg.status === 'success' ? (
                <div className="space-y-4">
                  {renderAnswerWithCitations(msg.response.answer_text, msg.response.sources)}
                  
                  {msg.response.quotations && msg.response.quotations.length > 0 && (
                    <div>
                      <h4 className="font-bold text-sm mb-2 text-accent-empower">{t('chatbot.quotationsLabel')}:</h4>
                      <div className="space-y-2">
                        {msg.response.quotations.map((q, i) => (
                          <blockquote key={i} className="border-l-4 border-primary-pink pl-4 text-sm italic">
                            <p>"{q.text}"</p>
                            <cite className="text-xs not-italic text-gray-500 block mt-1">{q.citation}</cite>
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.response.sources && msg.response.sources.length > 0 && (
                    <div>
                      <h4 className="font-bold text-sm mb-2 text-accent-empower">{t('chatbot.sourcesLabel')}:</h4>
                      <ul className="space-y-1 text-sm list-inside">
                        {msg.response.sources.map((s, i) => (
                           <li key={i} className="flex items-start">
                             <FileText className="w-4 h-4 mr-2 mt-1 text-accent-secondary flex-shrink-0" />
                             <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                               {s.title} - {s.section}
                             </a>
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
                     <span className={`px-2 py-1 rounded-full font-semibold ${getConfidenceColor(msg.response.confidence)}`}>
                        {t('chatbot.confidenceLabel')}: {msg.response.confidence}
                      </span>
                      {msg.response.escalate_to_human && (
                          <span className="text-red-600 font-bold">{t('chatbot.escalationRecommended')}</span>
                      )}
                  </div>
                  {msg.response.confidence === 'Low' ? (
                    <div className="mt-4 p-3 bg-accent-empower/10 border-l-4 border-accent-empower text-accent-empower" role="alert">
                        <p className="font-bold">{t('chatbot.lowConfidence.title')}</p>
                        <p className="text-sm">{t('chatbot.lowConfidence.text')}</p>
                    </div>
                  ) : msg.response.confidence === 'Medium' && (
                     <p className="text-xs text-gray-500 mt-2">{t('chatbot.consultAdvocate')}</p>
                  )}
                </div>
              ) : (
                <p className="text-red-500">{msg.error}</p>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-10 h-10 rounded-full bg-accent-secondary flex items-center justify-center text-white flex-shrink-0">
                <User size={24} />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-4 justify-start">
             <div className="w-10 h-10 rounded-full bg-accent-empower flex items-center justify-center text-white flex-shrink-0">
                <Bot size={24} />
              </div>
              <div className="max-w-xl p-4 rounded-2xl bg-white text-neutral-dark rounded-bl-none">
                  <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      <span>{t('chatbot.loading')}</span>
                  </div>
              </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 md:p-6 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatbot.inputPlaceholder')}
            className="flex-grow p-3 rounded-full border-2 border-primary-pink bg-neutral-light focus:bg-white focus:border-accent-empower focus:ring-accent-empower transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-accent-empower text-white rounded-full p-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={24} />
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        <p className="text-xs text-gray-500 mt-2 text-center">{t('chatbot.disclaimer')}</p>
      </div>
    </div>
  );
};

export default ChatbotPage;
