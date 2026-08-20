import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Sparkles, 
  Code2, 
  Database, 
  Cpu, 
  Layers, 
  Lock, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';
import { playClickSound } from '../utils/soundEffects.js';

// Comprehensive Timeline Dataset for Deep Chaudhari
export const TIMELINE_MILESTONES = [
  {
    id: 'spiro-cto',
    type: 'leadership',
    category: 'Leadership & Industry',
    badge: 'Executive Leadership',
    role: 'Assistant C.T.O. / Full Stack Engineering Lead',
    organization: 'SpiroEdu Education Pvt Ltd',
    affiliation: 'SAKEC Technology Business Incubator (TBI)',
    location: 'Mumbai, India',
    period: 'Jan 2025 – Sep 2025',
    status: 'Completed Deployment',
    statusColor: 'bg-emerald-100 text-[#064E3B] border-emerald-300',
    icon: Briefcase,
    iconColor: 'bg-[#064E3B] text-[#A7F3D0]',
    summary: 'Spearheaded full-stack platform architecture and team execution, engineering user authentication, gamified design systems, and resilient RESTful microservices.',
    keyMetrics: [
      '8-Month Leadership Deployment',
      'Dual MongoDB & SQL Database Pipeline',
      '100% Mobile Responsive to 320px'
    ],
    highlights: [
      {
        title: 'Frontend Architecture & Gamification',
        description: 'Engineered core web flows (Team, Terms, Contact, Payments) with pixel-perfect Figma token integration and engagement-boosting gamified UI components.'
      },
      {
        title: 'Authentication & Session Security',
        description: 'Built end-to-end user registration, secure password hashing, JWT session verification, and protected REST endpoint gateways.'
      },
      {
        title: 'Database & Transaction Integrity',
        description: 'Integrated dual-pipeline schemas ensuring data integrity, schema migrations, and high-throughput query handling.'
      }
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'JWT Auth', 'Figma', 'REST APIs']
  },
  {
    id: 'sakec-tbi-cert',
    type: 'certification',
    category: 'Specializations & Systems',
    badge: 'Institutional Incubation',
    role: 'Incubated Software Engineering Specialist',
    organization: 'SAKEC Technology Business Incubator (TBI)',
    affiliation: 'Institutional Verification: SAKEC/TBI/2639/2025-26',
    location: 'Mumbai, India',
    period: 'Feb 2026',
    status: 'Verified Credential',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icon: Award,
    iconColor: 'bg-[#10B981] text-white',
    summary: 'Formally accredited for successful 8-month tenure as Assistant C.T.O., demonstrating mastery in full-stack architecture, deployment resilience, and technical leadership.',
    keyMetrics: [
      'Official Credential SAKEC/TBI/2639/2025-26',
      'Production System Delivery',
      'Startup Incubator Recognition'
    ],
    highlights: [
      {
        title: 'Leadership Accreditation',
        description: 'Validated full lifecycle software delivery from initial wireframes to production deployment under SAKEC TBI incubation.'
      }
    ],
    techStack: ['Full-Stack Engineering', 'Project Management', 'System Design', 'Team Governance']
  },
  {
    id: 'walmart-uci-swe',
    type: 'certification',
    category: 'Specializations & Systems',
    badge: 'Enterprise Systems & Blockchain',
    role: 'Advanced SWE & Cryptographic Systems Researcher',
    organization: 'Walmart USA & UC Irvine',
    affiliation: 'Global Verified Accreditations',
    location: 'Global / Remote',
    period: 'Feb 2026 – Aug 2026',
    status: 'Multi-Credential Mastery',
    statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
    icon: Cpu,
    iconColor: 'bg-blue-600 text-white',
    summary: 'Mastered advanced enterprise software architectures with Walmart USA and decentralized cryptography protocols with University of California, Irvine.',
    keyMetrics: [
      'Walmart USA SWE Simulation Completed',
      'UC Irvine Blockchain & Cryptography Certified',
      'Data Structure Asymptotics & Hashing'
    ],
    highlights: [
      {
        title: 'Enterprise Data Structures & Relational Schemas',
        description: 'Engineered high-volume data munging pipelines and normalized relational database schemas according to Walmart enterprise standards.'
      },
      {
        title: 'Decentralized Consensus & Cryptographic Ledgers',
        description: 'Deep study of hashing algorithms, block bundling, zero-knowledge proofs, and cryptographic identity verification.'
      }
    ],
    techStack: ['Java DSA', 'Advanced Data Structures', 'Cryptography', 'Hashing', 'Relational SQL', 'Blockchain']
  },
  {
    id: 'sakec-academics',
    type: 'academics',
    category: 'Academics',
    badge: 'Undergraduate Degree',
    role: 'B.Tech in Computer Engineering',
    organization: 'Shah & Anchor Kutchhi Engineering College (SAKEC)',
    affiliation: 'Affiliated with University of Mumbai',
    location: 'Chembur, Mumbai, India',
    period: '2024 – 2028 (In Progress)',
    status: 'Active Undergraduate',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: GraduationCap,
    iconColor: 'bg-amber-600 text-white',
    summary: 'Undergraduate engineering student building core mathematical and algorithmic foundations in Data Structures, Database Systems, Computer Architecture, and Distributed Computing.',
    keyMetrics: [
      '4-Year B.Tech Computer Engineering Track',
      'Infosys Springboard DSA & SQL Certified',
      'IIT Bombay C Spoken Tutorial Certified'
    ],
    highlights: [
      {
        title: 'Core Coursework & Algorithmic Rigor',
        description: 'Advanced Data Structures in Java, Database Management Systems (DBMS), Discrete Mathematics, Computer Networks, and Operating Systems.'
      },
      {
        title: 'Institutional Research & TBI Projects',
        description: 'Active participant in tech incubator hackathons, forward deployment prototypes, and AI systems experiments.'
      }
    ],
    techStack: ['Java', 'C Programming', 'Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Discrete Math']
  }
];

export const InteractiveTimeline = ({ onOpenResume, onOpenProjectModal }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedId, setExpandedId] = useState('spiro-cto'); // SpiroEdu opened by default

  const filters = ['All', 'Leadership & Industry', 'Specializations & Systems', 'Academics'];

  const filteredMilestones = TIMELINE_MILESTONES.filter(
    (item) => selectedFilter === 'All' || item.category === selectedFilter
  );

  const toggleExpand = (id) => {
    playClickSound(900);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-12">
      {/* 1. Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              Chronological Track &bull; 2024 &ndash; Present
            </span>
            <span className="text-xs font-mono font-bold text-[#64748B] hidden sm:inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Interactive Milestones</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Professional Experience &amp; Engineering Timeline
          </h2>
          <p className="text-sm text-[#475569]">
            Scroll through Deep's executive leadership at SpiroEdu, institutional incubation, accredited certifications, and academic trajectory.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                playClickSound(800);
                setSelectedFilter(filter);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedFilter === filter
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'bg-white text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F1] border border-[#E2E8F0]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Vertical Timeline Spine & Cards */}
      <div className="relative">
        {/* Animated Central Glowing Spine on Desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#10B981] via-[#064E3B] to-[#A7F3D0]" />

        {/* Mobile Left Rail */}
        <div className="md:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#10B981] via-[#064E3B] to-[#A7F3D0]" />

        {/* Milestone Nodes List */}
        <div className="space-y-10 sm:space-y-12">
          {filteredMilestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedId === milestone.id;
            const IconComponent = milestone.icon;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12 pl-12 md:pl-0`}
              >
                {/* Node Center Marker */}
                <div 
                  onClick={() => toggleExpand(milestone.id)}
                  className="absolute left-2 md:left-1/2 -translate-x-1/2 top-4 w-9 h-9 rounded-2xl bg-white border-2 border-[#064E3B] shadow-md flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform z-10"
                >
                  <div className={`w-6 h-6 rounded-xl ${milestone.iconColor} flex items-center justify-center`}>
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Left/Right Content Card Container */}
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <div
                    onClick={() => toggleExpand(milestone.id)}
                    className={`p-6 sm:p-7 rounded-3xl bg-white border transition-all cursor-pointer shadow-xs hover:shadow-md ${
                      isExpanded 
                        ? 'border-[#10B981] ring-1 ring-[#10B981]/30' 
                        : 'border-[#E2E8F0] hover:border-[#A7F3D0]'
                    }`}
                  >
                    {/* Top Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${milestone.statusColor}`}>
                          {milestone.badge}
                        </span>
                        <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#064E3B]" />
                          <span>{milestone.period}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#064E3B] font-bold">
                        <span className="text-[11px] font-mono text-[#64748B]">{isExpanded ? 'Collapse' : 'Details'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#064E3B]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#64748B]" />
                        )}
                      </div>
                    </div>

                    {/* Role & Org Details */}
                    <div className="pt-4 space-y-1.5">
                      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                        {milestone.role}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-[#064E3B] flex flex-wrap items-center gap-x-2">
                        <span>{milestone.organization}</span>
                        {milestone.location && (
                          <span className="text-[#64748B] font-normal flex items-center gap-0.5">
                            &bull; <MapPin className="w-3 h-3 inline" /> {milestone.location}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-[#64748B]">
                        {milestone.affiliation}
                      </p>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-3">
                      {milestone.summary}
                    </p>

                    {/* Key Metrics Chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4">
                      {milestone.keyMetrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-center"
                        >
                          <div className="text-[11px] font-bold text-[#064E3B] truncate">{metric}</div>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Section with Framer Motion AnimatePresence */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden space-y-4 pt-4 mt-4 border-t border-[#E2E8F0]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Detailed Highlights */}
                          <div className="space-y-2.5">
                            <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B]">
                              Key Architectural Deliverables:
                            </div>
                            <div className="space-y-2">
                              {milestone.highlights.map((item, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] space-y-1 text-left"
                                >
                                  <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                                    <span>{item.title}</span>
                                  </div>
                                  <p className="text-xs text-[#475569] leading-relaxed pl-5">
                                    {item.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies Used */}
                          <div className="space-y-1.5">
                            <div className="text-[11px] font-mono text-[#64748B]">Technologies &amp; Systems:</div>
                            <div className="flex flex-wrap gap-1.5">
                              {milestone.techStack.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[11px] font-mono bg-[#FAF9F6] text-[#334155] px-2 py-0.5 rounded-md border border-[#E2E8F0]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
