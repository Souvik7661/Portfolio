import React from 'react';
import { useMobilePlatform } from './hooks/useMobilePlatform';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LaptopShowcase } from './components/LaptopShowcase';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { GitHubSection } from './components/GitHub';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  useMobilePlatform();

  return (
    <div className="relative bg-[#070707] text-white font-sans selection:bg-[#E8702A] selection:text-white antialiased overflow-x-hidden min-h-screen min-h-[100dvh]">
      {/* Navigation Bar & Status Ticker */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <LaptopShowcase />
        <About />
        <Services />
        <Projects />
        <GitHubSection />
        <Contact />
      </main>

      {/* Control Center Footer */}
      <Footer />
    </div>
  );
};

export default App;
