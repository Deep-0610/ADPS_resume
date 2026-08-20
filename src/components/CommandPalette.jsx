import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  Award,
  Briefcase,
  Layers,
  Mail,
  Phone,
  FileText,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  Code2,
  Check,
  Zap
} from 'lucide-react';
import { DEEP_PROFILE, DEEP_CERTIFICATES, DEEP_PROJECTS } from '../data/deepResumeData.js';
import { playClickSound, playSuccessSound, isSoundEnabled, setSoundEnabled } from '../utils/soundEffects.js';

export const CommandPalette = ({ isOpen, onClose, onOpenChat, onOpenResume }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [copiedAction, setCopiedAction] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable command items
  const allItems = [
    // Navigation
    { id: 'nav-home', title: 'Overview & 3D Interactive Lab', category: 'Navigation', icon: Zap, action: () => navigate('/') },
    { id: 'nav-exp', title: 'Experience & Assistant C.T.O. (SpiroEdu)', category: 'Navigation', icon: Briefcase, action: () => navigate('/experience') },
    { id: 'nav-certs', title: 'Verified Certifications (All 9 Accreditations)', category: 'Navigation', icon: Award, action: () => navigate('/certifications') },
    { id: 'nav-proj', title: 'Projects & Forward Deployment Systems', category: 'Navigation', icon: Layers, action: () => navigate('/projects') },
    { id: 'nav-contact', title: 'Contact & Hire Deep Chaudhari', category: 'Navigation', icon: Mail, action: () => navigate('/contact') },

    // Actions
    {
      id: 'act-chat',
      title: "Chat with Deep's AI Copilot (Gemini AI)",
      category: 'AI Assistant',
      icon: Sparkles,
      action: () => {
        onClose();
        onOpenChat?.();
      }
    },
    {
      id: 'act-resume',
      title: 'View / Print Deep Chaudhari Resume & Credentials',
      category: 'Actions',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume?.();
      }
    },
    {
      id: 'act-copy-email',
      title: `Copy Email (${DEEP_PROFILE.email})`,
      category: 'Quick Actions',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(DEEP_PROFILE.email);
        playSuccessSound();
        setCopiedAction('email');
        setTimeout(() => setCopiedAction(null), 2000);
      }
    },
    {
      id: 'act-call',
      title: `Call / WhatsApp (${DEEP_PROFILE.phone})`,
      category: 'Quick Actions',
      icon: Phone,
      action: () => {
        window.location.href = `tel:${DEEP_PROFILE.phone}`;
      }
    },
    {
      id: 'act-sound',
      title: soundOn ? 'Mute Interactive Sound Effects' : 'Enable Interactive Sound Effects',
      category: 'Preferences',
      icon: soundOn ? VolumeX : Volume2,
      action: () => {
        const next = !soundOn;
        setSoundOn(next);
        setSoundEnabled(next);
        if (next) playSuccessSound();
      }
    },

    // 9 Certifications
    ...DEEP_CERTIFICATES.map((cert) => ({
      id: `cert-${cert.id}`,
      title: `${cert.title} — ${cert.issuer}`,
      subtitle: cert.category,
      category: 'Certifications (9)',
      icon: Award,
      action: () => {
        navigate('/certifications');
      }
    })),

    // Projects
    ...DEEP_PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      subtitle: proj.category,
      category: 'Projects & Systems',
      icon: Code2,
      action: () => {
        navigate('/projects');
      }
    }))
  ];

  // Filter items based on query
  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchSub = item.subtitle?.toLowerCase().includes(q);
    const matchCat = item.category.toLowerCase().includes(q);
    return matchTitle || matchSub || matchCat;
  });

  // Handle Keyboard Navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      playClickSound(900);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
      playClickSound(700);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        playClickSound(1000);
        filteredItems[selectedIndex].action();
        if (filteredItems[selectedIndex].category === 'Navigation') {
          onClose();
        }
      }
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E2E8F0] bg-[#FAF9F6]">
          <Search className="w-5 h-5 text-[#064E3B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, certificate, project, or topic..."
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono font-bold text-[#64748B] bg-white border border-[#E2E8F0] rounded-md shadow-xs">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-200 text-[#64748B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 divide-y divide-transparent space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Search className="w-8 h-8 text-[#94A3B8] mx-auto" />
              <p className="text-sm font-bold text-[#0F172A]">No matching commands found</p>
              <p className="text-xs text-[#64748B]">Try searching for "CTO", "Walmart", "AI", or "Certifications"</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playClickSound(1000);
                    item.action();
                    if (item.category === 'Navigation') onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#064E3B] text-white shadow-sm'
                      : 'hover:bg-[#FAF9F6] text-[#0F172A]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#D1FAE5] text-[#064E3B]'
                          : 'bg-[#FAF9F6] text-[#064E3B] border border-[#E2E8F0]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-[#D1FAE5]' : 'text-[#64748B]'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {copiedAction && item.id.includes(copiedAction) && (
                      <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md uppercase font-semibold ${
                        isSelected
                          ? 'bg-[#043d2e] text-[#A7F3D0]'
                          : 'bg-[#FAF9F6] text-[#64748B] border border-[#E2E8F0]'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-[#D1FAE5]' : 'text-slate-300'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-[#FAF9F6] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↵</kbd> to select
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#064E3B] font-bold">
            <Command className="w-3.5 h-3.5" />
            <span>Spotlight &bull; Deep Chaudhari</span>
          </div>
        </div>
      </div>
    </div>
  );
};
