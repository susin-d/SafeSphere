
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from './useTranslation';

const routeTitleMap: { [key: string]: string } = {
  '/': 'pageTitles.home',
  '/chat': 'pageTitles.chat',
  '/resources': 'pageTitles.resources',
  '/about': 'pageTitles.about',
  '/privacy': 'pageTitles.privacy',
  '/contact': 'pageTitles.contact',
  '/help': 'pageTitles.help',
};

export const usePageTitle = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const path = location.pathname;
    // Default to home title if the path is not found in the map
    const titleKey = routeTitleMap[path] || 'pageTitles.home'; 
    document.title = t(titleKey);
  }, [location, t]);
};
