import Link from "next/link";
import FaqAccordion from "../../components/FaqAccordion";

export default function FaqPage() {
    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        FAQ
                    </p>
                    <h1>Respuestas directas.</h1>
                    <p>Todo lo que te preguntas antes de aplicar. Si falta algo, escribinos.</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            Aplica para Season 0
                        </Link>
                        <Link href="/how" className="btn-ghost">
                            Ver protocolo
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">Preguntas</p>
                    <h2>Lo que mas preguntan</h2>
                </div>
                <FaqAccordion />
            </section>
        </main>
    );
}
