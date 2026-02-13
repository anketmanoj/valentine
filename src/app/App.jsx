import { useRef, useState } from "react";
import "../app/app.css";

import MemePanel from "../components/MemePanel";
import QuestionCard from "../components/QuestionCard";
import SplashScreen from "../components/SplashScreen";
import ConfettiOverlay from "../components/ConfettiOverlay";

import { MEMES } from "../logic/memePlaylist";
import { YES_MEMES } from "../logic/yesMemePlaylist";
import { useMemeController } from "../logic/useMemeController";
import { useNoButton } from "../logic/useNoButton";

function pickRandom(list) {
  if (!list?.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

export default function App() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const actionsRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const { noClicks, noPos, noText, yesScale, moveNoButton, registerNoClick, maxNoSteps } =
    useNoButton(actionsRef);

  const { activeMeme, memeVisible, triggerNextMeme, hideMeme, showMeme } = useMemeController(MEMES);

  async function onNo() {
    registerNoClick();
    moveNoButton();
    await triggerNextMeme(videoRef.current, audioRef.current);
  }

  async function onYes() {
    setAccepted(true);

    const yesPick = pickRandom(YES_MEMES);
    if (yesPick) {
      await showMeme(yesPick, videoRef.current, audioRef.current);
    } else {
      hideMeme(videoRef.current, audioRef.current);
    }
  }

  if (!started) {
    return <SplashScreen onNext={() => setStarted(true)} />;
  }

  return (
    <div className="page">
      <div className="noise" aria-hidden="true" />
      <ConfettiOverlay active={accepted} />

      <main className={`stage ${memeVisible ? "hasMeme" : "noMeme"}`}>
        {memeVisible && (
          <MemePanel
            visible={memeVisible}
            meme={activeMeme}
            videoRef={videoRef}
            audioRef={audioRef}
          />
        )}

        <QuestionCard
          accepted={accepted}
          onYes={onYes}
          onNo={onNo}
          yesScale={yesScale}
          noText={noText}
          noPos={noPos}
          actionsRef={actionsRef}
          noClicks={noClicks}
          maxNoSteps={maxNoSteps}
        />
      </main>
    </div>
  );
}
