import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const AlarmClock: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  
  // Ringing effect
  const ring = Math.sin(frame / 2) * 5;
  const glow = interpolate(Math.sin(frame / 10), [-1, 1], [0.5, 1]);

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }}>
      {/* Decorative Ringing Halo */}
      <circle cx="100" cy="100" r={80 + ring} fill="none" stroke={`rgba(255,255,255,${0.2 * glow})`} strokeWidth="10" />

      {/* Clock Face with Gradient */}
      <defs>
        <radialGradient id="clockFace" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="70" fill="url(#clockFace)" />

      {/* Branding */}
      <text x="100" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3B82F6">TimeUp</text>

      {/* Sleek Hands */}
      <line x1="100" y1="100" x2="100" y2="50" stroke="#1E3A8A" strokeWidth="6" strokeLinecap="round" transform={`rotate(${frame * 0.5}, 100, 100)`} />
      <line x1="100" y1="100" x2="140" y2="100" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" transform={`rotate(${frame * 3}, 100, 100)`} />
    </svg>
  );
};
