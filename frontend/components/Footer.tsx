
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary-pink text-neutral-dark">
      <div className="container mx-auto px-6 py-4 text-center">
        <div className="flex justify-center space-x-6">
          <Link to="/about" className="hover:text-accent-empower transition-colors">{t('footer.about')}</Link>
          <Link to="/privacy" className="hover:text-accent-empower transition-colors">{t('footer.privacy')}</Link>
          <Link to="/contact" className="hover:text-accent-empower transition-colors">{t('footer.contact')}</Link>
        </div>
        <p className="mt-4 text-sm">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
};

export default Footer;
