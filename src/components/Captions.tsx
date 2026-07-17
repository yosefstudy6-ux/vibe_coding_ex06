import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface CaptionsProps {
  text: string;
  fadeOutAfter?: number; // Frame to start fading out
}

export const Captions: React.FC<CaptionsProps> = ({ 
  text, 
  fadeOutAfter 
}) => {
  const frame = useCurrentFrame();

  // Entrance
  const entrance = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Exit/Fade-out logic
  let exit = 1;
  if (fadeOutAfter && frame > fadeOutAfter) {
    exit = interpolate(frame, [fadeOutAfter, fadeOutAfter + 20], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const opacity = entrance * exit;

  return (
    <div
      style={{
        direction: "rtl",
        unicodeBidi: "embed",
        textAlign: "center",
        position: 'absolute',
        bottom: '6%',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 5%',
        opacity: opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
      }}
      lang="he"
      className="pointer-events-none"
    >
      <span
        style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          maxWidth: '900px',
          lineHeight: '1.4',
        }}
        className="text-4xl font-bold text-white bg-black/70 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/20 tracking-wide"
      >
        {text}
      </span>
    </div>
  );
};
