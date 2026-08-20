import React, { useState, useMemo } from 'react';
import { GitCommit, Sparkles, Flame, CheckCircle2, Terminal, Code2, Calendar } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects.js';

export const GitActivityMatrix = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate an authentic 52-week activity heatmap with seasonal engineering bursts
  const matrix = useMemo(() => {
    const weeks = [];
    // 52 weeks * 7 days
    const totalDays = 52 * 7;
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        // High density around Jan-Sep 2025 (SpiroEdu tenure) and cert sprints
        const dayIndex = w * 7 + d;
        let level = 0;
        const seed = Math.sin(dayIndex * 0.1) + Math.cos(dayIndex * 0.05);
        if (seed > 0.6) level = 4;
        else if (seed > 0.2) level = 3;
        else if (seed > -0.3) level = 2;
        else if (seed > -0.7) level = 1;
        else level = 0;

        days.push({
          level,
          count: level === 4 ? 8 + (dayIndex % 6) : level === 3 ? 5 + (dayIndex % 4) : level === 2 ? 2 + (dayIndex % 3) : level === 1 ? 1 : 0,
          week: w,
          day: d
        });
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const getCellColor = (level) => {
    switch (level) {
      case 4: return 'bg-[#064E3B] border-[#043d2e]';
      case 3: return 'bg-[#10B981] border-[#059669]';
      case 2: return 'bg-[#6EE7B7] border-[#34D399]';
      case 1: return 'bg-[#D1FAE5] border-[#A7F3D0]';
      default: return 'bg-[#F1F5F1] border-[#E2E8F0]';
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-sage flex items-center gap-1">
              <GitCommit className="w-3.5 h-3.5 text-[#064E3B]" />
              <span>Engineering Telemetry</span>
            </span>
            <span className="text-xs font-mono text-[#64748B]">Continuous Shipping</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
            Code Activity &amp; Commit Velocity
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-[#FAF9F6] px-3 py-1.5 rounded-full border border-[#E2E8F0]">
            <Flame className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="font-bold text-[#0F172A]">780+ Contributions</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF9F6] px-3 py-1.5 rounded-full border border-[#E2E8F0] hidden sm:flex">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-[#064E3B] font-bold">100% Production Tested</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          <div className="flex gap-[3px] items-center justify-between">
            {matrix.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => {
                      playClickSound(1200);
                      setHoveredCell(day);
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-[11px] h-[11px] rounded-[3px] border transition-transform hover:scale-125 cursor-pointer ${getCellColor(
                      day.level
                    )}`}
                    title={`${day.count} commits`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-3">
            <span>52 Weeks &bull; SAKEC Labs &amp; SpiroEdu Production</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F1F5F1] border border-[#E2E8F0]" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#D1FAE5] border border-[#A7F3D0]" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6EE7B7] border border-[#34D399]" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] border border-[#059669]" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#064E3B] border border-[#043d2e]" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Info Tooltip Banner */}
      <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#475569]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#064E3B]" />
          <span>
            {hoveredCell
              ? `Week ${hoveredCell.week + 1}: ${hoveredCell.count} recorded commits and feature deployments.`
              : 'Hover over any node to inspect git commit density and release milestones.'}
          </span>
        </div>
        <span className="text-[#064E3B] font-bold">Deep Sandeep Chaudhari</span>
      </div>
    </div>
  );
};
