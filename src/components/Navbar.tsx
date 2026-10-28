import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'What I Do', href: '#what-i-do' },
    { name: 'Arsenal', href: '#arsenal' },
    { name: 'Projects', href: '#projects' },
    { name: 'Lab', href: '#architecture' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact', highlight: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-gray-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', window.location.pathname);
            }}
            onMouseEnter={() => sound.playHover()}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
              <div className="w-full h-full bg-gray-950 rounded-xl flex items-center justify-center font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 text-base">
                LR
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-gray-950 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-white text-base tracking-wide flex items-center gap-1.5">
                Lakshya Rishi
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  IIT Indore
                </span>
              </span>
              <span className="text-[11px] font-mono text-gray-400 tracking-wider">
                Applied AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                  link.highlight
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/40 hover:bg-cyan-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Tools: Sound Toggle + Socials */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle with Animated Equalizer */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Procedural Audio Synthesizer' : 'Mute Procedural Audio Synthesizer'}
              className="relative px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-gray-500" />
              ) : (
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-0.5 h-3 bg-cyan-400 animate-pulse rounded-full" />
                    <span className="w-0.5 h-2 bg-sky-300 animate-ping rounded-full" />
                    <span className="w-0.5 h-3.5 bg-violet-400 animate-pulse rounded-full" />
                  </div>
                </div>
              )}
              <span className="text-[10px] font-mono text-gray-400 hidden xl:inline group-hover:text-cyan-300">
                {isMuted ? 'Audio: OFF' : 'Audio: ON'}
              </span>
            </button>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-blue-400 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 border border-white/15 text-xs font-mono font-semibold text-white shadow-md transition-all hover:scale-105"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              <span>GitHub</span>
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px]">
                34
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-950/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-lg text-sm font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-cyan-300"
            >
              <GithubIcon className="w-4 h-4" />
              github.com/Lakshya1213
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-blue-400"
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
