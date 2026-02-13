export default function SplashScreen({ onNext }) {
  return (
    <div className="page">
      <div className="noise" aria-hidden="true" />

      <main className="stage splash">
        <section className="splashCard">
          <h1 className="splashTitle">
            Still tryna figure out how serious you are. Thought I’d use this moment to ask properly…
          </h1>

          <div className="splashActions">
            <button className="btn yes" onClick={onNext}>
              Next.
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
