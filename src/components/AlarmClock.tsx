import React from "react";
import { useCurrentFrame } from "remotion";

interface AlarmClockProps {
  shakeIntensity?: number; // 0 for no shake, higher for more shake
  spinMultiplier?: number;
}

export const AlarmClock: React.FC<AlarmClockProps> = ({
  shakeIntensity = 0,
  spinMultiplier = 1,
}) => {
  const frame = useCurrentFrame();

  // Spinning angles based on frame
  const secondAngle = (frame * 12 * spinMultiplier) % 360;
  const minuteAngle = (frame * 2 * spinMultiplier) % 360;
  const hourAngle = (frame * 0.2 * spinMultiplier) % 360;

  // Shaking effect (using sine and cosine to create a rapid vibration)
  const shakeX = shakeIntensity > 0 ? Math.sin(frame * 1.5) * shakeIntensity : 0;
  const shakeY = shakeIntensity > 0 ? Math.cos(frame * 1.7) * shakeIntensity : 0;
  const shakeRotate = shakeIntensity > 0 ? Math.sin(frame * 2) * (shakeIntensity * 0.8) : 0;

  return (
    <div
      style={{
        transform: `translate(${shakeX}px, ${shakeY}px) rotate(${shakeRotate}deg)`,
        transition: "transform 0.05s ease-out",
      }}
      className="relative w-64 h-64 flex items-center justify-center"
    >
      {/* Clock Outer Structure (SVGs for Bells, Legs, and Body) */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        {/* Left Leg */}
        <line
          x1="50"
          y1="170"
          x2="30"
          y2="195"
          stroke="#4b5563"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Right Leg */}
        <line
          x1="150"
          y1="170"
          x2="170"
          y2="195"
          stroke="#4b5563"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Left Bell */}
        <path
          d="M 25 65 A 35 35 0 0 1 85 40 L 75 60 Z"
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth="4"
        />
        <rect
          x="40"
          y="65"
          width="8"
          height="12"
          transform="rotate(-25, 40, 65)"
          fill="#9ca3af"
        />

        {/* Right Bell */}
        <path
          d="M 115 40 A 35 35 0 0 1 175 65 L 125 60 Z"
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth="4"
        />
        <rect
          x="152"
          y="60"
          width="8"
          height="12"
          transform="rotate(25, 152, 60)"
          fill="#9ca3af"
        />

        {/* Hammer in the Middle */}
        <path
          d="M 96 35 L 104 35 L 102 55 L 98 55 Z"
          fill="#4b5563"
        />
        <circle
          cx="100"
          cy="30"
          r="8"
          fill="#374151"
        />

        {/* Bell connectors */}
        <line
          x1="65"
          y1="55"
          x2="85"
          y2="75"
          stroke="#9ca3af"
          strokeWidth="6"
        />
        <line
          x1="135"
          y1="55"
          x2="115"
          y2="75"
          stroke="#9ca3af"
          strokeWidth="6"
        />

        {/* Clock Body */}
        <circle
          cx="100"
          cy="115"
          r="75"
          fill="#f3f4f6"
          stroke="#ef4444"
          strokeWidth="8"
        />
        {/* Inner shadow/ring */}
        <circle
          cx="100"
          cy="115"
          r="68"
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="2"
        />

        {/* Dial Ticks (Every 30 degrees) */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const isMajor = deg % 90 === 0;
          const tickLength = isMajor ? 10 : 5;
          const strokeW = isMajor ? 4 : 2;
          return (
            <line
              key={deg}
              x1="100"
              y1={115 - 65}
              x2="100"
              y2={115 - 65 + tickLength}
              stroke={isMajor ? "#111827" : "#9ca3af"}
              strokeWidth={strokeW}
              strokeLinecap="round"
              transform={`rotate(${deg}, 100, 115)`}
            />
          );
        })}

        {/* Numbers for 12, 3, 6, 9 */}
        <text
          x="100"
          y="72"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#1f2937"
          fontFamily="sans-serif"
        >
          12
        </text>
        <text
          x="153"
          y="121"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#1f2937"
          fontFamily="sans-serif"
        >
          3
        </text>
        <text
          x="100"
          y="170"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#1f2937"
          fontFamily="sans-serif"
        >
          6
        </text>
        <text
          x="47"
          y="121"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#1f2937"
          fontFamily="sans-serif"
        >
          9
        </text>

        {/* Hands */}
        {/* Hour Hand */}
        <line
          x1="100"
          y1="115"
          x2="100"
          y2="80"
          stroke="#1f2937"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 100, 115)`}
        />

        {/* Minute Hand */}
        <line
          x1="100"
          y1="115"
          x2="100"
          y2="65"
          stroke="#374151"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 100, 115)`}
        />

        {/* Second Hand */}
        <line
          x1="100"
          y1="115"
          x2="100"
          y2="60"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${secondAngle}, 100, 115)`}
        />

        {/* Center Cap */}
        <circle
          cx="100"
          cy="115"
          r="6"
          fill="#111827"
        />
        <circle
          cx="100"
          cy="115"
          r="2"
          fill="#f3f4f6"
        />
      </svg>
    </div>
  );
};
