import { useCallback, useState } from "react";

function pickRandomMeme(exceptId, list) {
  if (!list?.length) return null;
  if (list.length === 1) return list[0];

  let choice = list[Math.floor(Math.random() * list.length)];
  while (choice.id === exceptId) {
    choice = list[Math.floor(Math.random() * list.length)];
  }
  return choice;
}

export function useMemeController(memes) {
  const [activeMeme, setActiveMeme] = useState(null);
  const [memeVisible, setMemeVisible] = useState(false);

  const stopAllMedia = useCallback((videoEl, audioEl) => {
    if (videoEl) {
      try {
        videoEl.pause();
        videoEl.currentTime = 0;
      } catch (err) {
        console.error("Error stopping video:", err);
      }
    }
    if (audioEl) {
      try {
        audioEl.pause();
        audioEl.currentTime = 0;
      } catch (err) {
        console.error("Error stopping audio:", err);
      }
    }
  }, []);

  const playActiveMeme = useCallback(async (meme, videoEl, audioEl) => {
    if (!meme) return;

    if (meme.type === "video" && videoEl) {
      try {
        videoEl.muted = false;
        await videoEl.play();
      } catch {
        // Autoplay might fail; controls are available so user can press play.
      }
    }

    if (meme.audioSrc && audioEl) {
      try {
        await audioEl.play();
      } catch {
        // Autoplay might fail; controls are available so user can press play.
      }
    }
  }, []);

  const triggerNextMeme = useCallback(
    async (videoEl, audioEl) => {
      const next = pickRandomMeme(activeMeme?.id, memes);
      setActiveMeme(next);
      setMemeVisible(true);

      // stop old, then play new after DOM updates the src
      stopAllMedia(videoEl, audioEl);
      setTimeout(() => playActiveMeme(next, videoEl, audioEl), 50);

      return next;
    },
    [activeMeme?.id, memes, playActiveMeme, stopAllMedia],
  );

  const hideMeme = useCallback(
    (videoEl, audioEl) => {
      setMemeVisible(false);
      stopAllMedia(videoEl, audioEl);
    },
    [stopAllMedia],
  );

  return { activeMeme, memeVisible, triggerNextMeme, hideMeme };
}
