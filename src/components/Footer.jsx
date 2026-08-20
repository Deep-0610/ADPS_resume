import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { DEEP_PROFILE } from '../data/deepResumeData.js';
import { ProfileAvatar } from './ProfileAvatar.jsx';

export const Footer = () => {
  return (
    <footer id="site-footer" className="bg-[#FAF9F6] border-t border-[#E2E8F0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#E2E8F0]">
          {/* Col 1: Deep Profile Statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <ProfileAvatar
                className="w-10 h-10 rounded-xl shadow-xs"
                label="Portrait of Deep Chaudhari"
              />
              <div>
                <h3 className="font-extrabold text-lg text-[#0F172A] leading-none">
                  Deep Chaudhari
                </h3>
                <p className="text-xs text-[#064E3B] font-semibold mt-1">
                  Full-Stack Software Engineer &bull; Forward Deployment Specialist
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-md">
              Computer Engineering undergraduate at SAKEC and former Assistant C.T.O. at SpiroEdu. Dedicated to engineering robust REST APIs, secure authentication systems, blockchain primitives, and scalable AI solutions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${DEEP_PROFILE.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#064E3B] hover:border-[#A7F3D0] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{DEEP_PROFILE.email}</span>
              </a>
              <a
                href={`tel:${DEEP_PROFILE.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#064E3B] hover:border-[#A7F3D0] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{DEEP_PROFILE.phone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B]">
              Sections &amp; Credentials
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-[#475569] hover:text-[#064E3B] transition-colors">
                  Overview &amp; 3D Showcase
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-[#475569] hover:text-[#064E3B] transition-colors">
                  Assistant C.T.O. Experience
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-[#475569] hover:text-[#064E3B] transition-colors flex items-center gap-1.5">
                  <span>9 Verified Certifications</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#D1FAE5] text-[#064E3B]">Verified</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-[#475569] hover:text-[#064E3B] transition-colors">
                  Featured Systems &amp; Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#475569] hover:text-[#064E3B] transition-colors">
                  Contact &amp; Schedule Interview
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Professional Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B]">
              Education &amp; Location
            </h4>
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    B.Tech in Computer Engineering (2024 - 2028)
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    Shah &amp; Anchor Kutchhi Engineering College (SAKEC), Mumbai
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-xs text-[#475569]">
                <MapPin className="w-4 h-4 text-[#064E3B] shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#064E3B] pt-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Available for Forward Deployment &amp; Software Roles</span>
            </div>
          </div>
        </div>

        {/* Lower Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <div>
            &copy; {new Date().getFullYear()} Deep Chaudhari. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#064E3B] font-semibold">B.Tech &bull; SAKEC Mumbai</span>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-[#064E3B] underline underline-offset-4">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
