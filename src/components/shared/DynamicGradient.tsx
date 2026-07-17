import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface DynamicGradientProps {
  colors: string[];
  showGrid?: boolean;
  showBlobs?: boolean;
  showParticles?: boolean;
  gridOpacity?: number;
}

export const DynamicGradient: React.FC<DynamicGradientProps> = ({
  colors,
  showGrid = true,
  showBlobs = true,
  showParticles = true,
  gridOpacity = 0.07,
}) => {
  const frame = useCurrentFrame();

  // Dynamic slow-rotating gradient angle
  const angle = interpolate(frame, [0, 600], [0, 360]) % 360;

  // Generate deterministic particles once using useMemo
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: (i * 37) % 100, // pseudo-random position
      y: (i * 73) % 100,
      size: 4 + (i % 3) * 3, // 4px, 7px, 10px
      speedY: 0.15 + (i % 4) * 0.08,
      swayWidth: 20 + (i % 5) * 10,
      swayFreq: 30 + (i % 6) * 10,
      opacity: 0.15 + (i % 3) * 0.1,
    }));
  }, []);

  // Compute animated positions for neon glow blobs
  const blobA_X = 25 + Math.sin(frame * 0.015) * 15;
  const blobA_Y = 25 + Math.cos(frame * 0.02) * 15;

  const blobB_X = 75 + Math.cos(frame * 0.012) * 15;
  const blobB_Y = 75 + Math.sin(frame * 0.018) * 15;

  const blobC_X = 50 + Math.sin(frame * 0.01) * 20;
  const blobC_Y = 50 + Math.cos(frame * 0.013) * 15;

  return (
    <AbsoluteFill className="overflow-hidden select-none pointer-events-none">
      {/* Layer 1: Base Linear Rotating Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
        }}
      />

      {/* Layer 2: Floating Neon Glow Blobs (Glassmorphic Lighting) */}
      {showBlobs && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', mixBlendMode: 'screen' }}>
          {/* Blob A (Cyan/Teal) */}
          <div
            style={{
              position: 'absolute',
              top: `${blobA_Y}%`,
              left: `${blobA_X}%`,
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0) 70%)',
              filter: 'blur(60px)',
            }}
          />
          {/* Blob B (Magenta/Purple) */}
          <div
            style={{
              position: 'absolute',
              top: `${blobB_Y}%`,
              left: `${blobB_X}%`,
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Blob C (Orange/Highlight) */}
          <div
            style={{
              position: 'absolute',
              top: `${blobC_Y}%`,
              left: `${blobC_X}%`,
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(249, 115, 22, 0) 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>
      )}

      {/* Layer 3: Subtle Tech Dot Grid */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px',
            opacity: gridOpacity,
            transform: `translate(${Math.sin(frame * 0.005) * 10}px, ${Math.cos(frame * 0.005) * 10}px)`,
          }}
        />
      )}

      {/* Layer 4: Floating Dust Particles / Bokeh */}
      {showParticles && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {particles.map((p) => {
            // Calculate floating upwards with periodic wrapping
            const currentY = (p.y - frame * p.speedY + 200) % 120 - 10; // offset slightly offscreen
            // Horizontal swaying
            const sway = Math.sin(frame / p.swayFreq + p.id) * p.swayWidth;
            const currentX = (p.x + sway + 100) % 100;

            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  top: `${currentY}%`,
                  left: `${currentX}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
                  opacity: p.opacity,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
