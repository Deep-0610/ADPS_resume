import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, RotateCw } from 'lucide-react';

const TECH_ITEMS = [
  { text: 'React 19', category: 'frontend' },
  { text: 'TypeScript', category: 'frontend' },
  { text: 'Node.js', category: 'backend' },
  { text: 'Express.js', category: 'backend' },
  { text: 'REST APIs', category: 'backend' },
  { text: 'MongoDB', category: 'backend' },
  { text: 'SQL / Relational', category: 'backend' },
  { text: 'Java (DSA)', category: 'core' },
  { text: 'C Programming', category: 'core' },
  { text: 'Blockchain', category: 'emerging' },
  { text: 'Cryptography', category: 'emerging' },
  { text: 'Gemini AI', category: 'emerging' },
  { text: 'Forward Deploy', category: 'emerging' },
  { text: 'Figma Tokens', category: 'frontend' },
  { text: 'JWT Security', category: 'backend' },
  { text: 'Tailwind CSS', category: 'frontend' },
  { text: 'Walmart SWE', category: 'core' },
  { text: 'SpiroEdu CTO', category: 'core' },
];

export const TechSphere3D = () => {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 360);

    const radius = Math.min(width, height) * 0.38;

    // Fibonacci Sphere point generation
    const nodes = TECH_ITEMS.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / TECH_ITEMS.length);
      const theta = Math.sqrt(TECH_ITEMS.length * Math.PI) * phi;
      return {
        text: item.text,
        category: item.category,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });

    let angleX = 0.003;
    let angleY = 0.004;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    const onMouseDown = (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;

      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        angleY = deltaX * 0.005;
        angleX = -deltaY * 0.005;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Color palette based on categories
    const getCategoryColors = (category) => {
      switch (category) {
        case 'emerging':
          return { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' };
        case 'frontend':
          return { bg: '#E0F2FE', text: '#0369A1', border: '#38BDF8' };
        case 'backend':
          return { bg: '#D1FAE5', text: '#064E3B', border: '#10B981' };
        default:
          return { bg: '#F1F5F9', text: '#0F172A', border: '#64748B' };
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient globe glow ring
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, radius * 1.2);
      gradient.addColorStop(0, 'rgba(209, 250, 229, 0.35)');
      gradient.addColorStop(0.7, 'rgba(167, 243, 208, 0.1)');
      gradient.addColorStop(1, 'rgba(250, 249, 246, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Smooth decay of inertia
      if (!isDragging) {
        angleX *= 0.98;
        angleY *= 0.98;
        if (Math.abs(angleX) < 0.002) angleX = 0.0025;
        if (Math.abs(angleY) < 0.002) angleY = 0.0035;
      }

      // Rotate nodes around X and Y
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      nodes.forEach((node) => {
        // Rotation Y
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Rotation X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        node.x = x1;
        node.y = y2;
        node.z = z2;
      });

      // Sort by Z for proper 3D depth rendering
      const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

      // Draw subtle orbital connector lines between close nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < sortedNodes.length; i++) {
        for (let j = i + 1; j < sortedNodes.length; j++) {
          const n1 = sortedNodes[i];
          const n2 = sortedNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z);
          if (dist < radius * 0.75) {
            const alpha = Math.max(0, (1 - dist / (radius * 0.75)) * 0.25 * ((n1.z + n2.z + 2 * radius) / (4 * radius)));
            ctx.strokeStyle = `rgba(6, 78, 59, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(width / 2 + n1.x, height / 2 + n1.y);
            ctx.lineTo(width / 2 + n2.x, height / 2 + n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      sortedNodes.forEach((node) => {
        const scale = (node.z + radius * 1.5) / (radius * 2.5);
        const screenX = width / 2 + node.x;
        const screenY = height / 2 + node.y;
        const opacity = Math.max(0.2, (node.z + radius) / (2 * radius));

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(Math.max(0.65, scale), Math.max(0.65, scale));

        const colors = getCategoryColors(node.category);

        // Check if mouse hover
        const isNearMouse = Math.hypot(mouseX - node.x, mouseY - node.y) < 30;

        // Draw pill badge background
        ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
        const textMetrics = ctx.measureText(node.text);
        const pillWidth = textMetrics.width + 16;
        const pillHeight = 20;

        ctx.fillStyle = colors.bg;
        ctx.globalAlpha = Math.min(1, opacity + 0.2);
        ctx.shadowColor = 'rgba(6, 78, 59, 0.15)';
        ctx.shadowBlur = 6;

        // Rounded pill
        ctx.beginPath();
        ctx.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, 10);
        ctx.fill();

        ctx.strokeStyle = isNearMouse ? '#064E3B' : colors.border;
        ctx.lineWidth = isNearMouse ? 1.5 : 1;
        ctx.stroke();

        // Node text
        ctx.fillStyle = colors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.text, 0, 0);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div
      className="relative p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-3 overflow-hidden group hover:border-[#A7F3D0] transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#064E3B]">
            Interactive 3D Skill Sphere
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-[#64748B] bg-[#FAF9F6] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
          <RotateCw className="w-3 h-3 text-[#064E3B] animate-spin-slow" />
          <span>Drag or hover to rotate</span>
        </div>
      </div>

      <div className="relative w-full h-[360px] cursor-grab active:cursor-grabbing flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-[#475569]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Backend &amp; DB
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Frontend &amp; UI
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> AI &amp; Blockchain
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#64748B]" /> Core DSA &amp; Leadership
        </span>
      </div>
    </div>
  );
};
