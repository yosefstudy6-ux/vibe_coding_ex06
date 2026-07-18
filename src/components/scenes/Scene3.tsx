import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { DynamicGradient } from '../shared/DynamicGradient';
import { script } from '../../script';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { ui_text, app_name } = script;

  // Entrance and perspective tilt
  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const rotateX = interpolate(frame, [0, 600], [10, -10]);
  const rotateY = interpolate(frame, [0, 600], [-5, 5]);

  return (
    <AbsoluteFill className="items-center justify-center">
      <DynamicGradient colors={['#020617', '#1e3a8a', '#3b82f6']} showBlobs={true} />
      
      {/* 3D-Tilt Phone Container */}
      <div style={{
        width: '320px', 
        height: '640px', 
        background: '#ffffff', 
        borderRadius: '50px',
        border: '8px solid #0f172a',
        transform: `scale(${scale}) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        display: 'flex', 
        flexDirection: 'column', 
        padding: '40px 20px',
        boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '100px', width: '120px', height: '25px', background: '#0f172a', borderRadius: '0 0 20px 20px' }} />
        
        {/* App UI Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '30px' }}>
          <h2 style={{ color: '#0f172a', fontSize: '28px', fontWeight: '900' }}>{app_name}</h2>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#38bdf8' }} />
        </div>

        {/* Productivity Chart */}
        <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '40px' }}>
            {[40, 70, 50, 90, 60].map((h, i) => (
                <div key={i} style={{ flex: 1, background: '#cbd5e1', borderRadius: '8px', height: `${h}%` }}>
                    <div style={{ background: '#38bdf8', height: `${Math.min(h, interpolate(frame - i*5, [0, 60], [0, h]))}%`, borderRadius: '8px' }} />
                </div>
            ))}
        </div>

        {/* Focus Mode Toggle */}
        <div style={{ background: '#0f172a', padding: '20px', borderRadius: '20px', color: 'white', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>{ui_text.scene3.focus_mode}</span>
            <div style={{ width: '50px', height: '25px', background: '#38bdf8', borderRadius: '25px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '5px', top: '2.5px', width: '20px', height: '20px', background: 'white', borderRadius: '50%' }} />
            </div>
        </div>

        {/* Tasks List */}
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>{ui_text.scene3.tasks_title}</div>
            {ui_text.scene3.tasks.map((task, idx) => (
              <div key={idx} style={{ background: '#f1f5f9', padding: '15px', borderRadius: '15px', marginBottom: '10px' }}>{task}</div>
            ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
