import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, random } from 'remotion';
import { DynamicGradient } from '../shared/DynamicGradient';
import { script } from '../../script';

export const SceneTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { ui_text } = script;

  // Create a massive, layered data rain effect
  const tasks = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    x: (i * 7) % 100,
    speed: 0.5 + (i % 5) * 0.5,
    delay: (i * 3) % 40,
    type: ui_text.transition.types[i % ui_text.transition.types.length]
  }));

  const textEntrance = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  return (
    <AbsoluteFill className="items-center justify-center overflow-hidden">
      <DynamicGradient colors={['#020617', '#1e3a8a']} showBlobs={true} />
      
      {/* Massive Data Rain */}
      {tasks.map((task) => {
        const progress = ((frame - task.delay) * task.speed) % 120 - 20; 

        return (
          <div key={task.id} style={{
            position: 'absolute',
            left: `${task.x}%`,
            top: `${progress}%`,
            width: '100px',
            height: '35px',
            background: 'rgba(56, 189, 248, 0.1)',
            backdropFilter: 'blur(5px)',
            borderRadius: '8px',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            fontSize: '11px',
            fontWeight: 'bold',
            opacity: progress > 80 ? interpolate(progress, [80, 100], [1, 0]) : 1,
          }}>
            {task.type} : {Math.floor(random(task.id) * 1000)}
          </div>
        );
      })}

      {/* Main Text */}
      <div style={{
        position: 'relative',
        padding: '30px 60px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(56, 189, 248, 0.5)',
        borderRadius: '25px',
        textAlign: 'center',
        transform: `scale(${interpolate(textEntrance, [0, 1], [0.9, 1])})`,
        opacity: textEntrance,
        boxShadow: '0 0 40px rgba(56, 189, 248, 0.2)'
      }}>
        <h2 className="text-white text-5xl font-black tracking-tight" style={{ direction: 'rtl' }}>
          {ui_text.transition.title}
        </h2>
      </div>
    </AbsoluteFill>
  );
};
