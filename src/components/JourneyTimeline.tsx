import React from 'react';
import { Milestone, Calendar, MapPin, Sparkles, Award } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 font-mono text-xs mb-3">
            <Milestone className="w-3.5 h-3.5 text-violet-400" />
            <span>06 // TRAJECTORY &amp; MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
            Academic &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Engineering Journey</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono text-gray-400">
            From foundational mathematical modeling to high-scale applied artificial intelligence.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-32 space-y-12">
          {TIMELINE_DATA.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => sound.playHover()}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gray-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300 shadow-md shadow-cyan-500/50">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 absolute inset-0 m-auto animate-ping" />
              </div>

              {/* Timestamp label on left for large screens */}
              <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-mono text-xs text-cyan-400 font-bold">
                {item.year}
              </div>

              {/* Timeline Card */}
              <div className="rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.06] border border-white/10 group-hover:border-cyan-500/40 p-6 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-black/40">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="sm:hidden font-mono text-xs text-cyan-400 font-bold">
                    {item.year}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-950/80 border border-violet-500/30 text-violet-300">
                    {item.period}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <h3 className="text-xl font-outfit font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <h4 className="text-xs font-mono text-cyan-300/80 mb-3">
                  {item.organization}
                </h4>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[10px] font-mono text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
