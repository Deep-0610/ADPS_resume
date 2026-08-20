import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Terminal, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  Award, 
  FileText, 
  Mail, 
  Phone,
  Briefcase,
  UserCheck,
  Layers,
  CheckCircle2,
  Search,
  Command,
  Volume2,
  VolumeX,
  Printer
} from 'lucide-react';
import { DEEP_PROFILE } from '../data/deepResumeData.js';
import { ProfileAvatar } from './ProfileAvatar.jsx';
import { playClickSound, isSoundEnabled, setSoundEnabled, playSuccessSound } from '../utils/soundEffects.js';

export const Navbar = ({ onOpenChat, onOpenSearch, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSuccessSound();
  };

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Experience & Bio', path: '/experience' },
    { name: 'Certifications (9)', path: '/certifications' },
    { name: 'Projects & Systems', path: '/projects' },
    { name: 'Contact & Hire', path: '/contact' },
  ];

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs'
          : 'bg-[#FAF9F6] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Name Logo */}
        <Link
          to="/"
          id="brand-logo-link"
          onClick={() => playClickSound(900)}
          className="group flex items-center gap-3 transition-transform hover:scale-[1.01]"
        >
          <ProfileAvatar
            className="w-10 h-10 rounded-2xl shadow-md shadow-emerald-950/10 group-hover:scale-105 transition-transform"
            label="Portrait of Deep Chaudhari"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl text-[#0F172A] tracking-tight leading-none">
                Deep <span className="text-[#064E3B]">Chaudhari</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#064E3B] border border-[#A7F3D0] hidden lg:inline-block">
                Forward Deployment
              </span>
            </div>
            <span className="text-xs text-[#64748B] font-medium tracking-normal mt-0.5">
              Full-Stack Software Engineer &bull; Ex-Assistant C.T.O.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => playClickSound(850)}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-[#064E3B] bg-[#D1FAE5] border border-[#A7F3D0] shadow-xs'
                    : 'text-[#334155] hover:text-[#0F172A] hover:bg-[#F1F5F1]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Spotlight / Command Search */}
          <button
            onClick={() => {
              playClickSound(950);
              onOpenSearch?.();
            }}
            id="btn-nav-spotlight"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-[#475569] bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#FAF9F6] transition-all shadow-xs"
            title="Search portfolio (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#064E3B]" />
            <span className="hidden xl:inline text-slate-500">Quick Search</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#64748B] bg-[#FAF9F6] border border-[#E2E8F0] rounded">
              ⌘K
            </kbd>
          </button>

          {/* Resume Viewer */}
          <button
            onClick={() => {
              playClickSound(1000);
              onOpenResume?.();
            }}
            id="btn-nav-resume"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#0F172A] bg-white border border-[#E2E8F0] hover:bg-[#FAF9F6] transition-all shadow-xs"
            title="View executive CV"
          >
            <FileText className="w-3.5 h-3.5 text-[#064E3B]" />
            <span>CV</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            id="btn-nav-sound"
            className="p-2 rounded-full text-[#64748B] hover:text-[#064E3B] hover:bg-[#F1F5F1] transition-colors border border-transparent hover:border-[#E2E8F0]"
            title={soundOn ? 'Interactive Sound: ON' : 'Interactive Sound: OFF'}
            aria-label="Toggle sound effects"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#064E3B]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* AI Advisor Trigger */}
          {onOpenChat && (
            <button
              onClick={() => {
                playClickSound(1100);
                onOpenChat();
              }}
              id="btn-nav-chat"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#064E3B] bg-[#D1FAE5] border border-[#A7F3D0] hover:bg-[#A7F3D0] transition-all shadow-xs"
              title="Chat with Deep's AI Copilot"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>AI Copilot</span>
            </button>
          )}

          {/* Primary Hire CTA */}
          <Link
            to="/contact"
            id="btn-nav-hire"
            onClick={() => playClickSound(1200)}
            className="btn-primary inline-flex items-center gap-1.5 text-xs font-bold shadow-xs py-2 px-4"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle & Actions */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <button
            onClick={() => {
              playClickSound(950);
              onOpenSearch?.();
            }}
            className="p-2 rounded-xl text-[#064E3B] bg-white border border-[#E2E8F0] shadow-xs"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {onOpenChat && (
            <button
              onClick={() => {
                playClickSound(1100);
                onOpenChat();
              }}
              className="p-2 rounded-xl text-[#064E3B] bg-[#D1FAE5] border border-[#A7F3D0] shadow-xs"
              aria-label="Open AI Assistant"
            >
              <Sparkles className="w-4 h-4 text-[#D97706]" />
            </button>
          )}

          <button
            id="btn-mobile-hamburger"
            onClick={() => {
              playClickSound(800);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-2 rounded-xl text-[#0F172A] bg-white border border-[#E2E8F0] shadow-xs hover:bg-[#F1F5F1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden border-b border-[#E2E8F0] bg-[#FAF9F6]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-xl"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => playClickSound(850)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-[#064E3B] bg-[#D1FAE5] font-bold border border-[#A7F3D0]'
                      : 'text-[#334155] hover:text-[#0F172A] hover:bg-[#F1F5F1]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenResume?.();
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] flex items-center justify-center gap-2 shadow-xs"
              >
                <FileText className="w-4 h-4 text-[#064E3B]" />
                <span>View CV / Resume</span>
              </button>

              <button
                onClick={toggleSound}
                className="p-3 rounded-2xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] flex items-center justify-center gap-2 shadow-xs"
              >
                {soundOn ? <Volume2 className="w-4 h-4 text-[#064E3B]" /> : <VolumeX className="w-4 h-4" />}
                <span>Sound: {soundOn ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <Link
              to="/contact"
              onClick={() => playClickSound(1200)}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-xs font-bold"
            >
              <span>Connect with Deep Chaudhari</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#064E3B]" />
                <span>Open for Forward Deployment &amp; SWE Roles</span>
              </span>
              <span className="font-mono text-[10px] text-[#064E3B] font-bold">Mumbai</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
