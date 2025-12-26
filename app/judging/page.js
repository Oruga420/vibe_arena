import Link from "next/link";
import JudgingBars from "../../components/JudgingBars";

export default function JudgingPage() {
    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        Criterios
                    </p>
                    <h1>Reglas claras, rapidas y medibles.</h1>
                    <p>AI permitido. Gana el que demuestra valor real en el menor tiempo posible. El jurado prioriza impacto y claridad.</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            Aplica para Season 0
                        </Link>
                        <Link href="/how" className="btn-ghost">
                            Ver el protocolo
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="judging-grid">
                    <div>
                        <div className="section-header">
                            <p className="mono">Pesos</p>
                            <h2>Como evaluamos</h2>
                            <p style={{ marginTop: "20px", color: "#444" }}>
                                No premiamos el humo. Gana el que shipea valor con el menor tiempo posible.
                            </p>
                        </div>
                        <div className="cards-grid">
                            <div className="card-link">
                                <span>Regla base</span>
                                <h3>Demo online</h3>
                                <p>La URL debe estar viva. Si no carga, no hay puntaje.</p>
                            </div>
                            <div className="card-link">
                                <span>AI permitido</span>
                                <h3>Transparencia</h3>
                                <p>Podes usar IA, templates y libs. Conta que usaste.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <JudgingBars />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">Checklist</p>
                    <h2>Reglas esenciales</h2>
                </div>
                <div className="grid-4">
                    <div className="card">
                        <span className="card-num">01</span>
                        <h3>120 minutos</h3>
                        <p>El timer corre para todos. No hay extensiones ni excepciones.</p>
                    </div>
                    <div className="card">
                        <span className="card-num">02</span>
                        <h3>Stack libre</h3>
                        <p>Usa lo que mejor sabes. La velocidad manda.</p>
                    </div>
                    <div className="card">
                        <span className="card-num">03</span>
                        <h3>Repo publico</h3>
                        <p>Subi el repo con README claro y setup minimal.</p>
                    </div>
                    <div className="card">
                        <span className="card-num">04</span>
                        <h3>Demo en vivo</h3>
                        <p>Los top 5 muestran su demo frente al jurado.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
