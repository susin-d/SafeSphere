
export interface BotResponse {
  answer_text: string;
  quotations: {
    text: string;
    citation: string;
  }[];
  confidence: 'High' | 'Medium' | 'Low';
  sources: {
    title: string;
    section: string;
    url: string;
  }[];
  escalate_to_human: boolean;
}

export interface UserMessage {
  sender: 'user';
  text: string;
}

// Refactored BotMessage to be a discriminated union
interface SuccessfulBotMessage {
  sender: 'bot';
  status: 'success';
  response: BotResponse;
}

interface ErrorBotMessage {
  sender: 'bot';
  status: 'error';
  error: string;
}

export type BotMessage = SuccessfulBotMessage | ErrorBotMessage;

export type ChatMessage = UserMessage | BotMessage;


export enum ResourceCategory {
  OFFICIAL_PORTALS = 'OFFICIAL_PORTALS',
  LEGAL_DATABASES = 'LEGAL_DATABASES',
  HELPLINE_DIRECTORY = 'HELPLINE_DIRECTORY',
}

export interface Resource {
  id: number;
  category: ResourceCategory;
  title: string;
  description: string;
  link: string;
}
