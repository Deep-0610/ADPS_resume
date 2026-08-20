import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  Code2
} from 'lucide-react';
import { DEEP_PROFILE, DEEP_EXPERIENCES, DEEP_CERTIFICATES, SKILL_CATEGORIES } from '../data/deepResumeData.js';
import { ProfileAvatar } from './ProfileAvatar.jsx';
import { playClickSound } from '../utils/soundEffects.js';

export const ResumeModal = ({ isOpen, onClose }) => {
  const resumeRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound(1000);
    window.print();
  };

  return (
    <div
      id="resume-print-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#FAF9F6] sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <ProfileAvatar
              className="w-8 h-8 rounded-xl"
              label="Portrait of Deep Chaudhari"
            />
            <div>
              <h3 className="font-extrabold text-sm text-[#0F172A] leading-none">
                Deep Chaudhari &bull; Executive Resume
              </h3>
              <p className="text-[11px] text-[#64748B] mt-0.5 font-mono">
                Forward Deployment &amp; Full-Stack Software Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#064E3B] text-white text-xs font-bold hover:bg-[#043d2e] transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-[#64748B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div
          ref={resumeRef}
            className="resume-print-content flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-[#0F172A] print:p-0 print:m-0"
        >
          {/* Header Block */}
          <div className="border-b-2 border-[#064E3B] pb-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                  Deep Sandeep Chaudhari
                </h1>
                <p className="text-base font-bold text-[#064E3B] mt-1">
                  Full-Stack Software Engineer &bull; Ex-Assistant C.T.O. (SpiroEdu)
                </p>
              </div>

              <div className="flex flex-col text-xs space-y-1 sm:text-right font-medium text-[#475569]">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#064E3B]" />
                  <a href={`mailto:${DEEP_PROFILE.email}`} className="hover:underline font-semibold text-[#064E3B]">
                    {DEEP_PROFILE.email}
                  </a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#064E3B]" />
                  <span>{DEEP_PROFILE.phone}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#064E3B]" />
                  <span>{DEEP_PROFILE.location}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
              {DEEP_PROFILE.careerObjective}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
              <GraduationCap className="w-4 h-4 text-[#064E3B]" />
              <h2 className="text-sm font-mono uppercase tracking-wider font-extrabold text-[#064E3B]">
                Education
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">
                  Bachelor of Technology (B.Tech) in Computer Engineering
                </h3>
                <p className="text-xs text-[#475569]">
                  Shah &amp; Anchor Kutchhi Engineering College (SAKEC), Chembur, Mumbai
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#064E3B]">
                2024 &ndash; 2028 (Undergraduate)
              </span>
            </div>
          </div>

          {/* Professional Work Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
              <Briefcase className="w-4 h-4 text-[#064E3B]" />
              <h2 className="text-sm font-mono uppercase tracking-wider font-extrabold text-[#064E3B]">
                Professional Experience
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">
                    Assistant C.T.O. / Full Stack Engineering Lead
                  </h3>
                  <p className="text-xs font-semibold text-[#064E3B]">
                    SpiroEdu Education Pvt Ltd &bull; SAKEC Technology Business Incubator (TBI)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#64748B]">
                  Jan 2025 &ndash; Sep 2025
                </span>
              </div>

              <ul className="space-y-2 text-xs text-[#334155] pl-4 list-disc marker:text-[#064E3B]">
                <li>
                  Engineered production-grade web pages: <strong>Team, Terms and Conditions, Contact, and Payment</strong> with full layout responsiveness.
                </li>
                <li>
                  Integrated Figma designs into pixel-perfect React UI components with gamified buttons and engagement tokens.
                </li>
                <li>
                  Designed secure backend user authentication system handling registration, login, and secure password management.
                </li>
                <li>
                  Created performant REST APIs for client-to-server data communication, payment submissions, and user data transfer.
                </li>
                <li>
                  Integrated dual databases (<strong>MongoDB and SQL</strong>) for persistent user storage and transaction integrity.
                </li>
              </ul>
            </div>
          </div>

          {/* Verified Certifications (9 Total) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
              <Award className="w-4 h-4 text-[#064E3B]" />
              <h2 className="text-sm font-mono uppercase tracking-wider font-extrabold text-[#064E3B]">
                Verified Industry Certifications (9 Accreditations)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {DEEP_CERTIFICATES.map((cert) => (
                <div key={cert.id} className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F172A]">{cert.title}</span>
                    <span className="text-[10px] font-mono text-[#064E3B] font-bold">{cert.issueDate}</span>
                  </div>
                  <div className="text-[11px] text-[#064E3B] font-semibold">{cert.issuer}</div>
                  {cert.verificationCode && (
                    <div className="text-[10px] font-mono text-[#64748B]">
                      Code: {cert.verificationCode}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
              <Code2 className="w-4 h-4 text-[#064E3B]" />
              <h2 className="text-sm font-mono uppercase tracking-wider font-extrabold text-[#064E3B]">
                Technical Skills &amp; Domain Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-bold text-[#064E3B] uppercase font-mono text-[11px]">
                    {cat.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E2E8F0] text-[#334155] text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
