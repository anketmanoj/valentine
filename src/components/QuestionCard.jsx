export default function QuestionCard({
  accepted,
  onYes,
  onNo,
  yesScale,
  noText,
  noPos,
  actionsRef,
  noClicks,
  maxNoSteps,
}) {
  const baseHeight = 160;
  const expandedHeight = Math.round(baseHeight * yesScale);

  const isInitial = noClicks === 0;
  const noIsFloating = !isInitial && !!noPos;

  /* ---------- YES takeover math (only AFTER first No click) ---------- */
  const denom = Math.max(1, maxNoSteps - 1);
  const progressRaw = noClicks / denom;
  const progress = Math.max(0, Math.min(1, progressRaw));

  const fill = 0.3 + progress * 0.68; // 30% → 98%
  const yesFont = Math.round(18 + progress * 22); // 18 → 40

  const yesTakeoverStyle = !isInitial
    ? {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: `${Math.round(fill * 100)}%`,
        height: `${Math.round(fill * 100)}%`,
        fontSize: `${yesFont}px`,
        borderRadius: `${Math.round(18 + progress * 14)}px`,
        display: "grid",
        placeItems: "center",
      }
    : {}; // ⬅️ IMPORTANT: no special styling at stage 0

  return (
    <section className="question">
      <h1 className="headline">will you be my valentine?</h1>
      <p className="sub">No pink. No cringe. Only memes and consequences.</p>

      {!accepted ? (
        <div
          className={`actions takeover ${isInitial ? "initial" : ""}`}
          ref={actionsRef}
          style={{ height: `${expandedHeight}px` }}
        >
          {/* ---------- STAGE 0: SAME SIZE, SIDE BY SIDE ---------- */}
          {isInitial && (
            <div className="buttonRow">
              <button className="btn yes" onClick={onYes}>
                Yes.
              </button>
              <button className="btn no" onClick={onNo}>
                {noText}
              </button>
            </div>
          )}

          {/* ---------- STAGE 1+: YES TAKES OVER ---------- */}
          {!isInitial && (
            <>
              <button className="btn yes takeoverYes" onClick={onYes} style={yesTakeoverStyle}>
                Yes.
              </button>

              {noIsFloating && (
                <button
                  className="btn no"
                  onClick={onNo}
                  style={{
                    position: "absolute",
                    left: noPos.x,
                    top: noPos.y,
                  }}
                >
                  {noText}
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="accepted">
          <div className="acceptedCard">
            <div className="big">W.</div>
            <div className="line">You chose peace.</div>
            <div className="tiny">Now send her the link and act surprised.</div>
          </div>
        </div>
      )}
    </section>
  );
}
