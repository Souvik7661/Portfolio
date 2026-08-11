import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { GitHubSection } from './components/GitHub';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative bg-[#0A0A0A] text-white font-sans selection:bg-[#E8702A] selection:text-white antialiased overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Single Page Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <GitHubSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
