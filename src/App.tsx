/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import BrandSection from './components/BrandSection';
import ThreeJsLabSection from './components/ThreeJsLabSection';
import JourneySection from './components/JourneySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GeminiChatbot from './components/GeminiChatbot';
import AiCreativeStudio from './components/AiCreativeStudio';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['home', 'about', 'skills', 'brand', 'threejs-lab', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem) {
          const top = elem.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      {/* Luxury Loading Screen */}
      <Preloader />

      {/* Futuristic Background: Midnight Navy, Cyber Grid, Particles & Radial Glows */}
      <InteractiveBackground />

      {/* Main Top Navigation (3-Zone Contract) */}
      <Navbar
        activeSection={activeSection}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <HeroSection
          onExploreClick={() => scrollTo('brand')}
          onConnectClick={() => scrollTo('contact')}
        />
        <AboutSection />
        <SkillsSection />
        <BrandSection onOpenAiStudio={() => setIsAiStudioOpen(true)} />
        <ThreeJsLabSection />
        <JourneySection />
        <ContactSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Gemini Multi-Turn Chatbot */}
      <GeminiChatbot />

      {/* AI Creative Studio Modal (Create & Edit Images) */}
      <AiCreativeStudio
        isOpen={isAiStudioOpen}
        onClose={() => setIsAiStudioOpen(false)}
      />

      {/* Floating Back To Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}
    </div>
  );
}
