
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickExitBanner from './components/QuickExitBanner';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';
import GetHelpNowPage from './pages/GetHelpNowPage';
import ResourceHubPage from './pages/ResourceHubPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactUsPage from './pages/ContactUsPage';
import { LanguageProvider } from './context/LanguageContext';
import { usePageTitle } from './hooks/usePageTitle';

// This component calls the hook and doesn't render anything.
// It's a clean way to manage side effects like changing the document title.
const PageTitleUpdater: React.FC = () => {
  usePageTitle();
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <LanguageProvider>
        <PageTitleUpdater />
        <div className="flex flex-col min-h-screen bg-neutral-light pt-8">
          <QuickExitBanner />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatbotPage />} />
              <Route path="/help" element={<GetHelpNowPage />} />
              <Route path="/resources" element={<ResourceHubPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;