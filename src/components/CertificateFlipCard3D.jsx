import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ExternalLink, CheckCircle2, Copy, Check, RotateCw, Award, ShieldCheck, Sparkles, Maximize2 } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/soundEffects.js';

export const CertificateFlipCard3D = ({ cert, onInspect }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFlip = () => {
    playClickSound(isFlipped ? 800 : 1000);
    setIsFlipped(!isFlipped);
  };

  const handleCopyCode = (e) => {
    e.stopPropagation();
    if (!cert.verificationCode) return;
    navigator.clipboard.writeText(cert.verificationCode);
    playSuccessSound();
    setCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#064E3B', '#10B981', '#F59E0B']
      });
    } catch {
      // Ignore
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative w-full h-[390px] perspective-1000 cursor-pointer select-none group"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full duration-700 preserve-3d transition-transform ease-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT OF 3D CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between hover:border-[#A7F3D0] hover:shadow-md transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${cert.badgeColor}`}>
                {cert.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#064E3B] font-bold bg-[#FAF9F6] border border-[#E2E8F0] px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Verified</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#0F172A] leading-snug line-clamp-2">
              {cert.title}
            </h3>

            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#064E3B]">
                {cert.issuer}
              </p>
              {cert.score && (
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                  {cert.score}
                </span>
              )}
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
              {cert.description}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#E2E8F0]">
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium bg-[#FAF9F6] border border-[#E2E8F0] px-2 py-0.5 rounded-md text-[#334155]"
                >
                  {skill}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="text-[11px] font-bold text-[#064E3B] px-1">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-mono text-[#64748B]">
                {cert.issueDate}
              </span>
              <div className="flex items-center gap-2">
                {onInspect && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound(950);
                      onInspect(cert);
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-[#64748B] hover:text-[#064E3B] transition-colors"
                    title="Open credential view"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#064E3B] group-hover:underline">
                  <RotateCw className="w-3 h-3" />
                  <span>Flip 3D Card</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK OF 3D CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-[#064E3B] text-white p-6 shadow-xl flex flex-col justify-between border border-[#043d2e]">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#0f6850] pb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#A7F3D0]">
                <Award className="w-4 h-4" />
                <span>Credential Ledger</span>
              </div>
              <span className="text-[11px] font-mono text-[#D1FAE5]">
                {cert.issuer}
              </span>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#A7F3D0] font-bold">
                Verification Key / ID
              </div>
              <div className="flex items-center justify-between bg-[#043d2e] p-2.5 rounded-xl border border-[#0f6850] mt-1">
                <span className="font-mono text-xs text-white truncate max-w-[190px]">
                  {cert.verificationCode || 'Institutional Certificate'}
                </span>
                {cert.verificationCode && (
                  <button
                    onClick={handleCopyCode}
                    className="p-1 rounded-md hover:bg-[#064E3B] text-[#A7F3D0] transition-colors"
                    title="Copy verification hash"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#A7F3D0] font-bold mb-1">
                Curriculum Mastery
              </div>
              <ul className="text-xs text-[#E2E8F0] space-y-1 pl-1">
                {cert.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-[#0f6850] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#D1FAE5]">
              Click to flip back
            </span>
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-bold bg-white text-[#064E3B] px-3 py-1.5 rounded-xl hover:bg-[#D1FAE5] transition-colors shadow-sm"
              >
                <span>Verify Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
