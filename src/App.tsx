import React from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { WhatIDo } from './components/WhatIDo';
import { TechStackArsenal } from './components/TechStackArsenal';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ArchitecturePlayground } from './components/ArchitecturePlayground';
import { GitHubExplorer } from './components/GitHubExplorer';
import { AITerminal } from './components/AITerminal';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden cyber-grid">
      {/* 3D Cosmic Celestial Background (Folder 1 Three.js & Star system) */}
      <CosmicBackground />

      {/* Fluid Magnetic Cyber Cursor (Folder 3 cursor) */}
      <CustomCursor />

      {/* Futuristic Floating Navbar with Audio FX Synthesizer */}
      <Navbar />

      {/* Main Experience Stream */}
      <main className="relative z-10 flex flex-col">
        {/* 01. Hero with 3D Interactive Model & Decrypt Typography */}
        <Hero />

        {/* 02. About Bento Grid (Folder 2 Bento + IIT Indore Pedigree) */}
        <AboutBento />

        {/* 03. What I Do Architectural Services (Folder 3 Dashed SVG Cards) */}
        <WhatIDo />

        {/* 04. Tech Stack & Interactive 3D Orbital Simulation */}
        <TechStackArsenal />

        {/* 05. Featured Architectures & Deep Dives (RankUp Flagship, RAG, Stock Screener) */}
        <FeaturedProjects />

        {/* 06. Interactive Neural Systems & Architecture Lab (Zero-Base64, Latency, DAG) */}
        <ArchitecturePlayground />

        {/* 07. Live GitHub Repositories Explorer (34 Repos Live) */}
        <GitHubExplorer />

        {/* 07. Interactive AI CLI Terminal (Ask Lakshya's Agent) */}
        <AITerminal />

        {/* 08. Academic & Engineering Trajectory Timeline */}
        <JourneyTimeline />

        {/* 09. Transmission / Contact Section with Confetti & Direct Coordinates */}
        <ContactSection />
      </main>

      {/* 10. Cyberpunk Operational Footer with Real-Time Clock */}
      <Footer />
    </div>
  );
};

export default App;
