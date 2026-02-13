import { useEffect, useMemo, useState } from "react";

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

/**
 * No starts on the right side of Yes.
 * It ONLY moves when moveNoButton() is called (i.e., on click).
 * Confined to actionsRef boundaries.
 */
export function useNoButton(actionsRef) {
  const [noClicks, setNoClicks] = useState(0);

  // Position is null until first "move" (keeps it in normal flow on the right)
  const [noPos, setNoPos] = useState(null);

  const NO_BTN_W = 150;
  const NO_BTN_H = 52;

  const noLines = useMemo(
    () => [
      "No.",
      "Nope.",
      "Try again.",
      "Wrong answer.",
      "Are you *sure*?",
      "Don’t lie 😐",
      "Ok but no is illegal",
      "That button is cursed",
      "You meant YES, I saw it",
      "Final warning 😈",
    ],
    [],
  );

  function moveNoButton() {
    const box = actionsRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const padding = 10;

    const maxX = Math.max(padding, rect.width - NO_BTN_W - padding);
    const maxY = Math.max(padding, rect.height - NO_BTN_H - padding);

    // Pick a random spot anywhere inside the box
    const x = randomInt(padding, maxX);
    const y = randomInt(padding, maxY);

    setNoPos({ x, y });
  }

  function registerNoClick() {
    setNoClicks((n) => n + 1);
  }

  // NOTE: We do NOT auto-move on mount anymore.
  // That keeps No in normal layout (to the right of Yes) initially.
  useEffect(() => {}, []);

  const noText = noLines[Math.min(noClicks, noLines.length - 1)];
  const yesScale = Math.min(1 + noClicks * 0.6, 1.9);

  const maxNoSteps = noLines.length;

  return { noClicks, noPos, noText, yesScale, moveNoButton, registerNoClick, maxNoSteps };
}
