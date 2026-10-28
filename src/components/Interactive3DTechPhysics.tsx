import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/sound';

interface TechSphere {
  name: string;
  color: string;
  sub: string;
}

const TECH_ITEMS: TechSphere[] = [
  { name: 'PyTorch', color: '#f97316', sub: 'Deep Learning' },
  { name: 'FAISS', color: '#06b6d4', sub: 'Vector DB' },
  { name: 'LangGraph', color: '#8b5cf6', sub: 'Multi-Agent' },
  { name: 'Groq LPU', color: '#ec4899', sub: 'Inference' },
  { name: 'FastAPI', color: '#10b981', sub: 'High-Throughput' },
  { name: 'Python', color: '#38bdf8', sub: 'Primary Lang' },
  { name: 'C++', color: '#0284c7', sub: 'Systems & Alg' },
  { name: 'Socket.io', color: '#eab308', sub: 'WebSockets' },
  { name: 'React 18', color: '#22d3ee', sub: 'Frontend UI' },
  { name: 'Three.js', color: '#a855f7', sub: 'WebGL 3D' },
  { name: 'MongoDB', color: '#34d399', sub: 'Document DB' },
  { name: 'PostgreSQL', color: '#60a5fa', sub: 'Relational DB' },
  { name: 'Prophet', color: '#14b8a6', sub: 'Time Series' },
  { name: 'Docker', color: '#38bdf8', sub: 'Containers' },
  { name: 'Linux', color: '#fbbf24', sub: 'POSIX OS' },
  { name: 'Pandas', color: '#06b6d4', sub: 'Analytics' },
  { name: 'NumPy', color: '#818cf8', sub: 'Tensors' },
  { name: 'PDFKit', color: '#f43f5e', sub: 'Vector Doc' }
];

export const Interactive3DTechPhysics: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<string>('Hover tokens or click to trigger kinetic impulses');

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 360;

    const scene = new THREE.Scene();
    
    // Orthographic-like perspective locked to avoid perspective blowups
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mount = mountRef.current;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // Controlled Ambient and Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 2.0);
    dirLight1.position.set(8, 8, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 1.8);
    dirLight2.position.set(-8, -8, 8);
    scene.add(dirLight2);

    // Physics Boundary Limits strictly mapped to camera view
    const boundX = (width / height) * 4.6;
    const boundY = 3.8;

    interface PhysicsBody {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      radius: number;
      tech: TechSphere;
    }

    const bodies: PhysicsBody[] = [];

    TECH_ITEMS.forEach((tech, index) => {
      // 512x512 High-DPI Circular Badge Texture
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Transparent background
        ctx.clearRect(0, 0, 512, 512);

        // Circular background
        ctx.beginPath();
        ctx.arc(256, 256, 240, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(256, 256, 50, 256, 256, 240);
        grad.addColorStop(0, '#0c1527');
        grad.addColorStop(0.85, '#050a14');
        grad.addColorStop(1, '#02040a');
        ctx.fillStyle = grad;
        ctx.fill();

        // Glowing outer neon rim
        ctx.lineWidth = 16;
        ctx.strokeStyle = tech.color;
        ctx.stroke();

        // Inner subtle rim
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(256, 256, 215, 0, Math.PI * 2);
        ctx.stroke();

        // Tech Name Typography
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tech.name, 256, 220);

        // Subtitle badge
        ctx.fillStyle = tech.color;
        ctx.font = '600 32px "Courier New", monospace';
        ctx.fillText(`[ ${tech.sub.toUpperCase()} ]`, 256, 300);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      // Compact radius (0.46 to 0.52 units, NEVER blows up!)
      const radius = 0.48;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: new THREE.Color(tech.color),
        emissiveIntensity: 0.15,
        roughness: 0.25,
        metalness: 0.7,
        clearcoat: 0.6
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Distribute evenly across grid initially
      const cols = 6;
      const row = Math.floor(index / cols);
      const col = index % cols;
      const startX = ((col - (cols - 1) / 2) * (boundX * 1.5)) / cols;
      const startY = ((row - 1) * (boundY * 1.4)) / 3;

      mesh.position.set(startX, startY, 0); // Z IS STRICTLY 0!

      scene.add(mesh);

      bodies.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
          0 // Velocity in Z is ALWAYS 0!
        ),
        radius,
        tech
      });
    });

    // Mouse Tracking in 2.5D Plane
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorldPos = new THREE.Vector3();

    const onMouseMove = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouseWorldPos);

      // Check hover hit
      const intersects = raycaster.intersectObjects(bodies.map((b) => b.mesh));
      if (intersects.length > 0) {
        const hit = bodies.find((b) => b.mesh === intersects[0].object);
        if (hit) {
          setActiveTech(`${hit.tech.name} • ${hit.tech.sub}`);
          sound.playHover();
        }
      }
    };

    const onClick = () => {
      sound.playClick();
      bodies.forEach((b) => {
        const diff = b.mesh.position.clone().sub(mouseWorldPos);
        diff.z = 0; // Strictly planar!
        const dist = diff.length();
        if (dist < 3.2 && dist > 0.01) {
          const force = (3.2 - dist) * 0.06;
          b.velocity.add(diff.normalize().multiplyScalar(force));
          b.velocity.z = 0;
        }
      });
    };

    const container = mountRef.current;
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop with STRICT Z-Axis Lock
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      bodies.forEach((b, i) => {
        // Enforce strictly 0 on Z
        b.velocity.z = 0;
        b.mesh.position.z = 0;

        // Apply velocity
        b.mesh.position.x += b.velocity.x;
        b.mesh.position.y += b.velocity.y;

        // Subtle slow rotation on Y to catch specular highlights
        b.mesh.rotation.y += 0.006;

        // Damping / Friction
        b.velocity.multiplyScalar(0.985);

        // Gentle central gravity pull
        b.velocity.x -= b.mesh.position.x * 0.0004;
        b.velocity.y -= b.mesh.position.y * 0.0004;

        // Mouse repulsion on XY plane
        const diffX = b.mesh.position.x - mouseWorldPos.x;
        const diffY = b.mesh.position.y - mouseWorldPos.y;
        const mouseDist = Math.sqrt(diffX * diffX + diffY * diffY);

        if (mouseDist < 2.2 && mouseDist > 0.01) {
          const repulsion = (2.2 - mouseDist) * 0.025;
          b.velocity.x += (diffX / mouseDist) * repulsion;
          b.velocity.y += (diffY / mouseDist) * repulsion;
        }

        // Boundary bounce
        if (b.mesh.position.x > boundX - b.radius) {
          b.mesh.position.x = boundX - b.radius;
          b.velocity.x *= -0.85;
        } else if (b.mesh.position.x < -boundX + b.radius) {
          b.mesh.position.x = -boundX + b.radius;
          b.velocity.x *= -0.85;
        }

        if (b.mesh.position.y > boundY - b.radius) {
          b.mesh.position.y = boundY - b.radius;
          b.velocity.y *= -0.85;
        } else if (b.mesh.position.y < -boundY + b.radius) {
          b.mesh.position.y = -boundY + b.radius;
          b.velocity.y *= -0.85;
        }

        // Collision with other spheres (strictly 2D!)
        for (let j = i + 1; j < bodies.length; j++) {
          const other = bodies[j];
          const dx = b.mesh.position.x - other.mesh.position.x;
          const dy = b.mesh.position.y - other.mesh.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b.radius + other.radius;

          if (dist < minDist && dist > 0.0001) {
            const overlap = (minDist - dist) * 0.5;
            const nx = dx / dist;
            const ny = dy / dist;

            b.mesh.position.x += nx * overlap;
            b.mesh.position.y += ny * overlap;
            other.mesh.position.x -= nx * overlap;
            other.mesh.position.y -= ny * overlap;

            // Elastic bounce on normal
            const rvx = b.velocity.x - other.velocity.x;
            const rvy = b.velocity.y - other.velocity.y;
            const impulse = rvx * nx + rvy * ny;

            if (impulse < 0) {
              const impulseFactor = impulse * 0.9;
              b.velocity.x -= nx * impulseFactor;
              b.velocity.y -= ny * impulseFactor;
              other.velocity.x += nx * impulseFactor;
              other.velocity.y += ny * impulseFactor;
            }
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      bodies.forEach((b) => {
        b.mesh.geometry.dispose();
        if (b.mesh.material instanceof THREE.Material) {
          b.mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-gray-950/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/40 group">
      {/* Top HUD Banner */}
      <div className="absolute top-0 left-0 right-0 z-20 px-5 py-3.5 bg-gradient-to-b from-gray-950/95 via-gray-950/70 to-transparent flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400" />
          <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300">
            3D ZERO-G TECH COLLIDER
          </span>
        </div>
        <div className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shadow-lg shadow-cyan-500/10">
          {activeTech}
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center pointer-events-none">
        <span className="px-3 py-1 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono text-gray-400 backdrop-blur-md">
          ⚡ Cursor repels nodes • Click to unleash kinetic shockwave
        </span>
      </div>
    </div>
  );
};
