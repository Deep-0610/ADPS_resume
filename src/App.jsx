import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { Chatbot } from './components/Chatbot.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';
import { ResumeModal } from './components/ResumeModal.jsx';
import { Home } from './pages/Home.jsx';
import { Experience } from './pages/Experience.jsx';
import { Certifications } from './pages/Certifications.jsx';
import { Projects } from './pages/Projects.jsx';
import { Contact } from './pages/Contact.jsx';
import { playClickSound } from './utils/soundEffects.js';

// Scroll Restoration on Navigation
const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Global Keyboard Shortcuts (⌘K, Ctrl+K, /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playClickSound(900);
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex flex-col font-sans selection:bg-[#D1FAE5] selection:text-[#064E3B] bg-grid-organic">
        {/* Scroll Restorer */}
        <ScrollToTopOnRoute />

        {/* Global Navigation Bar */}
        <Navbar
          onOpenChat={() => setIsChatOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenChat={() => setIsChatOpen(true)} onOpenResume={() => setIsResumeOpen(true)} />} />
            <Route path="/experience" element={<Experience onOpenResume={() => setIsResumeOpen(true)} />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/projects" element={<Projects onOpenChat={() => setIsChatOpen(true)} />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Backward-compatible redirects */}
            <Route path="/about" element={<Navigate to="/experience" replace />} />
            <Route path="/services" element={<Navigate to="/projects" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Command Palette / Spotlight (Cmd+K) */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Executive Resume Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        {/* Screen-Adaptive AI Assistant (Deep's AI Copilot) */}
        <Chatbot
          isOpenExternal={isChatOpen}
          onCloseExternal={() => setIsChatOpen(false)}
        />

        {/* Global Footer */}
        <Footer onOpenResume={() => setIsResumeOpen(true)} />
      </div>
    </BrowserRouter>
  );
}
