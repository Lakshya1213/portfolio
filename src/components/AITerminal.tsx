import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Sparkles, CornerDownLeft, ShieldCheck, Check } from 'lucide-react';
import { sound } from '../utils/sound';
import { PERSONAL_INFO, FEATURED_PROJECTS } from '../data/portfolioData';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string;
}

export const AITerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: 'LR-OS [Version 2.4.0-AI]' },
    { type: 'system', text: 'Lakshya Rishi Neural Core initialized. Type "help" to view available subroutines.' },
    { type: 'output', text: 'Connected to Indian Institute of Technology Indore Node [iiti.ac.in]' }
  ]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only scroll the terminal window internally when commands are run, NEVER scroll the browser window!
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sound.playClick();

    const newLines: TerminalLine[] = [...lines, { type: 'input', text: `$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newLines.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
• whoami / bio    : Overview of Lakshya Rishi & research focus
• rag             : RAG Multi-Document Engine benchmarks & metrics
• skills / stack  : Technical competencies & frameworks
• projects        : Featured AI/ML architectures & code repositories
• iit / education : Academic details & IIT Indore curriculum
• stats           : Engineering KPIs (recall, latency, repos)
• contact         : Official email & professional coordinates
• easter-egg      : Hidden philosophy & AI research insights
• clear           : Wipe terminal buffer`
        });
        break;

      case 'whoami':
      case 'bio':
        newLines.push({
          type: 'output',
          text: `IDENT: ${PERSONAL_INFO.name}
ROLE: Applied AI Engineer | IIT Indore Scholar
FOCUS: Retrieval-Augmented Generation, Multi-Agent Systems, Quantitative Analytics
CREED: "Turning research papers and mathematical ideas into production AI systems."
EMAIL: ${PERSONAL_INFO.email}
LINKEDIN: ${PERSONAL_INFO.linkedin}`
        });
        break;

      case 'rag':
        newLines.push({
          type: 'success',
          text: `[RAG BENCHMARK REPORT]
• Target: Enterprise Multi-Document Contextual Synthesis
• Recall@3: ~95%
• MRR@3: 0.867
• Avg Semantic Latency: 31 ms
• Architecture: Dense BGE Embeddings + FAISS FlatIP + Cross-Encoder Reranker + Groq Llama 3.1
• Pipeline: Async FastAPI with streaming context budget allocation`
        });
        break;

      case 'skills':
      case 'stack':
        newLines.push({
          type: 'output',
          text: `CORE ARSENAL:
[AI/ML]    : PyTorch, RAG, FAISS, LangChain, LangGraph, Groq Llama 3.1, Scikit-Learn
[LANGS]    : Python, C++, SQL, JavaScript/TypeScript, Kotlin
[DATA]     : Pandas, NumPy, Prophet Time Series, Power BI, Streamlit, Web Scraping
[SYSTEMS]  : FastAPI, PostgreSQL, Linux, Docker, Git, Three.js WebGL`
        });
        break;

      case 'projects':
        newLines.push({
          type: 'output',
          text: `FEATURED REPOSITORIES & ARCHITECTURES:
1. RankUp — Smart AI Learning Assistant & Multiplayer Arena (React 18 + Sockets + Groq + Three.js)
   Live: https://rank-up-learning-assistant.vercel.app/
2. RAG-Based Multi-Document QA Engine (FAISS + BGE + Groq Llama 3.1)
3. Advanced Stock Screener & AI Chatbot (Prophet ML + LangChain)
4. Autonomous Multi-Agent Orchestration Framework (ReAct loops)
5. Real Estate Document Intelligence (OCR + Deed Parser)
6. Movie Recommender System (TF-IDF + Cosine Similarity)
7. CLI Markdown Converter (Modern C++ AST Parser)`
        });
        break;

      case 'iit':
      case 'education':
        newLines.push({
          type: 'output',
          text: `INSTITUTION: Indian Institute of Technology Indore (IIT Indore)
DEGREE: Bachelor of Technology (B.Tech)
DEPARTMENT: Metallurgical Engineering & Materials Science (with AI/ML minor focus)
STUDENT ID: mems240005026@iiti.ac.in
AFFILIATION: Active in IITISOC (IIT Indore Summer of Code)`
        });
        break;

      case 'stats':
        newLines.push({
          type: 'output',
          text: `ENGINEERING METRICS:
• Public GitHub Repositories: 34
• RAG Recall@3: ~95%
• Semantic Query Latency: 31ms
• Primary Languages: Python (Core), C++, SQL, JavaScript`
        });
        break;

      case 'contact':
        newLines.push({
          type: 'success',
          text: `COMMUNICATION CHANNELS:
• Email: mems240005026@iiti.ac.in
• LinkedIn: ${PERSONAL_INFO.linkedin}
• GitHub: ${PERSONAL_INFO.github}`
        });
        break;

      case 'easter-egg':
        newLines.push({
          type: 'success',
          text: `[EASTER EGG UNLOCKED]
"Most people use AI as a black box; I treat it as an optimization landscape governed by linear algebra, loss functions, and high-throughput system bottlenecks. Keep building." - Lakshya`
        });
        break;

      case 'clear':
        setLines([
          { type: 'system', text: 'Terminal buffer cleared.' },
          { type: 'system', text: 'Type "help" for command matrix.' }
        ]);
        setInput('');
        return;

      default:
        newLines.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid subroutines.`
        });
        break;
    }

    setLines(newLines);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <section id="terminal" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>05 // INTERACTIVE AGENT CONSOLE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
            Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Lakshya's CLI Agent</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono text-gray-400">
            Execute direct terminal commands to query credentials, benchmarks, and research pipelines.
          </p>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-xs font-mono text-gray-400 mr-2">Quick Run:</span>
          {['help', 'whoami', 'rag', 'skills', 'projects', 'stats', 'easter-egg'].map((c) => (
            <button
              key={c}
              onClick={() => handleCommand(c)}
              onMouseEnter={() => sound.playHover()}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-[11px] font-mono text-cyan-300 transition-all hover:scale-105 active:scale-95"
            >
              ${c}
            </button>
          ))}
        </div>

        {/* Terminal Shell Window */}
        <div className="rounded-2xl border border-cyan-500/30 bg-gray-950/90 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden">
          
          {/* Title Bar */}
          <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-gray-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                lakshya@iiti-node: ~/portfolio
              </span>
            </div>

            <div className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>ACTIVE SESSION</span>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
            className="p-5 font-mono text-xs sm:text-sm h-[320px] sm:h-[380px] overflow-y-auto space-y-2.5 custom-scrollbar cursor-text"
          >
            {lines.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === 'input' && (
                  <div className="text-cyan-300 font-bold">{line.text}</div>
                )}
                {line.type === 'system' && (
                  <div className="text-gray-400">{line.text}</div>
                )}
                {line.type === 'output' && (
                  <div className="text-gray-200 whitespace-pre-wrap">{line.text}</div>
                )}
                {line.type === 'success' && (
                  <div className="text-emerald-400 whitespace-pre-wrap">{line.text}</div>
                )}
                {line.type === 'error' && (
                  <div className="text-rose-400 whitespace-pre-wrap">{line.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 bg-black/80 border-t border-white/10 flex items-center gap-3"
          >
            <span className="font-mono text-cyan-400 font-bold text-sm">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                sound.playTerminalKey();
              }}
              placeholder='Type a command (try "rag" or "help")...'
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-gray-600"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
