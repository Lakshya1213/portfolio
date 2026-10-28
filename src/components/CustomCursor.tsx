import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('clickable'))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth animation loop for the trailing ring
    let animationId: number;
    let currentTrailX = -100;
    let currentTrailY = -100;

    const followLoop = () => {
      currentTrailX += (pos.x - currentTrailX) * 0.18;
      currentTrailY += (pos.y - currentTrailY) * 0.18;
      setTrail({ x: currentTrailX, y: currentTrailY });
      animationId = requestAnimationFrame(followLoop);
    };

    animationId = requestAnimationFrame(followLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center sharp dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 transition-transform duration-75 mix-blend-screen"
        style={{
          width: isClicking ? '6px' : isPointer ? '10px' : '6px',
          height: isClicking ? '6px' : isPointer ? '10px' : '6px',
          transform: `translate3d(${pos.x - (isPointer ? 5 : 3)}px, ${pos.y - (isPointer ? 5 : 3)}px, 0)`,
          boxShadow: '0 0 10px #06b6d4'
        }}
      />
      {/* Outer fluid trailing ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/50 transition-all duration-150 ease-out mix-blend-screen ${
          isPointer ? 'bg-cyan-500/15 border-cyan-300 scale-125' : ''
        }`}
        style={{
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          transform: `translate3d(${trail.x - (isPointer ? 24 : 16)}px, ${trail.y - (isPointer ? 24 : 16)}px, 0)`,
          backdropFilter: isPointer ? 'blur(1px)' : 'none'
        }}
      />
    </>
  );
};
