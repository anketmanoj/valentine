export default function MemePanel({ visible, meme, videoRef, audioRef }) {
  return (
    <section className={`memePanel ${visible ? "show" : ""}`}>
      <div className="memeHeader">
        <div className="tag">brainrot mode</div>
        <div className="meta">{meme?.label ? <span>{meme.label}</span> : <span>…</span>}</div>
      </div>

      <div className="memeBody">
        {!meme && (
          <div className="memePlaceholder">
            Click <b>No</b> to unlock the meme punishment.
          </div>
        )}

        {meme?.type === "gif" && <img className="memeMedia" src={meme.src} alt={meme.label} />}

        {meme?.type === "video" && (
          <video ref={videoRef} className="memeMedia" src={meme.src} playsInline controls />
        )}

        {meme?.audioSrc && <audio ref={audioRef} src={meme.audioSrc} />}
      </div>
    </section>
  );
}
