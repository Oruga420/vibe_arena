import Link from "next/link";
import AsciiTower from "../components/AsciiTower";
import Countdown from "../components/Countdown";

export default function HomePage() {
    return (
        <main>
            <section className="hero">
                <AsciiTower />
                <div className="scanline" aria-hidden="true"></div>

                <div className="hero-content">
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "16px" }}>
                        Toronto Vibe-coding Arena
                    </p>
                    <h1>
                        Shippea una app
                        <br />
                        en 2 horas.
                    </h1>
                    <p>
                        Un prompt. Un reloj. Un ganador. Unite a la Season 0 y demostra que sos el gladiador
                        mas rapido del ecosistema.
                    </p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            Aplica para Season 0
                        </Link>
                        <Link href="/judging" className="btn-ghost">
                            Como se juzga
                        </Link>
                    </div>
                </div>

                <div className="drop-card">
                    <div className="mono" style={{ marginBottom: "20px", opacity: 0.5 }}>
                        Proximo Drop (Tentativo)
                    </div>
                    <div className="drop-row">
                        <span>Formato</span>
                        <span>Virtual / Toronto Hybrid</span>
                    </div>
                    <div className="drop-row">
                        <span>Duracion</span>
                        <span>120 minutos</span>
                    </div>
                    <div className="drop-row">
                        <span>Stack</span>
                        <span>Open choice</span>
                    </div>
                    <Countdown targetDate="2025-02-01T00:00:00" />
                    <div className="mono" style={{ marginTop: "8px", fontSize: "0.6rem", color: "var(--accent-red)" }}>
                        Limited spots available
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">Mapa</p>
                    <h2>Todo lo que tenes que saber</h2>
                </div>
                <div className="cards-grid">
                    <Link className="card-link" href="/how">
                        <span>01 &bull; Protocolo</span>
                        <h3>Como funciona</h3>
                        <p>Los 4 pasos, el reloj y las entregas reales. Sin humo.</p>
                    </Link>
                    <Link className="card-link" href="/judging">
                        <span>02 &bull; Reglas</span>
                        <h3>Evaluacion</h3>
                        <p>Peso de criterios, formato y que es lo que gana.</p>
                    </Link>
                    <Link className="card-link" href="/roadmap">
                        <span>03 &bull; Season 0</span>
                        <h3>Building in public</h3>
                        <p>Roadmap, hitos y el plan de lanzamiento en vivo.</p>
                    </Link>
                    <Link className="card-link" href="/faq">
                        <span>04 &bull; FAQ</span>
                        <h3>Preguntas rapidas</h3>
                        <p>Reglas, horarios, demos y lo que mas preguntan.</p>
                    </Link>
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">Season 0</p>
                    <h2>Primero shippeas. Despues discutimos.</h2>
                </div>
                <p style={{ maxWidth: "680px", color: "#444", marginBottom: "32px" }}>
                    QuickDrop es una arena de velocidad con identidad Toronto. La regla es simple: 2 horas, una
                    app real, demo activa y repo. El resto es actitud.
                </p>
                <div className="hero-ctas">
                    <Link href="/apply" className="btn-primary">
                        Aplica ahora
                    </Link>
                    <Link href="/roadmap" className="btn-ghost">
                        Ver el plan
                    </Link>
                </div>
            </section>
        </main>
    );
}
