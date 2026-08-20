import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Copy, 
  Check, 
  Sparkles,
  Calendar,
  Layers,
  BookOpen,
  Share2
} from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/soundEffects.js';

export const CertificateDetailModal = ({ cert, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !cert) return null;

  const handleCopyCode = () => {
    if (!cert.verificationCode) return;
    navigator.clipboard.writeText(cert.verificationCode);
    playSuccessSound();
    setCopied(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#064E3B', '#10B981', '#F59E0B', '#D1FAE5']
      });
    } catch {
      // Ignore confetti errors gracefully
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#064E3B] text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#064E3B]">
                {cert.category}
              </span>
              <span className="text-[11px] font-mono text-[#A7F3D0] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Verified Credential</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {cert.title}
            </h2>
            <p className="text-xs text-[#A7F3D0] font-semibold">
              Issued by {cert.issuer}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase font-bold text-[#064E3B]">
              Credential Overview
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
              {cert.description}
            </p>
          </div>

          {/* Verification Code Box */}
          {cert.verificationCode && (
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-2">
              <div className="text-[11px] font-mono uppercase font-bold text-[#64748B] flex items-center justify-between">
                <span>Cryptographic Verification Key / ID</span>
                <span className="text-[#064E3B] font-bold">100% Authentic</span>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#E2E8F0]">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#0F172A] truncate max-w-[280px] sm:max-w-md">
                  {cert.verificationCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#064E3B] text-white text-xs font-bold hover:bg-[#043d2e] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Hash'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Curriculum Mastery Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold text-[#064E3B]">
              Verified Competencies &amp; Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cert.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-xs font-medium text-[#334155]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Additional Details */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E2E8F0] text-xs">
            <div>
              <span className="text-[#64748B] font-mono text-[11px] block">Issue Date</span>
              <span className="font-bold text-[#0F172A]">{cert.issueDate}</span>
            </div>
            {cert.score && (
              <div>
                <span className="text-[#64748B] font-mono text-[11px] block">Grade / Score</span>
                <span className="font-bold text-[#064E3B]">{cert.score}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FAF9F6] border-t border-[#E2E8F0] flex items-center justify-between">
          <button
            onClick={onClose}
            className="btn-secondary text-xs font-bold py-2 px-4"
          >
            Close
          </button>

          {cert.verificationUrl && (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs font-bold py-2 px-5 inline-flex items-center gap-2"
            >
              <span>Verify on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
