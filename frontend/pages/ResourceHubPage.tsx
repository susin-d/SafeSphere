import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Resource, ResourceCategory } from '../types';
import ResourceCard from '../components/ResourceCard';
import { useTranslation } from '../hooks/useTranslation';

const ResourceHubPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ResourceCategory[]>([]);
  const { t, translations } = useTranslation();

  const categories = Object.values(ResourceCategory);
  
  // Get resources from translation file
  const resources: Resource[] = useMemo(() => {
    return (translations?.resourceList || []) as Resource[];
  }, [translations]);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(resource.category);
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategories, resources]);

  const handleCategoryChange = (category: ResourceCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  return (
    <div className="bg-neutral-light py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-neutral-dark mb-4">
            {t('resources.title')}
          </h1>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-10 p-6 bg-primary-pink rounded-lg shadow-md space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <input
                type="text"
                placeholder={t('resources.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-12 rounded-full border-2 border-transparent bg-neutral-light focus:bg-white focus:border-accent-empower focus:ring-accent-empower transition-colors"
                aria-label={t('resources.searchPlaceholder')}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
            <button
              onClick={handleClearFilters}
              className="text-accent-empower font-bold hover:underline whitespace-nowrap px-4 py-2"
            >
              {t('resources.clearFilters')}
            </button>
          </div>
          <div className="border-t border-accent-empower/20 pt-4">
            <h3 className="text-md font-semibold text-neutral-dark mb-3">{t('resources.filterByCategory')}</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                    selectedCategories.includes(cat)
                      ? 'bg-accent-empower text-white border-accent-empower'
                      : 'bg-white text-neutral-dark border-transparent hover:border-accent-secondary'
                  }`}
                >
                  {t(`resourceCategories.${cat}`)}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold font-heading text-neutral-dark">{t('resources.noResults.title')}</h3>
            <p className="text-neutral-dark mt-2">{t('resources.noResults.message')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceHubPage;