import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Layers, 
  Code2, 
  Terminal, 
  ArrowRight,
  Sparkles,
  Activity,
  Check,
  Copy
} from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/soundEffects.js';

export const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !project) return null;

  const handleCopyArchitecture = () => {
    navigator.clipboard.writeText(
      `Project: ${project.title}\nCategory: ${project.category}\nTech: ${project.technologies.join(', ')}\nDetails: ${project.details}`
    );
    playSuccessSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF9F6] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#064E3B] border border-[#A7F3D0]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#10B981]" />
                <span>Production Architecture</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-[#64748B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E2E8F0] px-6 bg-white">
          <button
            onClick={() => {
              playClickSound(800);
              setActiveTab('overview');
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#064E3B] text-[#064E3B]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            System Overview &amp; Impact
          </button>
          <button
            onClick={() => {
              playClickSound(800);
              setActiveTab('architecture');
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'architecture'
                ? 'border-[#064E3B] text-[#064E3B]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Architecture Pipeline Diagram
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase font-bold text-[#064E3B]">
                  Executive Summary
                </h3>
                <p className="text-sm text-[#334155] leading-relaxed">
                  {project.summary}
                </p>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {project.details}
                </p>
              </div>

              {/* Metrics Bento */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase font-bold text-[#064E3B]">
                  Key Performance Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] text-center space-y-1">
                      <div className="text-sm font-extrabold text-[#064E3B]">{metric}</div>
                      <div className="text-[10px] text-[#64748B] font-mono">Performance Metric #{idx + 1}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase font-bold text-[#064E3B]">
                  Technology Stack &amp; Libraries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] text-xs font-mono font-medium text-[#334155]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase font-bold text-[#064E3B]">
                  Interactive Architecture Breakdown
                </h3>
                <button
                  onClick={handleCopyArchitecture}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#064E3B] hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Specs' : 'Copy System Specs'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F172A] text-[#E2E8F0] font-mono text-xs space-y-2 border border-slate-800 shadow-inner">
                <div className="text-emerald-400 font-bold border-b border-slate-800 pb-2">
                  [SYSTEM PIPELINE SPECIFICATION &bull; {project.title}]
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div>┌── [Ingress / UI Layer]: React 19 + Tailwind CSS Component Tree</div>
                  <div>├── [Security Middleware]: Rate Limit (Sliding Window) + RFC 5322 Sanitizer</div>
                  <div>├── [Business Core]: REST Endpoints &bull; Asynchronous Node Event Loop</div>
                  <div>├── [Data Stores]: Persistent Schemas (MongoDB BSON &amp; Relational SQL)</div>
                  <div>└── [Egress / Telemetry]: Real-Time WebSocket / Response Stream</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#D1FAE5]/40 border border-[#A7F3D0] text-xs text-[#064E3B] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Forward Deployment Ready</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  This system architecture was designed with production telemetry, client environment adaptability, and low latency throughput in mind.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF9F6] border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="text-xs font-mono text-[#64748B]">
            Architected by Deep Chaudhari
          </span>
          <button
            onClick={onClose}
            className="btn-primary text-xs font-bold py-2 px-5"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
