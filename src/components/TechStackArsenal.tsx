import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cpu, Box, Grid, Sparkles, Layers, Activity, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Interactive3DTechPhysics } from './Interactive3DTechPhysics';
import { TiltCard } from './TiltCard';
import { sound } from '../utils/sound';

export const TechStackArsenal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'physics'>('grid'); // Default to sleek Matrix!
  const canvasRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const displayedSkills =
    selectedCategory === 'All'
      ? SKILL_CATEGORIES.flatMap((c) => c.skills)
      : SKILL_CATEGORIES.find((c) => c.title === selectedCategory)?.skills || [];

  // Interactive 3D Orbital Tech Cloud Canvas
  useEffect(() => {
    if (!canvasRef.current || viewMode !== 'grid') return;

    const width = canvasRef.current.clientWidth || 320;
    const height = canvasRef.current.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mount = canvasRef.current;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const sphereCount = 16;
    const techColors = [0x06b6d4, 0x8b5cf6, 0x10b981, 0xf59e0b, 0x3b82f6, 0xec4899];

    for (let i = 0; i < sphereCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / sphereCount);
      const theta = Math.sqrt(sphereCount * Math.PI) * phi;
      const radius = 7.5;

      const sphereGeo = new THREE.SphereGeometry(0.55, 20, 20);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: techColors[i % techColors.length],
        emissive: techColors[i % techColors.length],
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 0.8
      });

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );

      group.add(mesh);
    }

    // Outer Gyro Torus Ring
    const orbitRingGeo = new THREE.TorusGeometry(7.5, 0.04, 16, 70);
    const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    group.add(orbitRing);

    // Inner Gyro Ring
    const innerRingGeo = new THREE.TorusGeometry(4.8, 0.03, 16, 60);
    const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3 });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.y = Math.PI / 3;
    group.add(innerRing);

    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x06b6d4, 3, 40);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 3, 40);
    light2.position.set(-10, -10, -10);
    scene.add(light2);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      group.rotation.y += 0.007 + mouseX * 0.015;
      group.rotation.x += 0.004 + mouseY * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      scene.clear();
    };
  }, [viewMode]);

  return (
    <section id="arsenal" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Mode Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>03 // TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              Tech Stack &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Toolbox</span>
            </h2>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-1 backdrop-blur-md">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Toolbox Matrix</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('physics');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  viewMode === 'physics'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Zero-G Collider</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Clean High-Density Matrix (DEFAULT) */}
        {viewMode === 'grid' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30 scale-105'
                      : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Two-Column Layout: Grid of Tech Cards + 3D Orbital Widget */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Tech Cards Grid (8 cols) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayedSkills.map((skill) => (
                  <TiltCard
                    key={skill.name}
                    maxTilt={6}
                    scale={1.01}
                    glare={true}
                    className="rounded-xl"
                    onMouseEnter={() => sound.playHover()}
                  >
                    <div
                      className="group rounded-xl p-3.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-500/40 transition-all duration-200 backdrop-blur-md flex flex-col justify-between h-full"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shadow-inner shrink-0"
                            style={{
                              backgroundColor: `${skill.color}18`,
                              color: skill.color,
                              border: `1px solid ${skill.color}40`
                            }}
                          >
                            {skill.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-outfit font-bold text-white text-sm group-hover:text-cyan-200 transition-colors">
                              {skill.name}
                            </h4>
                            <p className="text-[11px] font-mono text-gray-400 line-clamp-1">
                              {skill.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider shrink-0"
                          style={{
                            borderColor: `${skill.color}40`,
                            color: skill.color,
                            backgroundColor: `${skill.color}10`
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {/* Mini Competency Glow Meter */}
                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              backgroundColor: skill.color,
                              width:
                                skill.level === 'Production' || skill.level === 'Core Specialist'
                                  ? '95%'
                                  : skill.level === 'Advanced'
                                  ? '85%'
                                  : '75%',
                              boxShadow: `0 0 8px ${skill.color}`
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 shrink-0">
                          {skill.level === 'Production' || skill.level === 'Core Specialist'
                            ? '95%'
                            : skill.level === 'Advanced'
                            ? '85%'
                            : '75%'}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>

              {/* 3D Orbiting Tech Sphere Preview (4 cols) */}
              <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 p-5 backdrop-blur-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute top-3 left-4 text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>3D NEURAL ORBIT</span>
                </div>

                <div ref={canvasRef} className="w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] cursor-grab active:cursor-grabbing" />

                <div className="mt-1 space-y-1">
                  <h5 className="font-outfit font-bold text-white text-sm">Spatial Technology Constellation</h5>
                  <p className="text-[11px] font-mono text-gray-400 max-w-xs leading-relaxed">
                    Interactive real-time 3D simulation of integrated AI pipelines, vector systems, and computational runtimes.
                  </p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* View Mode 2: 3D Zero-G Collider */
          <div className="space-y-4 animate-in fade-in duration-300">
            <Interactive3DTechPhysics />

            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <span className="text-xs font-mono text-gray-400">
                18 Core competencies modeled in kinetic zero-gravity space.
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('grid');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-cyan-300 transition-all hover:scale-105"
              >
                Switch to Matrix View →
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
