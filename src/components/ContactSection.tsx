import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    sound.playSuccessChime();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    sound.playSuccessChime();

    // Trigger Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#8b5cf6', '#10b981', '#ffffff']
    });

    setSent(true);

    // Open mailto with prefilled body
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      form.subject || `Inquiry from ${form.name || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `From: ${form.name} (${form.email})\n\n${form.message}`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>07 // TRANSMIT SIGNAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Extraordinary</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono text-gray-400 max-w-xl mx-auto">
            Open for AI engineering positions, research fellowships, collaborative LLM architectures, and high-impact internships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Email Card */}
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-300 transition-all border border-white/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                Direct Communication
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base sm:text-lg font-mono font-bold text-white hover:text-cyan-300 transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Social Coordinates */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-blue-500/40 transition-all group backdrop-blur-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 group-hover:text-blue-300">
                    ↗
                  </span>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-white text-sm">LinkedIn</h4>
                  <p className="text-[11px] font-mono text-gray-400 truncate">
                    in/lakshya-rishi-708081331
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-500/40 transition-all group backdrop-blur-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-white">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 group-hover:text-cyan-300">
                    ↗
                  </span>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-white text-sm">GitHub</h4>
                  <p className="text-[11px] font-mono text-gray-400 truncate">
                    @Lakshya1213
                  </p>
                </div>
              </a>

            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs text-gray-400 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-white font-semibold">Indian Institute of Technology Indore</span>
                <p className="text-gray-500 text-[11px]">Khandwa Road, Simrol, Indore 453552, India</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Transmission Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-6 sm:p-9 backdrop-blur-2xl relative shadow-2xl shadow-cyan-950/40">
            <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-2">
              Send a Transmission
            </h3>
            <p className="text-xs font-mono text-gray-400 mb-6">
              Drop a message for collaborations, hiring inquiries, or research discussions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. AI Engineering Role / RAG Collaboration"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the project, team, or problem you want to solve..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Transmission Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Transmission via Email</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
