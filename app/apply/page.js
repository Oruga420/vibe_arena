import ApplyForm from "../../components/ApplyForm";

export default function ApplyPage() {
    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        Aplicacion
                    </p>
                    <h1>Entra a la Season 0.</h1>
                    <p>Cupos limitados para el primer drop. Contanos quien sos, que haces y por que queres competir.</p>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">Formulario</p>
                    <h2>Aplica en 2 minutos</h2>
                </div>
                <ApplyForm />
            </section>
        </main>
    );
}
