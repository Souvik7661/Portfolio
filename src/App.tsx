import React, { useState } from 'react';
import { useMobilePlatform } from './hooks/useMobilePlatform';
import { Navbar } from './components/Navbar';
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

export const App: React.FC = () => {
  useMobilePlatform();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenResume = () => setIsResumeModalOpen(true);
  const handleCloseResume = () => setIsResumeModalOpen(false);

  return (
    <div className="relative bg-[#070707] text-white font-sans selection:bg-[#E8702A] selection:text-white antialiased overflow-x-hidden min-h-screen min-h-[100dvh]">
      {/* Navigation Bar & Status Ticker */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Content Sections */}
      <main>
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
      <Footer />

      {/* Interactive Resume Modal Viewer */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={handleCloseResume} />
    </div>
  );
};

export default App;
