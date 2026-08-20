import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Filter, 
  Sparkles, 
  BookOpen,
  Calendar,
  Layers,
  FileCheck,
  RotateCw,
  Maximize2
} from 'lucide-react';
import { DEEP_CERTIFICATES } from '../data/deepResumeData.js';
import { CertificateFlipCard3D } from '../components/CertificateFlipCard3D.jsx';
import { CertificateDetailModal } from '../components/CertificateDetailModal.jsx';
import { playClickSound } from '../utils/soundEffects.js';

export const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  const categories = ['All', 'Software Engineering', 'Blockchain & Security', 'Databases & DSA', 'Languages & General'];

  const filteredCertificates = DEEP_CERTIFICATES.filter((cert) => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase().trim();
    if (!q) return matchesCategory;
    const titleMatch = (cert.title || '').toLowerCase().includes(q);
    const issuerMatch = (cert.issuer || '').toLowerCase().includes(q);
    const skillMatch = Array.isArray(cert.skills) && cert.skills.some(s => (s || '').toLowerCase().includes(q));
    return matchesCategory && (titleMatch || issuerMatch || skillMatch);
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-[#FAF9F6] text-[#0F172A] relative overflow-hidden">
      {/* Ambient glowing 3D backdrops */}
      <div className="glow-orb-forest w-[500px] h-[500px] -top-24 right-0" />
      <div className="glow-orb-sage w-[600px] h-[600px] top-[40%] -left-32" />

      {/* 1. HEADER */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                Verified Credentials &bull; 9 Accreditations
              </span>
              <span className="text-xs font-mono font-bold text-[#064E3B] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-[#10B981]" />
                <span>Interactive 3D Flip Cards</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Certifications &amp;{' '}
              <span className="text-[#064E3B]">Accreditations</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Every credential is proctored, peer-reviewed, and verified by industry leaders including Walmart USA, University of California Irvine, Infosys Springboard, IIM Bangalore, IIT Bombay, and SAKEC TBI.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-6 rounded-3xl shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClickSound(800);
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'bg-[#FAF9F6] text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F1] border border-[#E2E8F0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skills, issuers, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#FAF9F6] border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#064E3B] focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CERTIFICATES 3D FLIP GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E2E8F0] p-8 space-y-3">
            <Award className="w-10 h-10 text-[#94A3B8] mx-auto" />
            <h3 className="font-bold text-[#0F172A]">No matching certificates found</h3>
            <p className="text-xs text-[#64748B]">Try adjusting your search terms or filter category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCertificates.map((cert) => (
              <CertificateFlipCard3D 
                key={cert.id} 
                cert={cert} 
                onInspect={(c) => setSelectedCert(c)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Certificate Detail Inspection Modal */}
      <CertificateDetailModal
        cert={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
