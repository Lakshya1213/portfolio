import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CosmicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up Three.js Scene, Camera, and Renderer
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 3000);
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const container = containerRef.current;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Particle Stars
    const starCount = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorChoices = [
      new THREE.Color('#06b6d4'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#f8fafc'),
      new THREE.Color('#10b981'),
      new THREE.Color('#eab308')
    ];

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1800;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle sprite for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.85)');
      gradient.addColorStop(0.7, 'rgba(6,182,212,0.35)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 3.6,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Deep Space 3D Wireframe Nebula Torus (Inspired by nowakkamil.github.io)
    const nebulaGeo = new THREE.TorusGeometry(320, 45, 16, 100);
    const nebulaMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.set(0, 0, -200);
    scene.add(nebula);

    // Shooting Stars
    interface ShootingStar {
      mesh: THREE.Line;
      pos: THREE.Vector3;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }

    const shootingStars: ShootingStar[] = [];
    const createShootingStar = () => {
      const startX = (Math.random() - 0.5) * 1400;
      const startY = 350 + Math.random() * 300;
      const startZ = (Math.random() - 0.5) * 800;

      const starGeometry = new THREE.BufferGeometry();
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-55, -30, 0)];
      starGeometry.setFromPoints(points);

      const starMaterial = new THREE.LineBasicMaterial({
        color: Math.random() > 0.5 ? 0x06b6d4 : 0xa855f7,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(starGeometry, starMaterial);
      line.position.set(startX, startY, startZ);
      scene.add(line);

      shootingStars.push({
        mesh: line,
        pos: line.position,
        velocity: new THREE.Vector3(-16 - Math.random() * 8, -9 - Math.random() * 5, 0),
        life: 0,
        maxLife: 60 + Math.random() * 35
      });
    };

    let shootingStarTimer = 0;

    // Mouse & Scroll Parallax Tracking (nowakkamil.github.io camera controller)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.45;
      targetY = -(e.clientY - window.innerHeight / 2) * 0.45;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with 3D Depth Travel
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.06;

      // 3D Parallax Camera Motion
      camera.position.x = mouseX * 0.3;
      camera.position.y = mouseY * 0.3 - scrollY * 0.08;
      camera.position.z = 450 - (scrollY * 0.12) % 600;

      // Rotate galaxy field
      particles.rotation.y = elapsedTime * 0.015 + scrollY * 0.0002;
      particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.04;
      particles.rotation.z = scrollY * 0.00015;

      nebula.rotation.x = elapsedTime * 0.03;
      nebula.rotation.y = elapsedTime * 0.02;

      // Trigger shooting stars periodically
      shootingStarTimer++;
      if (shootingStarTimer % 160 === 0 && shootingStars.length < 4) {
        createShootingStar();
      }

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.pos.add(star.velocity);
        star.life++;

        const mat = star.mesh.material as THREE.LineBasicMaterial;
        mat.opacity = 1 - star.life / star.maxLife;

        if (star.life >= star.maxLife) {
          scene.remove(star.mesh);
          star.mesh.geometry.dispose();
          mat.dispose();
          shootingStars.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      shootingStars.forEach((star) => {
        scene.remove(star.mesh);
        star.mesh.geometry.dispose();
        (star.mesh.material as THREE.Material).dispose();
      });
      geometry.dispose();
      material.dispose();
      texture.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
};
