
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-neutral-light py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-center text-neutral-dark mb-10">
          {t('about.title')}
        </h1>
        
        <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 text-lg text-neutral-dark">
          <div className="p-8 border-l-4 border-accent-empower bg-primary-pink/20 rounded-r-lg">
            <h2 className="text-3xl font-bold font-heading text-accent-empower mb-4">{t('about.mission.title')}</h2>
            <p>
              {t('about.mission.text')}
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">{t('about.privacy.title')}</h2>
            <p>
              {t('about.privacy.text')}
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>{t('about.privacy.item1.title')}:</strong> {t('about.privacy.item1.text')}</li>
              <li><strong>{t('about.privacy.item2.title')}:</strong> {t('about.privacy.item2.text')}</li>
              <li><strong>{t('about.privacy.item3.title')}:</strong> {t('about.privacy.item3.text')}</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">{t('about.team.title')}</h2>
            <p>
              {t('about.team.text')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
