import Link from "next/link";

export default function RoadmapPage() {
    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        Building in Public
                    </p>
                    <h1>Roadmap Season 0</h1>
                    <p>Estamos armando la arena a la vista. Cada paso es publico y medible para que la comunidad empuje con nosotros.</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            Aplica para Season 0
                        </Link>
                        <Link href="/faq" className="btn-ghost">
                            Resolver dudas
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="manifesto">
                    <p className="mono" style={{ marginBottom: "20px", textAlign: "center" }}>
                        Plan abierto
                    </p>
                    <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2rem" }}>
                        Hitos clave
                    </h2>

                    <div className="roadmap-item">
                        <div className="check done"></div>
                        <span>Landing Page v1.0</span>
                    </div>
                    <div className="roadmap-item">
                        <div className="check"></div>
                        <span>Primer Beta Privado (Toronto Devs)</span>
                    </div>
                    <div className="roadmap-item">
                        <div className="check"></div>
                        <span>Reglamento y Sistema de Puntos</span>
                    </div>
                    <div className="roadmap-item">
                        <div className="check"></div>
                        <span>Primer Evento Publico</span>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Link href="/apply" className="btn-primary">
                            Sumarte al primer drop
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">Comunidad</p>
                    <h2>Queres empujar el roadmap</h2>
                </div>
                <p style={{ maxWidth: "680px", color: "#444", marginBottom: "32px" }}>
                    Buscamos mentores, jurados y partners locales en Toronto. Si queres construir en la primera linea, este es el momento.
                </p>
                <div className="hero-ctas">
                    <Link href="/apply" className="btn-primary">
                        Quiero participar
                    </Link>
                    <Link href="/faq" className="btn-ghost">
                        Ver preguntas
                    </Link>
                </div>
            </section>
        </main>
    );
}
