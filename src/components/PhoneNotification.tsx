import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface NotificationProps {
  app: string;
  message: string;
  time: string;
  delay: number;
}

export const PhoneNotification: React.FC<NotificationProps> = ({
  app,
  message,
  time,
  delay,
}) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 150,
    },
  });

  const opacity = interpolate(frame - delay, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const translateY = interpolate(entrance, [0, 1], [20, 0]);

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        direction: "rtl",
        unicodeBidi: "embed",
        textAlign: "right",
      }}
      className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-xl mb-3 flex flex-col w-80 self-center"
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-blue-500 rounded-md mr-0 ml-2" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {app}
          </span>
        </div>
        <span className="text-[10px] text-gray-400">{time}</span>
      </div>
      <p className="text-sm font-semibold text-gray-800 text-right leading-tight" style={{ unicodeBidi: "embed" }}>
        {message}
      </p>
    </div>
  );
};
