import { useRef, useState } from "react";
import "../app/app.css";

import MemePanel from "../components/MemePanel";
import QuestionCard from "../components/QuestionCard";

import { MEMES } from "../logic/memePlaylist";
import { useMemeController } from "../logic/useMemeController";
import { useNoButton } from "../logic/useNoButton";

export default function App() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const actionsRef = useRef(null);

  const [accepted, setAccepted] = useState(false);

  const { noClicks, noPos, noText, yesScale, moveNoButton, registerNoClick, maxNoSteps } =
    useNoButton(actionsRef);

  const { activeMeme, memeVisible, triggerNextMeme, hideMeme } = useMemeController(MEMES);

  async function onNo() {
    registerNoClick();
    moveNoButton(); // ONLY moves on click
    await triggerNextMeme(videoRef.current, audioRef.current);
  }

  function onYes() {
    setAccepted(true);
    hideMeme(videoRef.current, audioRef.current);
  }

  return (
    <div className="page">
      <div className="noise" aria-hidden="true" />

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
