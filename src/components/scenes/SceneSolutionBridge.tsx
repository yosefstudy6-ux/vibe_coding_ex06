import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { DynamicGradient } from '../shared/DynamicGradient';
import { script } from '../../script';

export const SceneSolutionBridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { ui_text } = script;

  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);

  // Premium pulsing effect for the core
  const pulse = interpolate(Math.sin(frame / 15), [-1, 1], [1, 1.1]);
  const glowIntensity = interpolate(Math.sin(frame / 15), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill className="items-center justify-center">
      <DynamicGradient colors={['#020617', '#1e3a8a']} showBlobs={true} />
      
      <div style={{ transform: `scale(${scale})`, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="text-white text-7xl font-black mb-20" style={{ direction: 'rtl' }}>
          {ui_text.bridge.title}
        </h2>
        
        {/* Refined Premium Activation Core - Abstract Clock/Timer Icon */}
        <div style={{ 
            width: '200px', 
            height: '200px', 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
           {/* Outer Ring - pulsating */}
           <div style={{
             position: 'absolute',
             width: '200px',
             height: '200px',
             borderRadius: '50%',
             border: '4px solid rgba(56, 189, 248, 0.5)',
             transform: `scale(${pulse})`
           }} />
           
           {/* Inner Core (Stylized Clock) */}
           <div style={{
             width: '100px',
             height: '100px',
             borderRadius: '50%',
             background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
             boxShadow: `0 0 ${40 * glowIntensity}px #38bdf8`,
             transform: `scale(${pulse})`,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             position: 'relative'
           }}>
             {/* Clock Hands */}
             <div style={{
                position: 'absolute',
                width: '4px',
                height: '40px',
                background: 'white',
                top: '10px',
                borderRadius: '2px',
                transformOrigin: 'bottom',
                transform: `rotate(${frame * 2}deg)`
             }} />
             <div style={{
                position: 'absolute',
                width: '4px',
                height: '30px',
                background: 'white',
                top: '20px',
                borderRadius: '2px',
                transformOrigin: 'bottom',
                transform: `rotate(${frame * 0.5}deg)`
             }} />
           </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
