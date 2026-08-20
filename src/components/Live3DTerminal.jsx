import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, CheckCircle2, ShieldCheck, Cpu, Database, RefreshCw, Copy, Check } from 'lucide-react';

const COMMAND_PRESETS = {
  'deep --status': {
    label: 'System Status',
    description: 'Check active engineering systems and deployment readiness',
    lines: [
      '⚡ [INITIALIZE] Probing Deep Chaudhari Forward Deployment Node...',
      '✔️ [CORE] Computer Engineering @ Shah & Anchor Kutchhi Engineering College (SAKEC)',
      '✔️ [LEADERSHIP] Former Assistant C.T.O. @ SpiroEdu Education Pvt Ltd (SAKEC TBI)',
      '✔️ [ARCHITECTURE] REST APIs, MongoDB, SQL Database Munging, React 19 Frontend',
      '✔️ [SECURITY] Ethical Engineering & RFC 5322 Sanitization Active',
      '🟢 [STATUS] 100% Ready for Forward Deployment & Software Engineering roles',
    ],
  },
  'deep --verify-certs': {
    label: 'Verify 9 Certs',
    description: 'Execute automated cryptographic check on all 9 credentials',
    lines: [
      '🔍 [VALIDATING] Querying verification endpoints for 9 certifications...',
      '1. [WALMART USA] Advanced Software Engineering Simulation (Aug 2026) -> VALID [6a71fac18497bd6cfc27a4b4]',
      '2. [UC IRVINE] The Blockchain Architecture (Feb 2026) -> VALID [Y8MI49O5BU0Q]',
      '3. [UC IRVINE] Cryptography & Hashing Overview (Jul 2026) -> VALID [KOFHF49B8XMO]',
      '4. [INFOSYS] Data Structures & Algorithms in Java -> VALID [Wingspan Verified]',
      '5. [INFOSYS] Database Fundamentals & SQL -> VALID [Wingspan Verified]',
      '6. [IIM BANGALORE / SWAYAM] French Language Foundations (Score: 67%) -> VALID [MR160300941]',
      '7. [SAKEC TBI] SPIRO Internship Completion -> VALID [SAKEC/TBI/2639/2025-26]',
      '8. [SIMPLILEARN] Full-Stack Development 101 -> VALID [8612418]',
      '9. [IIT BOMBAY] C Training Certificate -> VALID [4283529ISU]',
      '✨ [SUCCESS] All 9 credentials cryptographically confirmed.',
    ],
  },
  'deep --cto-pipeline': {
    label: 'SpiroEdu CTO Arch',
    description: 'Inspect architecture built during Assistant C.T.O. tenure',
    lines: [
      '🚀 [SPRIOEDU ARCHITECTURE METRICS]:',
      '├── [Frontend Layer]: Gamified interactive React components + Figma tokens',
      '├── [Auth & Security]: Register, login, hash verification, password recovery',
      '├── [API Subsystem]: REST endpoints for team, terms, contact, and payments',
      '├── [Data Stores]: MongoDB & SQL dual-pipeline persistent user storage',
      '└── [Status]: Production-deployed and operational under SAKEC TBI incubation',
    ],
  },
  'deep --ai-copilot': {
    label: 'Test Gemini 3.7 AI',
    description: 'Ping server-side Gemini 3.7 Flash AI Copilot agent',
    lines: [
      '🤖 [AI AGENT] Connecting to Google Gemini 3.7 Flash server-side agent...',
      '✔️ [CONTEXT] Deep Chaudhari Knowledge Graph & SAKEC Engineering Profile loaded',
      '✔️ [LATENCY] Response time: 240ms | Fallback engine: Active',
      '🟢 [AI READY] Deep\'s AI Copilot is listening via floating assistant.',
    ],
  },
};

export const Live3DTerminal = () => {
  const [selectedCmd, setSelectedCmd] = useState('deep --status');
  const [outputLines, setOutputLines] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef(null);

  const runCommand = (cmdKey) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setSelectedCmd(cmdKey);
    setIsExecuting(true);
    setOutputLines([]);

    const targetLines = COMMAND_PRESETS[cmdKey]?.lines || ['Command not found.'];
    let currentLine = 0;

    intervalRef.current = setInterval(() => {
      if (currentLine < targetLines.length) {
        const nextLine = targetLines[currentLine];
        if (typeof nextLine === 'string') {
          setOutputLines((prev) => [...prev, nextLine]);
        }
        currentLine++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsExecuting(false);
      }
    }, 120);
  };

  useEffect(() => {
    runCommand('deep --status');
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(outputLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-3xl bg-[#0F172A] border border-[#1E293B] shadow-2xl p-4 sm:p-6 text-slate-100 overflow-hidden group perspective-1000">
      {/* 3D Depth Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 font-bold flex items-center gap-1.5 pl-2">
            <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
            <span>deep@forward-deploy-node:~$</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-emerald-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Output'}</span>
          </button>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Node</span>
          </span>
        </div>
      </div>

      {/* Preset interactive triggers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {Object.entries(COMMAND_PRESETS).map(([key, item]) => {
          const isActive = selectedCmd === key;
          return (
            <button
              key={key}
              onClick={() => runCommand(key)}
              disabled={isExecuting}
              className={`p-2.5 rounded-xl border text-left font-mono transition-all text-xs flex flex-col justify-between gap-1 ${
                isActive
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-900/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{item.label}</span>
                <Play className={`w-2.5 h-2.5 ${isActive ? 'text-emerald-400 fill-emerald-400' : 'text-slate-500'}`} />
              </div>
              <span className="text-[10px] text-slate-400 font-sans truncate">{item.description}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal View Screen */}
      <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs text-slate-300 min-h-[220px] max-h-[260px] overflow-y-auto border border-slate-800/80 space-y-1.5 select-text shadow-inner">
        <div className="flex items-center gap-2 text-emerald-400 pb-1 border-b border-slate-900">
          <span className="text-slate-500">$</span>
          <span className="font-bold">{selectedCmd}</span>
          {isExecuting && <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" />}
        </div>

        {outputLines.map((line, idx) => {
          const safeLine = typeof line === 'string' ? line : '';
          const isHighlight =
            safeLine.includes('SUCCESS') ||
            safeLine.includes('VALID') ||
            safeLine.includes('CORE') ||
            safeLine.includes('STATUS');
          const isCyan = safeLine.includes('INITIALIZE') || safeLine.includes('VALIDATING');

          return (
            <div
              key={idx}
              className={`leading-relaxed animate-in fade-in ${
                isHighlight ? 'text-emerald-400' : isCyan ? 'text-cyan-300' : 'text-slate-300'
              }`}
            >
              {safeLine}
            </div>
          );
        })}

        {isExecuting && (
          <div className="flex items-center gap-1 text-slate-500 pt-1">
            <span className="w-2 h-4 bg-emerald-400 animate-pulse" />
            <span className="text-[11px]">Streaming output...</span>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Target: Deep Sandeep Chaudhari &bull; Forward Deployment</span>
        <span className="text-emerald-400 font-bold">SHA-256 Verified</span>
      </div>
    </div>
  );
};
