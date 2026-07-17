import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

export const AppInterface: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 150,
    },
  });

  const listItems = [
    { title: "משימה הושלמה: דוח רבעוני", time: "10:30", completed: true },
    { title: "פגישת סיכום פרויקט", time: "14:00", completed: false },
    { title: "זמן מיקוד (Focus Mode)", time: "15:30", completed: false },
  ];

  return (
    <div className="w-full h-full bg-blue-50 flex items-center justify-center p-12">
      <div
        style={{
          transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`,
          opacity: entrance,
        }}
        className="w-[360px] h-[640px] bg-white rounded-[48px] shadow-2xl border-[12px] border-gray-900 overflow-hidden flex flex-col"
      >
        {/* Status Bar */}
        <div className="h-10 bg-white flex justify-between items-center px-8 pt-4">
          <div className="text-xs font-bold">9:41</div>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-900 rounded-full scale-50" />
            <div className="w-4 h-4 bg-gray-900 rounded-sm scale-50" />
          </div>
        </div>

        {/* Header */}
        <div className="p-8 pb-4">
          <h1 className="text-4xl font-black text-blue-600 tracking-tight">TimeUp</h1>
          <p className="text-gray-500 font-medium text-sm">היום שלך מסודר</p>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 space-y-4 pt-4">
          {listItems.map((item, i) => {
            const itemEntrance = spring({
              frame: frame - 10 - i * 5,
              fps,
              config: { damping: 12 },
            });

            return (
              <div
                key={i}
                style={{
                  transform: `translateX(${interpolate(itemEntrance, [0, 1], [20, 0])}px)`,
                  opacity: itemEntrance,
                  direction: "rtl",
                  unicodeBidi: "embed",
                  textAlign: "right",
                }}
                className={`p-4 rounded-2xl flex items-center justify-between ${
                  item.completed ? "bg-blue-50 border border-blue-100" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      item.completed ? "bg-blue-500 border-blue-500" : "border-gray-300"
                    }`}
                  >
                    {item.completed && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span
                    className={`font-bold text-sm ${
                      item.completed ? "text-blue-700 line-through opacity-50" : "text-gray-800"
                    }`}
                    style={{ unicodeBidi: "embed" }}
                  >
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-400">{item.time}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Nav */}
        <div className="h-20 border-t border-gray-100 flex justify-around items-center px-6">
          {[0, 1, 2, 3].map((_, i) => (
            <div key={i} className={`w-10 h-1 h-1 rounded-full ${i === 0 ? "bg-blue-600" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
