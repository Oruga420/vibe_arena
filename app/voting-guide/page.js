"use client";

import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";

export default function VotingGuide() {
    const { t, language } = useLanguage();
    const content = t("votingGuide");

    if (!content) return null;

    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {content.hero.tag}
                    </p>
                    <h1>{content.hero.title}</h1>
                    <p>{content.hero.subtitle}</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            {content.hero.cta}
                        </Link>
                        <Link href="/judging" className="btn-ghost">
                            {language === "es" ? "Ver reglas" : "See the rules"}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{content.steps.label}</p>
                    <h2>{language === "es" ? "Cómo funciona el voto" : "How voting works"}</h2>
                </div>
                <div className="grid-4">
                    {Array.isArray(content.steps.items) &&
                        content.steps.items.map((step) => (
                            <div className="card" key={step.title}>
                                <span className="card-num">{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.body}</p>
                            </div>
                        ))}
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{language === "es" ? "SEGURIDAD" : "SECURITY"}</p>
                    <h2>{content.security.title}</h2>
                </div>
                <div className="cards-grid">
                    <div className="card-link static">
                        <span>{language === "es" ? "Anti-bots" : "Anti-bots"}</span>
                        <h3>{content.security.title}</h3>
                        <p>{content.security.body}</p>
                    </div>
                    <div className="card-link static">
                        <span>{language === "es" ? "Verificación" : "Verification"}</span>
                        <h3>{language === "es" ? "Prueba de presencia" : "Proof of presence"}</h3>
                        <p>
                            {language === "es"
                                ? "Cada voto capturado mediante el artefacto QR es una prueba de vida, una firma digital de que estuviste ahí, presenciando la gloria o la caída de los gladiadores."
                                : "Every vote captured through the QR artifact is proof of life, a digital signature that you were there, witnessing the glory or the fall of the gladiators."}
                        </p>
                    </div>
                    <div className="card-link static">
                        <span>{language === "es" ? "Rotación" : "Rotation"}</span>
                        <h3>{language === "es" ? "Tokens dinámicos" : "Dynamic tokens"}</h3>
                        <p>
                            {language === "es"
                                ? "El QR es un organismo vivo: cambia cada 30s. Escanealo antes de que el token muera."
                                : "The QR is a living organism: it changes every 30s. Scan it before the token dies."}
                        </p>
                    </div>
                    <div className="card-link static">
                        <span>{language === "es" ? "Encriptación" : "Encryption"}</span>
                        <h3>AES-256</h3>
                        <p>
                            {language === "es"
                                ? "Latencia de 40ms. Estado: verificado. Autenticación mediante QR dinámico."
                                : "40ms latency. Status: verified. Authentication via dynamic QR."}
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{language === "es" ? "DECISIÓN FINAL" : "FINAL CALL"}</p>
                    <h2>{language === "es" ? "¿Vas a reinar o a mirar?" : "Reign or watch?"}</h2>
                </div>
                <p style={{ maxWidth: "680px", color: "var(--text-muted)", marginBottom: "32px" }}>
                    {language === "es"
                        ? "En el Coliseo, el código no tiene sentimientos. Tu voto es el que decide quién vive y quién muere en la arena. No hay segundas oportunidades."
                        : "In the Colosseum, code has no feelings. Your vote decides who lives and who dies in the arena. No second chances."}
                </p>
                <div className="hero-ctas">
                    <Link href="/apply" className="btn-primary">
                        {content.hero.cta}
                    </Link>
                    <Link href="/how" className="btn-ghost">
                        {language === "es" ? "Ver el protocolo" : "See the protocol"}
                    </Link>
                </div>
            </section>
        </main>
    );
}
