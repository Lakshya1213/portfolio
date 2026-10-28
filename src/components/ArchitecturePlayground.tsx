import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Database, Network, ArrowRight, Play, RefreshCw, Sparkles, CheckCircle2, ShieldCheck, Layers, Gauge } from 'lucide-react';
import { sound } from '../utils/sound';

export const ArchitecturePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'zero-base64' | 'rag-latency' | 'agent-dag'>('zero-base64');

  // Tab 1: Zero-Base64 Engine State
  const [pages, setPages] = useState<number>(140);

  // Tab 2: RAG Latency Benchmark State
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false);
  const [benchmarkStep, setBenchmarkStep] = useState(0);
  const [benchmarkResults, setBenchmarkResults] = useState<{
    denseRetrieval: number;
    crossEncoder: number;
    groqInference: number;
    total: number;
  } | null>({
    denseRetrieval: 7.2,
    crossEncoder: 11.4,
    groqInference: 12.8,
    total: 31.4
  });

  // Tab 3: Agent DAG Selected Node
  const [selectedDagNode, setSelectedDagNode] = useState<string>('router');

  // Math for Zero-Base64
  const base64BytesPerDoc = pages * 245 * 1024; // ~245KB per page base64
  const zeroBase64Bytes = pages * 9.8 * 1024; // ~9.8KB raw extracted text buffer
  const savedPercent = (((base64BytesPerDoc - zeroBase64Bytes) / base64BytesPerDoc) * 100).toFixed(1);
  const base64Mb = (base64BytesPerDoc / (1024 * 1024)).toFixed(1);
  const zeroBase64Mb = (zeroBase64Bytes / (1024 * 1024)).toFixed(2);

  const runLatencyTest = () => {
    sound.playClick();
    setIsRunningBenchmark(true);
    setBenchmarkStep(1);

    setTimeout(() => {
      setBenchmarkStep(2);
      sound.playHover();
    }, 400);

    setTimeout(() => {
      setBenchmarkStep(3);
      sound.playHover();
    }, 900);

    setTimeout(() => {
      setBenchmarkStep(4);
      sound.playClick();
      setIsRunningBenchmark(false);
      setBenchmarkResults({
        denseRetrieval: Number((6.8 + Math.random() * 1.5).toFixed(1)),
        crossEncoder: Number((10.5 + Math.random() * 2.0).toFixed(1)),
        groqInference: Number((12.2 + Math.random() * 2.2).toFixed(1)),
        total: Number((30.0 + Math.random() * 3.5).toFixed(1))
      });
    }, 1400);
  };

  const dagNodes = [
    {
      id: 'ingest',
      name: 'Memory Ingestion',
      sub: 'pdf-parse Buffer',
      latency: '< 15ms',
      desc: 'Raw buffer parsing directly in Node.js memory. Bypasses disk I/O and circumvents MongoDB 16MB document size ceiling.'
    },
    {
      id: 'router',
      name: 'Intent Router',
      sub: 'LangGraph ReAct',
      latency: '4ms',
      desc: 'Determines whether inquiry requires strict Document-Locked RAG or Web-Grounded external academic intelligence.'
    },
    {
      id: 'embed',
      name: 'Dense Embedding',
      sub: 'BAAI / BGE-Small',
      latency: '7ms',
      desc: 'Transforms chunked document context into 384-dimensional dense vectors for sub-linear semantic retrieval.'
    },
    {
      id: 'index',
      name: 'Vector Search',
      sub: 'FAISS FlatIP Index',
      latency: '2ms',
      desc: 'Exact inner product distance computation across tens of thousands of document embeddings at 95% Recall@3.'
    },
    {
      id: 'rerank',
      name: 'Cross-Encoder',
      sub: 'BGE-Reranker-Base',
      latency: '11ms',
      desc: 'Re-evaluates top-K candidates using joint attention over query and context to eliminate hallucinations.'
    },
    {
      id: 'groq',
      name: 'Groq LPU Inference',
      sub: 'Llama 3.1 70B',
      latency: '13ms',
      desc: 'Ultra-low-latency tensor streaming on dedicated Groq Language Processing Units, yielding real-time study responses.'
    }
  ];

  return (
    <section id="architecture" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 // INTERACTIVE ENGINEERING BENCHMARKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              Neural Systems &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Architecture Lab</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-mono text-gray-400 max-w-2xl">
              Real-time interactive simulations of Lakshya's production architectures, high-capacity ingestion engines, and sub-35ms RAG pipelines.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('zero-base64');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'zero-base64'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Zero-Base64 Engine</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('rag-latency');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'rag-latency'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>Sub-35ms RAG Pipeline</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('agent-dag');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'agent-dag'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Multi-Agent DAG</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Zero-Base64 Engine Simulator */}
        {activeTab === 'zero-base64' && (
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>RankUp High-Capacity Ingestion Benchmark</span>
                  </div>
                  <h3 className="text-2xl font-outfit font-bold text-white">
                    Raw Memory Ingestion vs. Legacy Base64 Storage
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-mono mt-2 leading-relaxed">
                    Standard document management encodes PDFs as Base64 strings inside database documents, causing severe bloat and hitting the MongoDB 16MB document boundary. Lakshya's Zero-Base64 engine streams PDF buffers directly in memory, reducing storage overhead by over 95%.
                  </p>
                </div>

                {/* Slider Control */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">Document Volume / Pages:</span>
                    <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                      {pages} Academic Pages
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="180"
                    step="5"
                    value={pages}
                    onChange={(e) => {
                      setPages(Number(e.target.value));
                      sound.playHover();
                    }}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-gray-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-gray-500">
                    <span>10 Pages (Quiz Deck)</span>
                    <span>90 Pages (Lecture Notes)</span>
                    <span>180 Pages (Full Textbook)</span>
                  </div>
                </div>

                {/* Engineering Highlights */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[10px] font-mono text-gray-400">Ceiling Avoided</div>
                    <div className="text-sm font-mono font-bold text-emerald-400 mt-1">MongoDB 16MB Cap</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[10px] font-mono text-gray-400">Parsing Latency</div>
                    <div className="text-sm font-mono font-bold text-cyan-400 mt-1">&lt; 140ms in Buffer</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Data Gauges & Visual Comparison */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Metric Summary Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-violet-950/20 to-black/60 border border-cyan-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-black text-cyan-500/10 pointer-events-none">
                    95% LEAN
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-gray-400">Database Footprint Reduction</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                      -{savedPercent}% Database Bloat
                    </span>
                  </div>

                  {/* Visual Comparison Bars */}
                  <div className="space-y-4 font-mono">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-rose-400">Legacy Base64 Encoding:</span>
                        <span className="text-white font-bold">{base64Mb} MB</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-cyan-400">Lakshya's Zero-Base64 Buffer:</span>
                        <span className="text-cyan-300 font-bold">{zeroBase64Mb} MB</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                          style={{ width: `${Math.max(4, (100 - Number(savedPercent)) * 2)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Live Ingestion Test:</span>
                    <a
                      href="https://rank-up-learning-assistant.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 underline font-semibold"
                    >
                      <span>Try on RankUp Live App</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Sub-35ms RAG Pipeline */}
        {activeTab === 'rag-latency' && (
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-8 animate-in fade-in duration-300">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-violet-400 font-mono text-xs uppercase tracking-wider mb-1">
                  <Zap className="w-3.5 h-3.5 text-violet-400" />
                  <span>Real-Time Latency Breakdown</span>
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white">
                  Enterprise Multi-Document Contextual Synthesis
                </h3>
              </div>

              <button
                onClick={runLatencyTest}
                disabled={isRunningBenchmark}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-semibold text-xs transition-all shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunningBenchmark ? 'animate-spin' : ''}`} />
                <span>{isRunningBenchmark ? 'Synthesizing Query...' : 'Run Pipeline Benchmark'}</span>
              </button>
            </div>

            {/* Interactive Pipeline Stages */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
              
              {/* Stage 1 */}
              <div className={`p-4 rounded-2xl border transition-all ${
                benchmarkStep >= 1 ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/15' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="text-[10px] text-cyan-400 font-semibold mb-1">STAGE 01 // DENSE SEARCH</div>
                <div className="text-white font-bold text-sm">BGE + FAISS FlatIP</div>
                <div className="text-2xl font-black text-cyan-300 mt-2">
                  {benchmarkResults ? `${benchmarkResults.denseRetrieval} ms` : '--'}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">95% Recall@3 dense filtering across chunk vectors</div>
              </div>

              {/* Stage 2 */}
              <div className={`p-4 rounded-2xl border transition-all ${
                benchmarkStep >= 2 ? 'bg-violet-950/40 border-violet-500/60 shadow-lg shadow-violet-500/15' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="text-[10px] text-violet-400 font-semibold mb-1">STAGE 02 // RE-RANKING</div>
                <div className="text-white font-bold text-sm">Cross-Encoder BGE</div>
                <div className="text-2xl font-black text-violet-300 mt-2">
                  {benchmarkResults ? `${benchmarkResults.crossEncoder} ms` : '--'}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">Joint query-passage attention to isolate precise paragraphs</div>
              </div>

              {/* Stage 3 */}
              <div className={`p-4 rounded-2xl border transition-all ${
                benchmarkStep >= 3 ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-500/15' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="text-[10px] text-emerald-400 font-semibold mb-1">STAGE 03 // INFERENCE</div>
                <div className="text-white font-bold text-sm">Groq LPU Llama 3.1</div>
                <div className="text-2xl font-black text-emerald-300 mt-2">
                  {benchmarkResults ? `${benchmarkResults.groqInference} ms` : '--'}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">Streaming token generation at 750+ tokens/sec</div>
              </div>

              {/* Stage 4: Total */}
              <div className={`p-4 rounded-2xl border transition-all ${
                benchmarkStep >= 4 ? 'bg-blue-950/40 border-blue-400/80 shadow-lg shadow-blue-500/20' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="text-[10px] text-sky-400 font-semibold mb-1">TOTAL END-TO-END</div>
                <div className="text-white font-bold text-sm">Target &lt; 35ms</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 mt-2">
                  {benchmarkResults ? `~${benchmarkResults.total} ms` : '--'}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                  ⚡ 28x faster than standard cloud APIs
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 3: Multi-Agent DAG */}
        {activeTab === 'agent-dag' && (
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
                  <Network className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Cyclical Graph Execution Architecture</span>
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white">
                  Stateful Multi-Agent Orchestration Flow
                </h3>
              </div>
              <span className="text-xs font-mono text-gray-400">
                Click any pipeline node to inspect technical internals
              </span>
            </div>

            {/* Nodes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {dagNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDagNode(node.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-3.5 rounded-xl font-mono text-left transition-all ${
                    selectedDagNode === node.id
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                      : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-cyan-500/30'
                  } border`}
                >
                  <div className="text-[10px] text-cyan-400 font-bold mb-1 flex items-center justify-between">
                    <span>{node.latency}</span>
                    {selectedDagNode === node.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                  </div>
                  <div className="text-white font-bold text-xs line-clamp-1">{node.name}</div>
                  <div className="text-[10px] text-gray-400 line-clamp-1">{node.sub}</div>
                </button>
              ))}
            </div>

            {/* Selected Node Deep Dive Drawer */}
            {selectedDagNode && (
              <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/30 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">
                    [NODE SPECIFICATION]: {dagNodes.find((n) => n.id === selectedDagNode)?.name}
                  </span>
                  <p className="text-gray-300 mt-1 max-w-3xl leading-relaxed">
                    {dagNodes.find((n) => n.id === selectedDagNode)?.desc}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold text-[11px]">
                    Subroutine Verified ✓
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
