import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Server, 
  ExternalLink,
  Target,
  Sparkles,
  Award,
  Layers,
  Lock,
  Database,
  FileText,
  Clock,
  Zap
} from 'lucide-react';
import { DEEP_PROFILE, DEEP_EXPERIENCES } from '../data/deepResumeData.js';
import { TiltCard3D } from '../components/TiltCard3D.jsx';
import { InteractiveTimeline } from '../components/InteractiveTimeline.jsx';
import { playClickSound } from '../utils/soundEffects.js';

export const Experience = ({ onOpenResume }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-[#FAF9F6] text-[#0F172A] relative overflow-hidden">
      {/* Ambient 3D Glow Backdrops */}
      <div className="glow-orb-forest w-[500px] h-[500px] -top-24 left-10" />
      <div className="glow-orb-sage w-[600px] h-[600px] top-[45%] -right-32" />

      {/* 1. HEADER */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              Leadership &bull; Engineering &bull; Academics
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Experience &amp;{' '}
              <span className="text-[#064E3B]">Background</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Full-Stack Software Engineer and former Assistant C.T.O. with hands-on experience in production frontend development, secure authentication engines, RESTful APIs, and database architecture.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CAREER OBJECTIVE & TARGET ROLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard3D maxRotation={4} scale={1.01}>
          <div className="p-8 sm:p-10 bg-white border border-[#E2E8F0] rounded-3xl space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                    Career Objective &amp; Forward Deployment Focus
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Prepared for Forward Deployment Engineer, Software Development Engineer, and Full-Stack roles
                  </p>
                </div>
              </div>

              {onOpenResume && (
                <button
                  onClick={() => {
                    playClickSound(950);
                    onOpenResume();
                  }}
                  className="btn-secondary text-xs font-bold py-2 px-4 self-start sm:self-auto flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#064E3B]" />
                  <span>View Printable CV</span>
                </button>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              {DEEP_PROFILE.careerObjective}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  01. AI &amp; LLM Integration
                </div>
                <p className="text-xs text-[#475569]">
                  Deploying production Gemini agents, tool calling pipelines, and real-time search grounding.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  02. Secure Backend Systems
                </div>
                <p className="text-xs text-[#475569]">
                  Architecting JWT authentication, role-based access control, and normalized SQL/MongoDB schemas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  03. Client Deployment Agility
                </div>
                <p className="text-xs text-[#475569]">
                  Direct customer facing problem-solving, rapid prototyping, and production telemetry monitoring.
                </p>
              </div>
            </div>
          </div>
        </TiltCard3D>
      </section>

      {/* 3. INTERACTIVE VERTICAL TIMELINE WITH FRAMER-MOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveTimeline onOpenResume={onOpenResume} />
      </section>

      {/* 4. ASSISTANT C.T.O. DETAILED BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              Deep Dive &bull; Production Responsibilities
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Assistant C.T.O. &bull; SpiroEdu Education Pvt Ltd
            </h2>
            <p className="text-xs font-mono text-[#064E3B] font-bold">
              SAKEC Technology Business Incubator (TBI), Mumbai &bull; Jan 2025 &ndash; Sep 2025
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Frontend & UI Systems */}
            <TiltCard3D maxRotation={5} scale={1.015}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-5 h-full">
                <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Frontend Architecture &amp; UI</h3>
                    <p className="text-xs text-[#64748B]">Interactive web platform &amp; design token integration</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#334155]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Engineered essential pages: <strong>Team, Terms and Conditions, Contact, and Payment</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Translated Figma designs into responsive, production-ready code with customized design tokens.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Implemented gamified UI components to increase student interactive participation and retention.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Optimized layout responsiveness across all screen breakpoints down to 320px mobile devices.</span>
                  </li>
                </ul>
              </div>
            </TiltCard3D>

            {/* Right: Backend & Security Architecture */}
            <TiltCard3D maxRotation={5} scale={1.015}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-5 h-full">
                <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center font-bold">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Backend &amp; Security Architecture</h3>
                    <p className="text-xs text-[#64748B]">Authentication, REST endpoints &amp; database pipelines</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#334155]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Architected user registration, login, and secure password management engines.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Developed robust REST APIs for seamless client-to-server data communication.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Integrated dual databases (<strong>MongoDB &amp; SQL</strong>) for persistent storage and transaction logs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Secured transaction data pipelines and automated submission notifications.</span>
                  </li>
                </ul>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </section>

      {/* 5. ACADEMICS & EDUCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#064E3B] text-white shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#0f6850] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#043d2e] text-[#A7F3D0] flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#A7F3D0] uppercase tracking-wider font-bold">
                Academic Background (2024 &ndash; 2028)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Bachelor of Technology (B.Tech) in Computer Engineering
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="text-xs font-mono text-[#A7F3D0]">Institution</div>
              <div className="text-sm font-bold text-white">
                Shah &amp; Anchor Kutchhi Engineering College (SAKEC)
              </div>
              <div className="text-xs text-[#CBD5E1]">Chembur, Mumbai, India</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono text-[#A7F3D0]">Key Coursework</div>
              <div className="text-xs text-[#E2E8F0] space-y-1">
                <div>&bull; Data Structures &amp; Algorithms in Java</div>
                <div>&bull; Database Management Systems &amp; SQL</div>
                <div>&bull; Computer Organization &amp; C Programming</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono text-[#A7F3D0]">Accreditations</div>
              <div className="text-xs text-[#E2E8F0] space-y-1">
                <div>&bull; SAKEC TBI Incubated Project Completion</div>
                <div>&bull; IIT Bombay Spoken Tutorial C Certification</div>
                <div>&bull; IIM Bangalore / SWAYAM Language Foundations</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
