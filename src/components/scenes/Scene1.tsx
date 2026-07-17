import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { DynamicGradient } from '../shared/DynamicGradient';
import { script } from '../../script';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { ui_text } = script;

  // Notifications in structured arcs
  const notifications = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (i / 8) * Math.PI * 2,
    radius: 350 + (i % 2) * 100,
    delay: i * 6, 
  })), []);

  return (
    <AbsoluteFill className="items-center justify-center">
      <DynamicGradient colors={['#020617', '#1e3a8a', '#3b82f6']} showBlobs={true} showGrid={true} />
      
      {/* Central Clock & Text Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        background: 'rgba(15, 23, 42, 0.4)',
        padding: '50px',
        borderRadius: '50px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
      }}>
          <h1 style={{ 
            fontSize: '140px', 
            fontWeight: '900', 
            color: 'white',
            margin: '0 0 10px 0',
            letterSpacing: '-6px',
            textShadow: '0 0 40px rgba(56, 189, 248, 0.8)'
          }}>
            {ui_text.scene1.time}
          </h1>
          <p style={{ 
              color: '#e2e8f0', 
              fontSize: '32px', 
              margin: 0, 
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '0.05em'
          }}>
            {ui_text.scene1.subtitle}
          </p>
      </div>
      
      {/* Structured Overload */}
      {notifications.map((n) => {
        const progress = spring({ 
          frame: frame - n.delay, 
          fps, 
          config: { stiffness: 100, damping: 12 } 
        });
        
        const currentRadius = interpolate(progress, [0, 1], [0, n.radius]);
        const x = Math.cos(n.angle) * currentRadius;
        const y = Math.sin(n.angle) * currentRadius;
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div key={n.id} style={{
            position: 'absolute',
            top: `calc(50% + ${y}px)`,
            left: `calc(50% + ${x}px)`,
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(56, 189, 248, 0.5)',
            padding: '12px 24px',
            borderRadius: '16px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            transform: `translate(-50%, -50%) scale(${progress})`,
            opacity,
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
          }}>
            {ui_text.scene1.notifications[n.id % ui_text.scene1.notifications.length]}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
