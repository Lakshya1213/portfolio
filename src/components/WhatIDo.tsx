import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { WHAT_I_DO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const WhatIDo: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const handleCardClick = (index: number) => {
    sound.playClick();
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section id="what-i-do" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-violet-300 font-mono text-xs mb-3">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>02 // SPECIALIZATION & SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">I Engineer</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm font-mono max-w-md">
            Production-grade architectures designed for high throughput, low latency, and real-world reliability.
          </p>
        </div>

        {/* The 4 Architectural Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHAT_I_DO_DATA.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <TiltCard
                key={item.number}
                maxTilt={6}
                scale={1.015}
                glare={true}
                className="h-full rounded-2xl"
              >
                <div
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => sound.playHover()}
                  className={`group relative h-full rounded-2xl p-7 sm:p-9 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl border ${
                    isActive
                      ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.03] border-cyan-400/50 shadow-2xl shadow-cyan-950/60'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20'
                  }`}
                >
                {/* SVG Corner Accents (Folder 3 aesthetic) */}
                <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
                  <svg className="w-full h-full stroke-cyan-400/50" fill="none">
                    <path d="M0 8 V0 H8" strokeWidth="2" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                  <svg className="w-full h-full stroke-cyan-400/50" fill="none">
                    <path d="M8 0 V8 H0" strokeWidth="2" strokeDasharray="3 3" />
                  </svg>
                </div>

                {/* Header: Number and Arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-cyan-400/70 group-hover:text-cyan-300 transition-colors">
                      {item.number}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                      {item.subtitle}
                    </span>
                  </div>

                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                    isActive ? 'bg-cyan-500 text-black border-cyan-400 rotate-45' : 'bg-white/5 text-gray-400 border-white/10 group-hover:text-white'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>

                {/* Skillset & Tools tags */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Key Capabilities & Stack</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 group-hover:border-cyan-500/30 text-xs font-mono transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
