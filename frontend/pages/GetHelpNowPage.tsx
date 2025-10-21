
import React from 'react';
import { Phone, ExternalLink, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const GetHelpNowPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleQuickExit = () => {
        window.location.replace('https://www.google.com');
    };

    return (
        <div className="bg-neutral-light py-12 md:py-20">
            <div className="container mx-auto px-6 max-w-2xl text-center">
                <AlertTriangle className="w-20 h-20 text-accent-empower mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-neutral-dark mb-4">
                    {t('help.title')}
                </h1>
                <p className="text-lg text-neutral-dark mb-10">
                    {t('help.subtitle')}
                </p>

                <div className="space-y-6">
                    <a
                        href="tel:112" // Pan-European emergency number, more universal than 911. India uses 112.
                        className="w-full flex items-center justify-center text-center bg-accent-empower text-white font-bold font-heading py-6 px-8 rounded-lg text-2xl hover:opacity-90 transition-opacity transform hover:scale-105"
                    >
                        <Phone className="w-8 h-8 mr-4" />
                        {t('help.callPolice')}
                    </a>

                    <button
                        onClick={() => navigate('/resources')}
                        className="w-full flex items-center justify-center text-center bg-accent-secondary text-white font-bold font-heading py-6 px-8 rounded-lg text-2xl hover:opacity-90 transition-opacity transform hover:scale-105"
                    >
                        <ExternalLink className="w-8 h-8 mr-4" />
                        {t('help.findHelpline')}
                    </button>

                    <button
                        onClick={handleQuickExit}
                        className="w-full flex items-center justify-center text-center bg-neutral-dark text-white font-bold font-heading py-4 px-8 rounded-lg text-xl hover:opacity-90 transition-opacity mt-8"
                    >
                        {t('help.quickExit')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GetHelpNowPage;
