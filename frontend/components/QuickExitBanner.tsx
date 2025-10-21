
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const QuickExitBanner: React.FC = () => {
  const { t } = useTranslation();
  const handleExit = () => {
    // replace() removes the current page from the session history,
    // so the user can't use the back button to return.
    window.location.replace('https://www.google.com');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-accent-empower text-white py-1 px-4 flex justify-between items-center text-sm">
      <span className="font-semibold">{t('quickExit.safetyTip')}</span>
      <span>{t('quickExit.message')}</span>
      <button
        onClick={handleExit}
        className="bg-white text-accent-empower font-bold py-1 px-3 rounded-full hover:bg-gray-200 transition-colors text-xs"
      >
        {t('quickExit.button')}
      </button>
    </div>
  );
};

export default QuickExitBanner;
