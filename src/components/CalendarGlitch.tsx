import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const CalendarGlitch: React.FC = () => {
  const frame = useCurrentFrame();

  const events = [
    { title: "פגישת צוות דחופה", time: "09:00", color: "bg-red-400" },
    { title: "שיחת לקוח", time: "09:15", color: "bg-orange-400" },
    { title: "דוח רבעוני", time: "10:30", color: "bg-red-500" },
    { title: "פגישת עדכון", time: "10:30", color: "bg-gray-500" },
    { title: "הדרכת עובדים", time: "11:00", color: "bg-red-300" },
  ];

  return (
    <div className="w-full h-full flex flex-col p-12 bg-white">
      <div className="flex justify-between items-center mb-12 border-b-4 border-blue-100 pb-6">
        <h2 className="text-5xl font-black text-gray-800">יומן עמוס</h2>
        <div className="text-2xl font-bold text-gray-400">יום שלישי</div>
      </div>

      <div className="flex flex-col gap-6">
        {events.map((event, i) => {
          // Staggered entrance animation
          const delay = i * 5;
          const progress = interpolate(frame - delay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.cubic,
          });

          const opacity = progress;
          const scale = interpolate(progress, [0, 1], [0.9, 1]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
                direction: "rtl",
                unicodeBidi: "embed",
                textAlign: "right",
              }}
              className={`p-6 rounded-3xl shadow-lg flex justify-between items-center ${event.color} text-white border-2 border-white/20`}
            >
              <div className="text-2xl font-bold" style={{ unicodeBidi: "embed" }}>{event.title}</div>
              <div className="text-xl font-medium opacity-90">{event.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
