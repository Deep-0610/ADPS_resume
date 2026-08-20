import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Award, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  Database, 
  Layers, 
  ArrowUpRight, 
  ExternalLink,
  Cpu,
  Boxes,
  Lock,
  FileCheck,
  UserCheck,
  Zap,
  Globe,
  RotateCw,
  FileText,
  MessageSquare,
  Activity,
  Flame
} from 'lucide-react';
import { 
  DEEP_PROFILE, 
  DEEP_EXPERIENCES, 
  DEEP_CERTIFICATES, 
  DEEP_PROJECTS,
  SKILL_CATEGORIES 
} from '../data/deepResumeData.js';
import { TechSphere3D } from '../components/TechSphere3D.jsx';
import { Live3DTerminal } from '../components/Live3DTerminal.jsx';
import { TiltCard3D } from '../components/TiltCard3D.jsx';
import { CertificateFlipCard3D } from '../components/CertificateFlipCard3D.jsx';
import { GitActivityMatrix } from '../components/GitActivityMatrix.jsx';
import { ProjectDetailModal } from '../components/ProjectDetailModal.jsx';
import { CertificateDetailModal } from '../components/CertificateDetailModal.jsx';
import { ProfileAvatar } from '../components/ProfileAvatar.jsx';
import { playClickSound } from '../utils/soundEffects.js';

export const Home = ({ onOpenChat, onOpenResume }) => {
  // Dynamic Title Rotator
  const titles = [
    'Forward Deployment Engineer',
    'Full-Stack Software Engineer',
    'Former Assistant C.T.O. (SpiroEdu)',
    'REST APIs & Backend Architect',
    'AI & Blockchain Solutions Developer'
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Active Experience Tab
  const [activeExpTab, setActiveExpTab] = useState('frontend');

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 bg-[#FAF9F6] text-[#0F172A] relative overflow-hidden">
      {/* Ambient 3D Glowing Light Spheres in Background */}
      <div className="glow-orb-forest w-[600px] h-[600px] -top-24 -left-48" />
      <div className="glow-orb-sage w-[700px] h-[700px] top-[35%] -right-48" />
      <div className="glow-orb-forest w-[500px] h-[500px] top-[75%] -left-32" />

      {/* 1. 3D CENTERED HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Top Verification Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1FAE5] border border-[#A7F3D0] text-[#064E3B] text-xs sm:text-sm font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Full-Stack &bull; Forward Deployment &bull; 9 Verified Certifications</span>
            </div>

            {/* Centered 3D Interactive Profile Box with TiltCard3D */}
            <div className="w-fit mx-auto">
              <TiltCard3D maxRotation={8} scale={1.02} glowColor="rgba(16, 185, 129, 0.2)">
                <div className="p-1 rounded-3xl bg-gradient-to-br from-[#064E3B]/20 via-[#A7F3D0]/40 to-transparent shadow-xl">
                  <div className="bg-white px-8 py-7 sm:px-12 sm:py-9 rounded-[22px] border border-[#E2E8F0] space-y-4">
                    <ProfileAvatar
                      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl shadow-lg shadow-emerald-950/20 transform transition-transform duration-300 group-hover:scale-105"
                      label="Portrait of Deep Chaudhari"
                    />
                    <div>
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight">
                        Deep Chaudhari
                      </h1>
                      <div className="h-8 flex items-center justify-center mt-2">
                        <p className="text-base sm:text-xl font-bold text-[#064E3B] transition-all duration-300 font-mono">
                          &gt; {titles[titleIndex]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </div>

            {/* Career Objective Text */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
              {DEEP_PROFILE.careerObjective}
            </p>

            {/* Centered Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/certifications"
                onClick={() => playClickSound(1000)}
                className="btn-primary w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-bold shadow-md shadow-emerald-900/10"
              >
                <Award className="w-4 h-4" />
                <span>Explore 9 Verified Certifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/experience"
                onClick={() => playClickSound(900)}
                className="btn-secondary w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-bold"
              >
                <Briefcase className="w-4 h-4 text-[#064E3B]" />
                <span>Assistant C.T.O. Experience</span>
              </Link>

              {onOpenResume && (
                <button
                  onClick={() => {
                    playClickSound(950);
                    onOpenResume();
                  }}
                  className="btn-secondary w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-bold"
                >
                  <FileText className="w-4 h-4 text-[#064E3B]" />
                  <span>View Full CV</span>
                </button>
              )}

              {onOpenChat && (
                <button
                  onClick={() => {
                    playClickSound(1100);
                    onOpenChat();
                  }}
                  className="btn-secondary w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-bold border-[#A7F3D0] bg-[#D1FAE5]/50 text-[#064E3B]"
                >
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>AI Copilot</span>
                </button>
              )}
            </div>

            {/* Micro details pill row */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#64748B]">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#064E3B]" />
                <span>B.Tech Computer Engineering (2024-2028) &bull; SAKEC Mumbai</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>SAKEC TBI Incubated</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE 3D INTERACTIVE MATRIX SECTION (Tech Sphere + 3D Terminal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
            Live 3D Systems &bull; Interactive Nodes
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Engineering &amp; Forward Deployment Lab
          </h2>
          <p className="text-sm text-[#475569]">
            Interact with the 3D orbital skill sphere and live terminal command execution emulator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D Tech Sphere */}
          <div className="lg:col-span-5 flex flex-col">
            <TechSphere3D />
          </div>

          {/* Right: Live 3D Terminal */}
          <div className="lg:col-span-7 flex flex-col">
            <Live3DTerminal />
          </div>
        </div>
      </section>

      {/* 3. GIT ACTIVITY & CODE VELOCITY TELEMETRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GitActivityMatrix />
      </section>

      {/* 4. ASSISTANT C.T.O. AT SPIROEDU SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="badge-sage">Featured Leadership Role</span>
                <span className="text-xs font-mono text-[#64748B]">Jan 2025 &ndash; Sep 2025</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Assistant C.T.O. &bull; SpiroEdu Education Pvt Ltd
              </h2>
              <p className="text-sm font-semibold text-[#064E3B]">
                SAKEC Technology Business Incubator (TBI), Mumbai
              </p>
            </div>
            
            <Link
              to="/experience"
              onClick={() => playClickSound(900)}
              className="btn-secondary text-xs font-bold py-2.5 px-4 self-start md:self-auto"
            >
              <span>Full Work History</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 border-b border-[#E2E8F0] pb-2">
            <button
              onClick={() => {
                playClickSound(800);
                setActiveExpTab('frontend');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeExpTab === 'frontend'
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-[#FAF9F6] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Frontend Architecture &amp; Gamification
            </button>
            <button
              onClick={() => {
                playClickSound(800);
                setActiveExpTab('backend');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeExpTab === 'backend'
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-[#FAF9F6] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Backend APIs, Auth &amp; Database
            </button>
          </div>

          {/* Tab Content with 3D Tilt Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeExpTab === 'frontend' ? (
              <>
                <TiltCard3D>
                  <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-3 h-full">
                    <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-sm">Core Web Pages &amp; Routing</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Engineered production-grade Team, Terms &amp; Conditions, Contact, and Payment pages with flawless responsiveness.
                    </p>
                  </div>
                </TiltCard3D>

                <TiltCard3D>
                  <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-3 h-full">
                    <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-sm">Gamified UI &amp; Tokens</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Integrated Figma tokens directly into UI states, crafting interactive gamified elements to boost student engagement.
                    </p>
                  </div>
                </TiltCard3D>

                <TiltCard3D>
                  <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-3 h-full">
                    <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-sm">Cross-Device Agility</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Optimized for 320px mobile viewports up to desktop resolutions with zero layout shifts and rapid render times.
                    </p>
                  </div>
                </TiltCard3D>
              </>
            ) : (
              <>
                <TiltCard3D>
                  <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-3 h-full">
                    <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-sm">Full User Auth Pipeline</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Engineered registration, login, secure password management, and JWT session handling for user accounts.
                    </p>
                  </div>
                </TiltCard3D>

                <TiltCard3D>
                  <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-3 h-full">
                    <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-sm">Scalable REST Endpoints</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Designed REST APIs for seamless client-server data transfer, transaction logging, and real-time form submission processing.
                    </p>
                  </div>
                </TiltCard3D>

                <TiltCard3D>
                  <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-3 h-full">
                    <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center">
                      <Database className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-sm">MongoDB &amp; SQL Persistence</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Integrated dual-pipeline database schemas ensuring data integrity, schema migrations, and high throughput queries.
                    </p>
                  </div>
                </TiltCard3D>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 5. 9 VERIFIED CERTIFICATIONS 3D FLIP SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              Verified Credentials &bull; 9 Total
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Certifications &amp; Accreditations
            </h2>
            <p className="text-sm text-[#475569]">
              Click any 3D card to flip and inspect the verification code, curriculum mastery, and cryptographic ledger.
            </p>
          </div>

          <Link
            to="/certifications"
            onClick={() => playClickSound(950)}
            className="btn-primary text-xs font-bold py-2.5 px-5 self-start sm:self-auto"
          >
            <span>View All 9 Certifications</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEEP_CERTIFICATES.slice(0, 6).map((cert) => (
            <CertificateFlipCard3D key={cert.id} cert={cert} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED PROJECTS PREVIEW WITH ARCHITECTURE MODAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#064E3B] text-white shadow-xl space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0f6850] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#A7F3D0] bg-[#043d2e] px-3 py-1 rounded-full border border-[#0f6850]">
                Engineering Projects
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Featured Technical Systems
              </h2>
            </div>
            <Link
              to="/projects"
              onClick={() => playClickSound(950)}
              className="inline-flex items-center gap-2 bg-white text-[#064E3B] font-bold text-xs px-4 py-2.5 rounded-full hover:bg-[#D1FAE5] transition-colors self-start md:self-auto"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEEP_PROJECTS.slice(0, 2).map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  playClickSound(1000);
                  setSelectedProject(proj);
                }}
                className="bg-[#043d2e] p-6 rounded-2xl border border-[#0f6850] space-y-4 hover:border-[#A7F3D0] transition-all cursor-pointer group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#A7F3D0] font-bold">
                    {proj.category}
                  </span>
                  <span className="text-xs text-[#E2E8F0] font-mono group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                    <span>Inspect Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#D1FAE5] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {proj.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono bg-[#064E3B] text-[#D1FAE5] px-2 py-0.5 rounded-md border border-[#0f6850]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION FOR FORWARD DEPLOYMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
            Ready to Deploy High-Impact Software Solutions.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Looking for a Forward Deployment Engineer or Full-Stack developer with leadership experience, deep computer science foundations, and 9 verified industry certifications?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              to="/contact" 
              onClick={() => playClickSound(1200)}
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm font-bold"
            >
              <span>Initiate Contact with Deep</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a
              href="mailto:deepsc0606@gmail.com"
              onClick={() => playClickSound(900)}
              className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm font-bold"
            >
              <span>Email: deepsc0606@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Project Specs Inspection Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Certificate Inspection Modal */}
      <CertificateDetailModal
        cert={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
