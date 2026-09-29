import React, { useState } from 'react';
import { useMobilePlatform } from './hooks/useMobilePlatform';
import { useTabTitle } from './hooks/useTabTitle';
import { Navbar } from './components/Navbar';
import { IntroVideo } from './components/IntroVideo';
import { Hero } from './components/Hero';
import { LaptopShowcase } from './components/LaptopShowcase';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { GitHubSection } from './components/GitHub';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AIChatbot } from './components/AIChatbot';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsConditionsModal } from './components/TermsConditionsModal';
import { CookieConsent } from './components/CookieConsent';

export const App: React.FC = () => {
  useMobilePlatform();
  useTabTitle();

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleOpenResume = () => setIsResumeModalOpen(true);
  const handleCloseResume = () => setIsResumeModalOpen(false);

  return (
    <div className="relative bg-[#070707] text-white font-sans selection:bg-[#E8702A] selection:text-white antialiased overflow-x-clip min-h-screen min-h-[100dvh]">
      {/* Navigation Bar & Status Ticker */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <IntroVideo />
        <Hero />
        <LaptopShowcase />
        <About onOpenResume={handleOpenResume} />
        <Resume onOpenModal={handleOpenResume} />
        <Services />
        <Projects />
        <GitHubSection />
        <Contact />
      </main>

      {/* Control Center Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
      />

      {/* Interactive Resume Modal Viewer */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={handleCloseResume} />

      {/* Legal & Compliance Modals */}
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsConditionsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />

      {/* Privacy-First Cookie Consent Banner */}
      <CookieConsent onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />

      {/* Floating AI Cyborg Chatbot */}
      <AIChatbot onOpenResume={handleOpenResume} />
    </div>
  );
};

export default App;
