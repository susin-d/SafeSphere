
import React from 'react';
import { Resource } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { t } = useTranslation();
  const isTelLink = resource.link.startsWith('tel:');
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="font-heading text-xl font-bold mb-2 text-accent-empower">{resource.title}</h3>
        <p className="text-neutral-dark">{resource.description}</p>
      </div>
      <div className="p-6 bg-gray-50">
        <a
          href={resource.link}
          target={isTelLink ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="font-bold text-accent-secondary hover:underline"
        >
          {isTelLink ? t('resources.callNow') : t('resources.learnMore')} &rarr;
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;
