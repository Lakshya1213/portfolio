import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { sound } from '../utils/sound';

export const Interactive3DModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 400;
    const height = mountRef.current.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const mount = mountRef.current;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // Dynamic Multi-Source Cyber Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 4.5);
    cyanRim.position.set(-3.5, 3.5, 2.5);
    scene.add(cyanRim);

    const violetFill = new THREE.DirectionalLight(0x8b5cf6, 3.8);
    violetFill.position.set(3.5, -2, -2);
    scene.add(violetFill);

    const emeraldKey = new THREE.PointLight(0x10b981, 2.2, 12);
    emeraldKey.position.set(0, 3, 2);
    scene.add(emeraldKey);

    // Multi-Layer Gyroscopic Hologram Cage
    const gyroGroup = new THREE.Group();

    // Outer Gyro Ring (Cyan)
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.015, 16, 90);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.55,
      wireframe: true
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    gyroGroup.add(ring1);

    // Middle Gyro Ring (Violet)
    const ring2Geo = new THREE.TorusGeometry(1.9, 0.012, 16, 90);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.45,
      wireframe: true
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    gyroGroup.add(ring2);

    // Inner Gyro Ring (Emerald)
    const ring3Geo = new THREE.TorusGeometry(1.35, 0.01, 16, 80);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 4;
    gyroGroup.add(ring3);

    // Orbiting Satellite Data Nodes
    const satelliteCount = 8;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x06b6d4 : 0x8b5cf6
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      gyroGroup.add(sat);
      satellites.push(sat);
    }

    scene.add(gyroGroup);

    let mixer: THREE.AnimationMixer | null = null;
    let characterModel: THREE.Object3D | null = null;
    let headBone: THREE.Object3D | null = null;

    // Load Draco & GLTF
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let baseY = 0;

    gltfLoader.load(
      '/models/character.glb',
      (gltf) => {
        characterModel = gltf.scene;

        // Automatically compute bounding box and center model in view
        const box = new THREE.Box3().setFromObject(characterModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.45 / maxDim;
        characterModel.scale.set(scale, scale, scale);
        baseY = -center.y * scale;
        characterModel.position.set(-center.x * scale, baseY, -center.z * scale);

        characterModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.45;
              mat.metalness = 0.35;
            }
          }
        });

        headBone = characterModel.getObjectByName('spine006') || characterModel.getObjectByName('Head') || null;

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(characterModel);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        scene.add(characterModel);
      },
      undefined,
      (err) => {
        // High-poly Holographic Neural Core Fallback
        const coreGeo = new THREE.IcosahedronGeometry(0.9, 3);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          wireframe: true,
          emissive: 0x083344,
          roughness: 0.15
        });
        characterModel = new THREE.Mesh(coreGeo, coreMat);
        scene.add(characterModel);
      }
    );

    // Interactive Drag-to-Rotate & Pointer Tracking
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      sound.playClick();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;

        targetRotationY += deltaX * 0.012;
        targetRotationX += deltaY * 0.008;

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      } else {
        if (!mountRef.current) return;
        const rect = mountRef.current.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        targetRotationY = x * 0.55;
        targetRotationX = y * 0.35;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    // Touch support for mobile 3D drag
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        setIsInteracting(true);
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - previousMouseX;
        const deltaY = e.touches[0].clientY - previousMouseY;

        targetRotationY += deltaX * 0.015;
        targetRotationX += deltaY * 0.01;

        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const el = mountRef.current;
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Clock
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Gyro Rotations along multiple 3D axes
      ring1.rotation.z += 0.007;
      ring2.rotation.x += 0.009;
      ring3.rotation.y += 0.012;
      gyroGroup.rotation.y = time * 0.2;

      // Orbiting satellites
      satellites.forEach((sat, i) => {
        const angle = time * 0.8 + (i * Math.PI * 2) / satelliteCount;
        const r = 1.75;
        sat.position.set(
          Math.cos(angle) * r,
          Math.sin(angle * 1.5) * 0.6,
          Math.sin(angle) * r
        );
      });

      // Animate character model or neural core
      if (characterModel) {
        characterModel.rotation.y += (targetRotationY - characterModel.rotation.y) * 0.07;
        characterModel.rotation.x += (targetRotationX * 0.3 - characterModel.rotation.x) * 0.07;
        characterModel.position.y = baseY + Math.sin(time * 1.5) * 0.04;

        if (headBone) {
          headBone.rotation.y = targetRotationY * 0.75;
          headBone.rotation.x = targetRotationX * 0.55;
        }
      }

      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      dracoLoader.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[550px] flex items-center justify-center select-none">
      {/* Dynamic 3D Radial Glow */}
      <div className="absolute inset-0 bg-radial from-cyan-500/15 via-violet-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* WebGL Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Click & Drag to rotate 3D Neural Model"
      />

      {/* 3D Interactive Control HUD Pill */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-gray-950/85 border border-cyan-500/40 backdrop-blur-md text-[11px] font-mono text-cyan-300 flex items-center gap-2 shadow-xl shadow-cyan-950/60 pointer-events-none z-20">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-semibold uppercase tracking-wider">
          {isInteracting ? '🔄 ORBITING 3D MESH' : '⚡ 3D NEURAL CORE • DRAG TO ROTATE'}
        </span>
      </div>
    </div>
  );
};
