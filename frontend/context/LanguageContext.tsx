import React, { createContext, useState, useCallback, ReactNode } from 'react';
import en from '../language/translations/en.json' with { type: 'json' };
import hi from '../language/translations/hi.json' with { type: 'json' };
import as from '../language/translations/as.json' with { type: 'json' };
import bn from '../language/translations/bn.json' with { type: 'json' };
import brx from '../language/translations/brx.json' with { type: 'json' };
import doi from '../language/translations/doi.json' with { type: 'json' };
import gu from '../language/translations/gu.json' with { type: 'json' };
import kn from '../language/translations/kn.json' with { type: 'json' };
import ks from '../language/translations/ks.json' with { type: 'json' };
import kok from '../language/translations/kok.json' with { type: 'json' };
import mai from '../language/translations/mai.json' with { type: 'json' };
import ml from '../language/translations/ml.json' with { type: 'json' };
import mni from '../language/translations/mni.json' with { type: 'json' };
import mr from '../language/translations/mr.json' with { type: 'json' };
import ne from '../language/translations/ne.json' with { type: 'json' };
import or from '../language/translations/or.json' with { type: 'json' };
import pa from '../language/translations/pa.json' with { type: 'json' };
import sa from '../language/translations/sa.json' with { type: 'json' };
import sat from '../language/translations/sat.json' with { type: 'json' };
import sd from '../language/translations/sd.json' with { type: 'json' };
import ta from '../language/translations/ta.json' with { type: 'json' };
import te from '../language/translations/te.json' with { type: 'json' };
import ur from '../language/translations/ur.json' with { type: 'json' };

type Translations = { [key: string]: any };

const translationsMap: { [key: string]: Translations } = {
  en, hi, as, bn, brx, doi, gu, kn, ks, kok, mai, ml, mni, mr, ne, or, pa, sa, sat, sd, ta, te, ur
};

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  translations: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedTranslation = (trans: Translations, key: string): any => {
  return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), trans);
};

const getInitialLanguage = (): string => {
  // 1. Prioritize user's previously selected language
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage && translationsMap[storedLanguage]) {
    return storedLanguage;
  }

  // 2. Detect browser language and check if we support it
  const browserLanguage = navigator.language.split('-')[0]; // e.g., 'en-US' becomes 'en'
  if (browserLanguage && translationsMap[browserLanguage]) {
    return browserLanguage;
  }

  // 3. Default to English
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(getInitialLanguage());

  const setLanguage = (lang: string) => {
    if (translationsMap[lang]) {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    } else {
        console.warn(`Language "${lang}" is not supported. Falling back to "en".`);
        const fallbackLang = 'en';
        setLanguageState(fallbackLang);
        localStorage.setItem('language', fallbackLang);
    }
  };
  
  const currentTranslations = translationsMap[language] || en;

  const t = useCallback((key: string, options?: { [key: string]: string | number }): string => {
    let translation = getNestedTranslation(currentTranslations, key);

    // Fallback to English if translation is not a string in the current language
    if (typeof translation !== 'string') {
      translation = getNestedTranslation(en, key);
    }
    
    // If the translation is still not a string (i.e., not found in English either), return the key
    if (typeof translation !== 'string') {
      console.warn(`Translation key "${key}" not found in language "${language}" or fallback "en".`);
      return key;
    }

    let text = translation;

    // Replace placeholders like {{year}}
    if (options) {
      Object.keys(options).forEach(optKey => {
        text = text.replace(new RegExp(`{{${optKey}}}`, 'g'), String(options[optKey]));
      });
    }

    return text;
  }, [language, currentTranslations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};