import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { DynamicGradient } from '../shared/DynamicGradient';
import { script } from '../../script';

export const BenefitsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { ui_text } = script;

  const { title, features } = ui_text.benefits;

  return (
    <AbsoluteFill className="items-center p-12 overflow-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif" }}>
      <DynamicGradient colors={['#020617', '#1e3a8a', '#3b82f6']} showBlobs={true} />
      
      {/* Dynamic Data Lines Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}>
        {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ 
                position: 'absolute', 
                top: `${i * 25}%`, 
                width: '100%', 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)',
                transform: `translateX(${Math.sin(frame * 0.01 + i) * 100}px)` 
            }} />
        ))}
      </div>

      {/* Header Container */}
      <div style={{
        marginTop: '20px',
        marginBottom: '60px',
        padding: '25px 50px',
        background: 'rgba(56, 189, 248, 0.05)',
        backdropFilter: 'blur(15px)',
        borderRadius: '30px',
        border: '1px solid rgba(56, 189, 248, 0.2)',
      }}>
        <h2 style={{ 
          fontSize: '48px', 
          fontWeight: '900', 
          color: '#f8fafc', 
          margin: 0,
          textAlign: 'center',
          direction: 'rtl', 
          letterSpacing: '-0.03em',
          textTransform: 'uppercase'
        }}>
          {title}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '1200px' }}>
        {features.map((feat, i) => {
          const delay = i * 20; 
          
          const entrance = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 60 } });
          const scale = interpolate(entrance, [0, 1], [0.8, 1], { easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
          const swayY = Math.sin(frame * 0.02 + i) * 8;

          return (
            <div key={i} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              padding: '35px',
              borderRadius: '30px',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
              transform: `scale(${scale}) translateY(${swayY}px)`,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}>
              <div style={{ fontSize: '60px', filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))' }}>{feat.icon}</div>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#f1f5f9', direction: 'rtl', marginBottom: '5px', letterSpacing: '-0.02em' }}>{feat.title}</span>
              <span style={{ fontSize: '18px', color: '#cbd5e1', direction: 'rtl', textAlign: 'center', lineHeight: '1.5' }}>{feat.desc}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
