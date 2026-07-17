import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { DynamicGradient } from '../shared/DynamicGradient';
import { script } from '../../script';

export const FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { ui_text, app_name } = script;

  // Entrance spring
  const entrance = spring({ frame, fps, config: { damping: 15 } });
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  
  // Subtle pulse for CTA button
  const pulse = interpolate(Math.sin(frame / 15), [-1, 1], [1, 1.05]);

  return (
    <AbsoluteFill className="items-center justify-center p-12">
      <DynamicGradient colors={['#020617', '#1e3a8a', '#3b82f6']} showBlobs={true} />
      
      <div style={{ 
        transform: `scale(${scale})`, 
        textAlign: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '80px'
      }}>
        {/* App Store Phone Mockup */}
        <div style={{
            width: '240px',
            height: '480px',
            background: '#ffffff',
            borderRadius: '40px',
            border: '6px solid #0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px 15px',
            transform: 'rotate(-10deg)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* App Icon */}
            <div style={{ width: '80px', height: '80px', background: '#38bdf8', borderRadius: '20px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>{app_name.substring(0, 2).toUpperCase()}</div>
            <h3 style={{ color: '#0f172a', fontSize: '20px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{app_name}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 10px 0' }}>{ui_text.final_cta.slogan}</p>
            <div style={{ color: '#fbbf24', marginBottom: '20px' }}>{ui_text.final_cta.rating}</div>
            <div style={{ background: '#38bdf8', color: 'white', padding: '10px 30px', borderRadius: '20px', fontWeight: 'bold', fontSize: '16px' }}>{ui_text.common.install}</div>
        </div>

        {/* Text Content */}
        <div style={{ textAlign: 'right', direction: 'rtl' }}>
            <h1 style={{ fontSize: '80px', fontWeight: '900', marginBottom: '10px' }}>{app_name}</h1>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#94a3b8' }}>
                {ui_text.final_cta.promo}
            </h2>
            
            {/* Pulsing CTA Button */}
            <div style={{
            transform: `scale(${pulse})`,
            background: '#38bdf8',
            color: 'white',
            padding: '20px 40px',
            borderRadius: '9999px',
            fontSize: '28px',
            fontWeight: '800',
            boxShadow: '0 10px 20px rgba(56, 189, 248, 0.4)',
            cursor: 'pointer',
            display: 'inline-block'
            }}>
            {ui_text.common.download_cta}
            </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
