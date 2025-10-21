
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-neutral-light py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-center text-neutral-dark mb-10">
          {t('privacy.title')}
        </h1>
        
        <div className="bg-white p-8 rounded-lg shadow-lg prose max-w-none text-neutral-dark">
          <p><em>{t('privacy.lastUpdated', { date: new Date().toLocaleDateString() })}</em></p>
          
          <p>{t('privacy.intro')}</p>

          <h2>{t('privacy.section1.title')}</h2>
          <p>{t('privacy.section1.text')}</p>
          <ul>
            <li><strong>{t('privacy.section1.item1.title')}:</strong> {t('privacy.section1.item1.text')}</li>
            <li><strong>{t('privacy.section1.item2.title')}:</strong> {t('privacy.section1.item2.text')}</li>
          </ul>

          <h2>{t('privacy.section2.title')}</h2>
          <p>{t('privacy.section2.text')}</p>
          <ul>
            <li><strong>{t('privacy.section2.item1.title')}:</strong> {t('privacy.section2.item1.text')}</li>
          </ul>

          <h2>{t('privacy.section3.title')}</h2>
          <p>{t('privacy.section3.text')}</p>
          <ul>
            <li>{t('privacy.section3.item1')}</li>
            <li>{t('privacy.section3.item2')}</li>
          </ul>

          <h2>{t('privacy.section4.title')}</h2>
          <p>{t('privacy.section4.text')}</p>

          <h2>{t('privacy.section5.title')}</h2>
          <p>{t('privacy.section5.text')}</p>
          
          <h2>{t('privacy.section6.title')}</h2>
          <p>{t('privacy.section6.text')}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
