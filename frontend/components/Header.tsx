import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { languages } from '../language/languages.ts';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useTranslation();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-heading font-semibold transition-colors duration-300 ${
      isActive ? 'text-accent-empower' : 'text-neutral-dark hover:text-accent-empower'
    }`;
    
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="bg-neutral-light shadow-md sticky top-8 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold font-heading text-accent-empower">
          SafeSphere
        </NavLink>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={navLinkClasses}>{t('nav.home')}</NavLink>
          <NavLink to="/chat" className={navLinkClasses}>{t('nav.chat')}</NavLink>
          <NavLink to="/resources" className={navLinkClasses}>{t('nav.resources')}</NavLink>
          <NavLink to="/about" className={navLinkClasses}>{t('nav.about')}</NavLink>
        </nav>
        <div className="flex items-center gap-4">
            <select
                onChange={handleLanguageChange}
                value={language}
                className="bg-neutral-light border-2 border-primary-pink rounded-full text-neutral-dark p-2 focus:outline-none focus:border-accent-secondary"
                aria-label="Select language"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <button 
                onClick={() => navigate('/help')}
                className="bg-accent-empower text-white font-bold font-heading py-2 px-4 rounded-full hover:opacity-90 transition-opacity"
            >
                {t('nav.getHelpNow')}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;