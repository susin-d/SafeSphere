
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, BookOpen, Shield } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-neutral-light">
      {/* Hero Section */}
      <section className="bg-primary-pink">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-neutral-dark leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="mt-4 text-xl text-neutral-dark max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => navigate('/chat')}
              className="bg-accent-empower text-white font-bold font-heading py-3 px-8 rounded-full text-lg hover:opacity-90 transition-opacity transform hover:scale-105"
            >
              {t('home.hero.chatButton')}
            </button>
            <button 
              onClick={() => navigate('/resources')}
              className="bg-accent-secondary text-white font-bold font-heading py-3 px-8 rounded-full text-lg hover:opacity-90 transition-opacity transform hover:scale-105"
            >
              {t('home.hero.resourcesButton')}
            </button>
          </div>
        </div>
      </section>

      {/* "What We Offer" Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-heading text-center text-neutral-dark mb-12">{t('home.offer.title')}</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary-pink p-5 rounded-full mb-4">
                 <MessageSquare className="w-12 h-12 text-accent-empower" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2">{t('home.offer.chat.title')}</h3>
              <p>{t('home.offer.chat.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-pink p-5 rounded-full mb-4">
                <BookOpen className="w-12 h-12 text-accent-empower" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2">{t('home.offer.hub.title')}</h3>
              <p>{t('home.offer.hub.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-pink p-5 rounded-full mb-4">
                <Shield className="w-12 h-12 text-accent-empower" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2">{t('home.offer.support.title')}</h3>
              <p>{t('home.offer.support.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
