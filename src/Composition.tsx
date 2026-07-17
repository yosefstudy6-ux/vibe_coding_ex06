import {
  AbsoluteFill,
  Audio,
  Series,
  staticFile,
  Composition,
} from "remotion";
import { script } from "./script";
import { Scene1 } from "./components/scenes/Scene1";
import { Scene2 } from "./components/scenes/Scene2";
import { Scene3 } from "./components/scenes/Scene3";
import { BenefitsShowcase } from "./components/scenes/BenefitsShowcase";
import { SceneTransition } from "./components/scenes/SceneTransition";
import { SceneSolutionBridge } from "./components/scenes/SceneSolutionBridge";
import { FinalCTA } from "./components/scenes/FinalCTA";
import { Captions } from "./components/Captions";

export const Main: React.FC = () => {
  const fps = 60;
  
  // Revised Pacing (Total: 60s):
  // Scene 1: 7s (Trimmed 1s)
  // Transition: 3s
  // Scene 2: 12s
  // Bridge: 2s
  // Scene 3: 9s (Trimmed 1s)
  // Benefits Showcase: 12s (Reduced by 5s)
  // Final CTA: 15s (Increased by 7s)
  
  const scene1Frames = 7 * fps;
  const transitionFrames = 3 * fps;
  const scene2Frames = 12 * fps;
  const bridgeFrames = 2 * fps;
  const scene3Frames = 9 * fps;
  const benefitsFrames = 12 * fps;
  const finalCTAFrames = 15 * fps;

  return (
    <AbsoluteFill className="font-sans tracking-tight font-semibold overflow-hidden bg-black">
      <Audio src={staticFile("song.mp3")} volume={0.5} />
      <Series>
        {/* Scene 1 */}
        <Series.Sequence durationInFrames={scene1Frames}>
          <Scene1 />
          <Captions text={script.scenes[0].text} />
        </Series.Sequence>

        {/* Transition */}
        <Series.Sequence durationInFrames={transitionFrames}>
          <SceneTransition />
        </Series.Sequence>

        {/* Scene 2 */}
        <Series.Sequence durationInFrames={scene2Frames}>
          <Scene2 />
          <Captions text={script.scenes[1].text} />
        </Series.Sequence>

        {/* Bridge */}
        <Series.Sequence durationInFrames={bridgeFrames}>
          <SceneSolutionBridge />
        </Series.Sequence>

        {/* Scene 3 */}
        <Series.Sequence durationInFrames={scene3Frames}>
          <Scene3 />
          <Captions 
            text={script.scenes[2].text} 
            fadeOutAfter={scene3Frames - 120} 
          />
        </Series.Sequence>

        {/* Benefits Showcase */}
        <Series.Sequence durationInFrames={benefitsFrames}>
          <BenefitsShowcase />
        </Series.Sequence>

        {/* Final CTA */}
        <Series.Sequence durationInFrames={finalCTAFrames}>
          <FinalCTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="TimeUpCommercial"
      component={Main}
      durationInFrames={3600} // Total: 60s @ 60fps
      fps={60}
      width={1920}
      height={1080}
    />
  );
};
