import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DynamicGradient } from '../shared/DynamicGradient';
import { script } from '../../script';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tasks } = script.ui_text.scene2;

  return (
    <AbsoluteFill className="p-10 overflow-hidden">
      <DynamicGradient colors={['#0f172a', '#1e293b', '#3b82f6']} showGrid={true} />
      
      {/* Decorative Foreground Lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
        <line x1="0" y1="0" x2="1920" y2="1080" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
        <line x1="1920" y1="0" x2="0" y2="1080" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
      </svg>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        paddingTop: '60px',
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
      }}>
        {tasks.map((task, i) => {
          const delay = i * 10;
          const entrance = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 60 } });
          const scale = interpolate(entrance, [0, 1], [0.8, 1]);
          const opacity = interpolate(entrance, [0, 1], [0, 1]);
          
          // Independent Drift (The "Busy" Factor)
          const driftX = Math.sin(frame * 0.015 + i) * 20;
          const driftY = Math.cos(frame * 0.01 + i) * 15;

          return (
            <div key={i} style={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(20px)',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: `scale(${scale}) translate(${driftX}px, ${driftY}px)`,
              opacity,
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '24px', fontWeight: '800', direction: 'rtl' }}>{task.title}</span>
                <span style={{ color: '#38bdf8', fontSize: '20px', fontFamily: 'monospace' }}>{task.time}</span>
              </div>
              
              {/* Load Bar */}
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  background: task.load > 80 ? '#ef4444' : '#38bdf8',
                  width: `${task.load}%` 
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
