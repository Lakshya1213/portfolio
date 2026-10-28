import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Heart, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-2xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo & Meta */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px]">
              <div className="w-full h-full bg-gray-950 rounded-xl flex items-center justify-center font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 text-sm">
                LR
              </div>
            </div>
            <div>
              <span className="font-outfit font-bold text-white text-base">Lakshya Rishi</span>
              <span className="text-gray-400 text-xs font-mono block">IIT Indore • Applied AI Engineer</span>
            </div>
          </div>

          {/* Realtime Node Clock & System Status */}
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYS.ONLINE // 99.98%</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
              {time || '19:27:00 IST'}
            </div>
          </div>

          {/* Socials & Scroll to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              title="Return to Top"
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 border border-cyan-500/40 transition-all hover:scale-110 active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-2">
          <div>
            © {new Date().getFullYear()} Lakshya Rishi. All rights reserved. Built with Three.js, GSAP &amp; React.
          </div>
          <div className="text-gray-400 flex items-center gap-1">
            <span>Crafted for high performance &amp; neural scale</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
