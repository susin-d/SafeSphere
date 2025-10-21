
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const ContactUsPage: React.FC = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-neutral-light py-12">
            <div className="container mx-auto px-6 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-center text-neutral-dark mb-10">
                    {t('contact.title')}
                </h1>
                
                <div className="bg-accent-empower/10 border-l-4 border-accent-empower text-accent-empower p-4 mb-8 rounded-r-lg" role="alert">
                    <div className="flex">
                        <div className="py-1"><AlertTriangle className="w-6 h-6 mr-4" /></div>
                        <div>
                            <p className="font-bold">{t('contact.emergencyWarning.title')}</p>
                            <p className="text-sm">{t('contact.emergencyWarning.text')} <button onClick={() => navigate('/help')} className="font-bold underline">{t('contact.emergencyWarning.link')}</button>.</p>
                        </div>
                    </div>
                </div>

                {submitted ? (
                    <div className="bg-accent-secondary/20 text-center p-10 rounded-lg">
                        <h2 className="text-2xl font-bold font-heading text-neutral-dark">{t('contact.submitted.title')}</h2>
                        <p className="text-neutral-dark mt-2">{t('contact.submitted.text')}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-neutral-dark mb-2">{t('contact.form.name.label')}</label>
                            <input type="text" id="name" className="w-full p-3 rounded-lg border-2 border-primary-pink bg-neutral-light focus:bg-white focus:border-accent-empower focus:ring-accent-empower transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-neutral-dark mb-2">{t('contact.form.email.label')}</label>
                            <p className="text-xs text-gray-500 mb-2">{t('contact.form.email.description')}</p>
                            <input type="email" id="email" className="w-full p-3 rounded-lg border-2 border-primary-pink bg-neutral-light focus:bg-white focus:border-accent-empower focus:ring-accent-empower transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-neutral-dark mb-2">{t('contact.form.message.label')}</label>
                            <textarea id="message" rows={6} required className="w-full p-3 rounded-lg border-2 border-primary-pink bg-neutral-light focus:bg-white focus:border-accent-empower focus:ring-accent-empower transition-colors"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-accent-empower text-white font-bold font-heading py-3 px-8 rounded-full text-lg hover:opacity-90 transition-opacity">
                                {t('contact.form.submitButton')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactUsPage;
