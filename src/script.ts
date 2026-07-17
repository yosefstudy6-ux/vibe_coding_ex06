import scriptData from "../script.json";

export interface Scene {
  scene_name: string;
  title: string;
  text: string;
  duration_seconds: number;
  visual_style: string;
}

export interface VideoScript {
  title: string;
  app_name: string;
  total_duration_seconds: number;
  ui_text: {
    common: {
      app_name: string;
      install: string;
      download_cta: string;
    };
    scene1: {
      time: string;
      subtitle: string;
      notifications: string[];
    };
    scene2: {
      tasks: Array<{ title: string; time: string; load: number }>;
    };
    transition: {
      title: string;
      types: string[];
    };
    bridge: {
      title: string;
    };
    scene3: {
      focus_mode: string;
      tasks_title: string;
      tasks: string[];
    };
    benefits: {
      title: string;
      features: Array<{ title: string; desc: string; icon: string }>;
    };
    final_cta: {
      slogan: string;
      rating: string;
      promo: string;
    };
  };
  scenes: Scene[];
}

export const script: VideoScript = (scriptData as { video_brief: VideoScript }).video_brief;
