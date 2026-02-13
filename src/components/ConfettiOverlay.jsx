import { useMemo } from "react";

export default function ConfettiOverlay({ active = false, pieces = 140 }) {
  const confettiData = useMemo(() => {
    return Array.from({ length: pieces }).map(() => {
      return {
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        duration: 2.8 + Math.random() * 1.8,
        size: 6 + Math.random() * 8,
        rot: Math.random() * 360,
        drift: (Math.random() * 2 - 1) * 18,
        isDot: Math.random() > 0.5,
      };
    });
  }, [pieces]);

  if (!active) return null;

  return (
    <div className="confetti" aria-hidden="true">
      {confettiData.map((c, i) => (
        <span
          key={i}
          className={`confettiPiece ${c.isDot ? "dot" : "rect"}`}
          style={{
            left: `${c.left}vw`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            width: `${c.size}px`,
            height: `${Math.max(6, c.size * 0.55)}px`,
            transform: `rotate(${c.rot}deg)`,
            "--drift": `${c.drift}vw`,
          }}
        />
      ))}
    </div>
  );
}
