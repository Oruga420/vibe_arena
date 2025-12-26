import Link from "next/link";

export default function HowPage() {
    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        Protocolo
                    </p>
                    <h1>4 pasos. Sin vueltas.</h1>
                    <p>
                        Un prompt a las 18:00 EST, 120 minutos de foco y una demo que funcione en vivo. Esto es
                        speed shipping, no una hackathon eterna.
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
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">Pasos</p>
                    <h2>El flow completo</h2>
                </div>
                <div className="grid-4">
                    <div className="card">
                        <span className="card-num">01</span>
                        <h3>Recibis el prompt</h3>
                        <p>A las 18:00 EST revelamos el desafio tecnico. Todos parten desde cero.</p>
                    </div>
                    <div className="card">
                        <span className="card-num">02</span>
                        <h3>Codeas 2 horas</h3>
                        <p>Vibe-coding puro. Usas IA, templates y lo que quieras. El objetivo es shippear.</p>
                    </div>
                    <div className="card">
                        <span className="card-num">03</span>
                        <h3>Entregas demo</h3>
                        <p>Subis tu URL activa y el repositorio. Si no esta online, no existe.</p>
                    </div>
                    <div className="card">
                        <span className="card-num">04</span>
                        <h3>Demos live</h3>
                        <p>El jurado revisa los top 5 en vivo. Un ganador se lleva el drop de la season.</p>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">Entrega</p>
                    <h2>Lo que tenes que subir</h2>
                </div>
                <div className="cards-grid">
                    <div className="card-link">
                        <span>Demo activa</span>
                        <h3>URL funcional</h3>
                        <p>Tu app tiene que estar online y usable. Si se cae, se descalifica.</p>
                    </div>
                    <div className="card-link">
                        <span>Repositorio</span>
                        <h3>Code y README</h3>
                        <p>Inclui instrucciones simples para correr el proyecto y cualquier hack clave.</p>
                    </div>
                    <div className="card-link">
                        <span>Pitch corto</span>
                        <h3>Demo de 2 minutos</h3>
                        <p>Conta el problema y mostra la solucion. Sin slides eternas.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
