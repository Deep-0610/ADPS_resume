import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Database, 
  ShieldCheck, 
  ArrowRight,
  Boxes,
  Zap,
  Terminal,
  Activity,
  Maximize2
} from 'lucide-react';
import { DEEP_PROJECTS } from '../data/deepResumeData.js';
import { TiltCard3D } from '../components/TiltCard3D.jsx';
import { ProjectDetailModal } from '../components/ProjectDetailModal.jsx';
import { playClickSound } from '../utils/soundEffects.js';

export const Projects = ({ onOpenChat }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full-Stack Web & Auth', 'AI Systems & Gemini', 'Blockchain & Cryptography', 'Databases & Systems'];

  const filteredProjects = DEEP_PROJECTS.filter((proj) => 
    activeCategory === 'All' || proj.category === activeCategory
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-[#FAF9F6] text-[#0F172A] relative overflow-hidden">
      {/* Ambient 3D Glow Backdrops */}
      <div className="glow-orb-forest w-[600px] h-[600px] -top-24 right-10" />
      <div className="glow-orb-sage w-[700px] h-[700px] top-[40%] -left-48" />

      {/* 1. HEADER */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              Systems &bull; Architectures &bull; Implementations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Featured Projects &amp;{' '}
              <span className="text-[#064E3B]">Case Studies</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Explore production architectures, distributed systems prototypes, and forward deployment solutions engineered by Deep Chaudhari. Click any card to inspect full pipeline specifications.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound(800);
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'bg-white text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F1] border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PROJECTS GRID WITH 3D TILT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard3D key={project.id} maxRotation={5} scale={1.015}>
              <div 
                onClick={() => {
                  playClickSound(1000);
                  setSelectedProject(project);
                }}
                className="p-8 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-6 h-full shadow-sm hover:border-[#A7F3D0] transition-all cursor-pointer group hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#D1FAE5] text-[#064E3B] border border-[#A7F3D0]">
                      {project.category}
                    </span>
                    <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5 bg-[#FAF9F6] px-2.5 py-1 rounded-full border border-[#E2E8F0] group-hover:bg-[#D1FAE5] transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect Architecture</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-snug group-hover:text-[#064E3B] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {project.details}
                  </p>

                  {/* Key Metrics Bento */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-center"
                      >
                        <div className="text-xs font-bold text-[#064E3B] truncate">{metric}</div>
                        <div className="text-[10px] text-[#64748B] font-mono mt-0.5">Metric #{mIdx + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono bg-[#FAF9F6] text-[#334155] px-2.5 py-1 rounded-md border border-[#E2E8F0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono text-[#64748B]">
                      Production Ready
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#064E3B] group-hover:underline">
                      <span>View Full System Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
