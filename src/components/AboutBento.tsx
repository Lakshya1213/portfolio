import React from 'react';
import { GraduationCap, Brain, Network, Sparkles, Mail, MapPin, Code2, Cpu, Award, Terminal, CheckCircle2, Flame, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const AboutBento: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>01 // ARCHITECT PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Lakshya Rishi</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-2xl font-mono">
            Bridging fundamental mathematical optimization, applied machine learning, and scalable software systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Bento Card 1: Core Story & Vision (7 cols) */}
          <div className="md:col-span-7 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-white text-lg sm:text-xl">Engineering Philosophy</h3>
                <span className="text-xs font-mono text-cyan-400">Research to Production Pipeline</span>
              </div>
            </div>

            <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4">
              I am an Applied AI Engineer and undergraduate scholar at <strong className="text-cyan-300 font-semibold">IIT Indore</strong> with an obsessive drive to build real, resilient artificial intelligence systems. Rather than viewing machine learning as a theoretical black box, I treat it as an engineering craft governed by loss surfaces, data pipelines, and system bottlenecks.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              My hands-on work spans building production-grade semantic retrieval pipelines, multi-agent frameworks that perform recursive reasoning, and quantitative analytics tools. I turn modern AI papers and mathematical algorithms into high-throughput software with clean code and verifiable benchmarks.
            </p>

            {/* Core Capability Pills */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Primary Engineering Disciplines</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Applied Deep Learning",
                  "Multi-Agent Architectures",
                  "FastAPI High-Concurrency Endpoints",
                  "Mathematical Optimization",
                  "Quantitative Forecasting",
                  "Vector Databases & Neural Search"
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:border-cyan-500/40 text-xs font-mono transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>IIT Indore, Madhya Pradesh, India</span>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Bento Card 2: Academic Pedigree IIT Indore (5 cols) */}
          <div className="md:col-span-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-500/20 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-violet-950/80 border border-violet-500/30 text-violet-300">
                  Roll: 240005026
                </span>
              </div>

              <h3 className="font-outfit font-bold text-white text-xl">Indian Institute of Technology Indore</h3>
              <p className="text-xs font-mono text-cyan-400 mt-0.5">IIT Indore • B.Tech Candidate</p>

              <div className="mt-4 space-y-2 text-xs text-gray-300">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="font-semibold text-white font-mono flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Academic Foundation
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Rigorous education spanning Linear Algebra, Numerical Optimization, Computational Analytics, and Machine Learning.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="font-semibold text-white font-mono flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    Research &amp; Open Source
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Active contributor in IITISOC (IIT Indore Summer of Code) and technical student organizations exploring applied artificial intelligence.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="text-gray-300">Institution Status</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Scholar
              </span>
            </div>
          </div>

          {/* Bento Card 3: Deep Technical Pillars (4 cols) */}
          <div className="md:col-span-4 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl group hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-cyan-400">
                <Network className="w-4 h-4" />
                <h4 className="font-outfit font-bold text-white text-base">Neural Search &amp; RAG</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Hybrid semantic retrieval pipelines with dense vector indexing, contextual chunking, and cross-encoder rerankers that eliminate hallucinations.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-3 border-t border-white/5">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">FAISS</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">BGE Embeddings</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">Groq Llama 3.1</span>
            </div>
          </div>

          {/* Bento Card 4: Multi-Agent Systems (4 cols) */}
          <div className="md:col-span-4 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl group hover:border-violet-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-violet-400">
                <Cpu className="w-4 h-4" />
                <h4 className="font-outfit font-bold text-white text-base">Autonomous Agent Swarms</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Multi-agent architectures coordinating specialized LLM agents to plan, scrape data, execute tools, and self-correct across complex workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-3 border-t border-white/5">
              <span className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30 text-violet-300">LangGraph</span>
              <span className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30 text-violet-300">ReAct Loops</span>
              <span className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30 text-violet-300">AsyncIO</span>
            </div>
          </div>

          {/* Bento Card 5: Quantitative Analytics (4 cols) */}
          <div className="md:col-span-4 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl group hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                <Flame className="w-4 h-4" />
                <h4 className="font-outfit font-bold text-white text-base">Quantitative Analytics</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Time-series forecasting, algorithmic indicator screening, and end-to-end data analytics transforming raw numbers into decision-making signals.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-3 border-t border-white/5">
              <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">Prophet ML</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">Pandas &amp; NumPy</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">Power BI</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
