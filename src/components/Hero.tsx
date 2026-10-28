import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Download, Mail, ExternalLink } from 'lucide-react';
import { DecryptText } from './DecryptText';
import { Interactive3DModel } from './Interactive3DModel';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

const ROLES = [
  "Applied AI Engineer",
  "IIT Indore Scholar",
  "RAG & Neural Search Specialist",
  "Multi-Agent Architect",
  "Quantitative Analytics & Prophet ML"
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(current.substring(0, displayedRole.length + 1));
        if (displayedRole.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedRole(current.substring(0, displayedRole.length - 1));
        if (displayedRole.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/15 via-violet-600/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>IIT Indore</span>
              <span className="text-gray-500">•</span>
              <span>Available for AI/ML Roles & Research</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase">
                &lt;System.Developer /&gt;
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-outfit font-black tracking-tight text-white leading-[1.08]">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 drop-shadow-sm">
                  <DecryptText text="LAKSHYA RISHI" playSound={true} />
                </span>
              </h1>
            </div>

            {/* Dynamic Typewriter Role */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <div className="font-mono text-lg sm:text-2xl text-gray-200 flex items-center">
                <span className="text-cyan-400 mr-2.5 font-bold">&gt;</span>
                <span className="border-b-2 border-cyan-400 pb-0.5">{displayedRole}</span>
                <span className="w-2.5 h-6 bg-cyan-400 ml-1 inline-block animate-pulse" />
              </div>
            </div>

            {/* Bio Teaser */}
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Undergraduate scholar at <strong className="text-cyan-300 font-semibold">IIT Indore</strong> specializing in Applied Artificial Intelligence, autonomous agent architectures, and machine learning systems. Passionate about translating complex algorithmic research into scalable, real-world software.
            </p>

            {/* Core Domain Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-cyan-500/40 transition-colors">
                <div className="text-xs font-mono font-bold text-cyan-400">Applied AI</div>
                <div className="text-[11px] font-mono text-gray-400">Deep Learning & LLMs</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-violet-500/40 transition-colors">
                <div className="text-xs font-mono font-bold text-violet-400">Multi-Agent</div>
                <div className="text-[11px] font-mono text-gray-400">Autonomous Workflows</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-emerald-500/40 transition-colors">
                <div className="text-xs font-mono font-bold text-emerald-400">Data Analytics</div>
                <div className="text-[11px] font-mono text-gray-400">Predictive Pipelines</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group hover:border-amber-500/40 transition-colors">
                <div className="text-xs font-mono font-bold text-amber-400">34+ Repos</div>
                <div className="text-[11px] font-mono text-gray-400">Open Source Work</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900/90 hover:bg-gray-800 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 font-mono font-medium text-sm transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Get In Touch</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-gray-300 hover:text-white font-mono text-sm transition-all"
              >
                <span>GitHub Repos</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>

          </div>

          {/* Right Column: 3D Interactive Model Canvas */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <Interactive3DModel />

            {/* Bottom 3D Model Control Hint */}
            <div className="mt-2 text-center">
              <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[10px] font-mono text-gray-400 backdrop-blur-sm">
                🖱️ Drag 360° to rotate • Real-time 3D developer character
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Scroll to explore</span>
        <div className="w-4 h-7 rounded-full border border-gray-400 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
