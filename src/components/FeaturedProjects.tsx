import React, { useState } from 'react';
import { ExternalLink, Sparkles, Layers, ArrowUpRight, Check, Activity, Cpu, Star, Play, Users, Clock, ShieldCheck, Flame } from 'lucide-react';
import { GithubIcon } from './Icons';
import { TiltCard } from './TiltCard';
import { FEATURED_PROJECTS, Project } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const FeaturedProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs = ['All', 'Full-Stack', 'AI / RAG', 'Multi-Agent', 'Data Analytics', 'Systems & C++'];

  const rankupProject = FEATURED_PROJECTS.find((p) => p.id === 'rankup-learning-assistant');

  const filteredProjects =
    activeFilter === 'All'
      ? FEATURED_PROJECTS.filter((p) => p.id !== 'rankup-learning-assistant')
      : FEATURED_PROJECTS.filter((p) => p.category === activeFilter);

  const showRankUpSpotlight = activeFilter === 'All' || activeFilter === 'Full-Stack';

  return (
    <section id="projects" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 // FEATURED ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Works &amp; Projects</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-mono text-gray-400 max-w-xl">
              Production-grade academic suites, ultra-low latency RAG pipelines, and high-throughput systems.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  sound.playClick();
                  setActiveFilter(tab);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  activeFilter === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CROWN JEWEL SPOTLIGHT: RankUp Learning Assistant */}
        {showRankUpSpotlight && rankupProject && (
          <div className="mb-10">
            <TiltCard
              maxTilt={4}
              scale={1.01}
              glare={true}
              className="rounded-3xl"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="rounded-3xl bg-gradient-to-br from-cyan-950/40 via-gray-950/90 to-violet-950/30 border border-cyan-500/40 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-cyan-950/50 relative overflow-hidden group">
                
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  
                  {/* Left Column: Project Overview */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Crown Jewel Tag */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20">
                        <Flame className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                        <span>Flagship Architecture • Live Production App</span>
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 font-semibold">
                        Full-Stack AI Suite
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-outfit font-black text-white leading-tight">
                      RankUp — Smart AI Learning Assistant &amp; Multiplayer Study Arena
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
                      Production-grade AI academic learning suite transforming dense academic notes and textbooks into real-time competitive multiplayer quiz battles, interactive 3D active recall flashcards, and syllabus-grounded diagnostic roadmaps.
                    </p>

                    {/* Architectural KPI Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-black/50 border border-white/10 font-mono">
                      <div className="text-center p-2 rounded-xl bg-white/[0.02]">
                        <div className="text-cyan-400 font-black text-sm sm:text-base">180+ Pages</div>
                        <div className="text-[10px] text-gray-400">Zero-Base64 Buffer</div>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-white/[0.02]">
                        <div className="text-emerald-400 font-black text-sm sm:text-base">&gt;95% Saved</div>
                        <div className="text-[10px] text-gray-400">Storage Optimization</div>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-white/[0.02]">
                        <div className="text-violet-400 font-black text-sm sm:text-base">Real-Time</div>
                        <div className="text-[10px] text-gray-400">Socket.io Multiplayer</div>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-white/[0.02]">
                        <div className="text-sky-400 font-black text-sm sm:text-base">~31ms</div>
                        <div className="text-[10px] text-gray-400">Groq LPU Inference</div>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      {['React 18 + Vite 5', 'Tailwind CSS v4', 'Three.js WebGL', 'Socket.io 4.8', 'Groq LPU', 'Node.js Express', 'MongoDB Atlas', 'PDFKit'].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={rankupProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Launch Live App</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>

                      <a
                        href={rankupProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-gray-200 hover:text-white font-mono font-semibold text-xs transition-all hover:scale-105"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>

                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedProject(rankupProject);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Deep Dive Architecture →</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Live Multiplayer Arena Mockup */}
                  <div className="lg:col-span-5 rounded-2xl bg-gray-950/90 border border-cyan-500/30 p-5 space-y-4 font-mono shadow-2xl relative">
                    
                    {/* Live Room Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-xs font-bold text-white">ARENA ROOM #7X4K92</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                        <span>00:28s</span>
                      </div>
                    </div>

                    {/* Question Card Mockup */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="text-[10px] text-gray-400">CURRENT ROUND // QUANTUM SYSTEMS</div>
                      <div className="text-xs text-gray-100 font-sans font-semibold">
                        What is the time complexity of exact nearest-neighbor search in FAISS FlatIP?
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                        <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold">
                          ✓ O(d • N) Vector Dot
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                          O(log N) KD-Tree
                        </div>
                      </div>
                    </div>

                    {/* Live Leaderboard */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-gray-400 px-1">
                        <span>LIVE MULTIPLAYER LEADERBOARD</span>
                        <span className="text-cyan-400">4 Active Competitors</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-xs">
                        <span className="font-bold text-cyan-300">🥇 Lakshya (Host)</span>
                        <span className="font-bold text-white">2,840 PTS (98%)</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] text-xs text-gray-300">
                        <span>🥈 Kavya_IITI</span>
                        <span className="text-gray-400">2,320 PTS (91%)</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] text-xs text-gray-300">
                        <span>🥉 Dev_Scholar</span>
                        <span className="text-gray-400">1,980 PTS (82%)</span>
                      </div>
                    </div>

                    <div className="pt-2 text-center text-[10px] text-gray-400 border-t border-white/[0.06]">
                      Server-Authoritative Clock Synchronized • WebSockets Active
                    </div>

                  </div>

                </div>

              </div>
            </TiltCard>
          </div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <TiltCard
              key={project.id}
              maxTilt={7}
              scale={1.015}
              glare={true}
              className="h-full rounded-2xl"
              onMouseEnter={() => sound.playHover()}
            >
              <div
                className="group h-full rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-cyan-500/40 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-950/40"
              >
                <div>
                  {/* Top Bar: Category badge + Index */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-bold">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-outfit font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Benchmark Metrics Strip */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-5 p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-cyan-400 font-bold text-xs">{m.value}</div>
                          <div className="text-[9px] text-gray-400">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technical Highlights list */}
                  <ul className="space-y-1.5 mb-5 text-xs text-gray-400">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 text-sm leading-tight">•</span>
                        <span className="line-clamp-2">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom: Tags & Actions */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedProject(project);
                      }}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold group/btn"
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => sound.playClick()}
                          className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors"
                          title="Open Live Application"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

        {/* Deep Dive Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="max-w-2xl w-full bg-gray-950 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-cyan-950/80 relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-mono p-2"
              >
                ✕
              </button>

              <div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-outfit font-black text-white mt-2">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Metrics */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 font-mono">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-cyan-400 font-bold text-base">{m.value}</div>
                      <div className="text-[11px] text-gray-400">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400">Architectural Innovations:</h4>
                <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white"
                >
                  Close
                </button>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-xs transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live App</span>
                  </a>
                )}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono font-bold text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Open on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
