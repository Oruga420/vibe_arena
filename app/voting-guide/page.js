"use client";

import { useLanguage } from "../../components/LanguageProvider";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function VotingGuide() {
    const { t, language } = useLanguage();
    const content = t("votingGuide");
    const containerRef = useRef(null);

    if (!content) return null;

    return (
        <main ref={containerRef} className="vg-luxury-page">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;700;800&family=JetBrains+Mono:wght@300;500&display=swap');

                .vg-luxury-page {
                    --obsidian: #050505;
                    --obsidian-alt: #0a0a0a;
                    --gold: #C5A059;
                    --gold-deep: #8E7037;
                    --gold-glow: rgba(197, 160, 89, 0.4);
                    --emerald: #00FF85;
                    --emerald-dark: #004d28;
                    --text-main: #ffffff;
                    --text-secondary: rgba(255, 255, 255, 0.5);
                    --glass: rgba(255, 255, 255, 0.02);
                    --glass-border: rgba(255, 255, 255, 0.08);
                    
                    background-color: var(--obsidian);
                    color: var(--text-main);
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                    line-height: 1.618;
                    overflow-x: hidden;
                }

                .serif { font-family: 'Playfair Display', serif; }
                .mono { font-family: 'JetBrains Mono', monospace; }

                /* HERO SECTION */
                .vg-hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 0 10%;
                    overflow: hidden;
                }

                .vg-hero-content {
                    position: relative;
                    z-index: 20;
                    max-width: 900px;
                }

                .vg-tag {
                    font-family: 'JetBrains Mono', monospace;
                    color: var(--gold);
                    letter-spacing: 0.8em;
                    font-size: 11px;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 3rem;
                    font-weight: 800;
                    opacity: 0.8;
                }

                .vg-title {
                    font-size: clamp(3.5rem, 10vw, 120px);
                    line-height: 0.85;
                    letter-spacing: -0.05em;
                    margin-bottom: 3.5rem;
                    font-weight: 900;
                }

                .vg-title .gold-accent {
                    color: var(--gold);
                    font-style: italic;
                    display: block;
                    text-shadow: 0 0 50px var(--gold-glow);
                }

                .vg-subtitle {
                    font-size: clamp(20px, 2vw, 24px);
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin-bottom: 5rem;
                    font-weight: 300;
                    line-height: 1.5;
                }

                .vg-hero-visual {
                    position: absolute;
                    right: -15%;
                    top: 10%;
                    width: 70%;
                    height: 80%;
                    opacity: 0.4;
                    pointer-events: none;
                }

                /* BENTO GRID - THE HEART OF THE PROBLEM */
                .vg-protocol-section {
                    padding: 200px 10%;
                    background-color: var(--obsidian-alt);
                    border-top: 1px solid var(--glass-border);
                }

                .vg-section-header {
                    margin-bottom: 150px;
                }

                .vg-protocol-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 60px;
                }

                @media (max-width: 1024px) {
                    .vg-protocol-grid { grid-template-columns: 1fr; gap: 40px; }
                }

                .bento-card {
                    background: var(--glass);
                    border: 1px solid var(--glass-border);
                    padding: 80px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    min-height: 550px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .bento-card:hover {
                    border-color: var(--gold);
                    background: rgba(255, 255, 255, 0.04);
                    transform: translateY(-20px);
                }

                .bento-card.full {
                    grid-column: span 2;
                    min-height: 480px;
                }

                @media (max-width: 1024px) {
                    .bento-card.full { grid-column: span 1; }
                }

                .bento-num {
                    font-family: 'Playfair Display', serif;
                    font-size: 20rem;
                    font-weight: 900;
                    position: absolute;
                    top: -60px;
                    right: -40px;
                    opacity: 0.03;
                    line-height: 1;
                    pointer-events: none;
                }

                .bento-title {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 900;
                    color: var(--gold);
                    margin-bottom: 2.5rem;
                    line-height: 1;
                    font-style: italic;
                    letter-spacing: -0.02em;
                }

                .bento-body {
                    font-size: clamp(1.2rem, 2vw, 1.6rem);
                    color: var(--text-secondary);
                    max-width: 650px;
                    font-weight: 300;
                    line-height: 1.4;
                }

                /* SECURITY SECTION */
                .vg-security-section {
                    padding: 200px 10%;
                }

                .security-container {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 120px;
                    align-items: center;
                }

                @media (max-width: 1100px) {
                    .security-container { grid-template-columns: 1fr; gap: 80px; }
                }

                .security-box {
                    background: #010101;
                    border: 5px solid var(--gold);
                    padding: 80px;
                    box-shadow: 40px 40px 0px var(--gold-deep);
                    position: relative;
                }

                .security-scan {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 4px;
                    background: var(--emerald);
                    box-shadow: 0 0 40px var(--emerald);
                    animation: scan 6s linear infinite;
                    opacity: 0.6;
                }

                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }

                /* CTA BUTTON */
                .luxury-cta {
                    display: inline-block;
                    padding: 2rem 6rem;
                    background: white;
                    color: #000;
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 900;
                    font-size: 1.4rem;
                    letter-spacing: 0.5em;
                    text-transform: uppercase;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                }

                .luxury-cta:hover {
                    background: var(--gold);
                    color: white;
                    transform: scale(1.05);
                    box-shadow: 0 40px 80px -15px var(--gold-glow);
                }

                .luxury-cta::after {
                    content: '';
                    position: absolute;
                    inset: -15px;
                    border: 1px solid rgba(255,255,255,0.2);
                    transition: all 0.5s;
                }

                .luxury-cta:hover::after {
                    inset: -30px;
                    opacity: 0;
                }

                /* FINAL SECTION */
                .vg-final {
                    padding: 250px 10%;
                    text-align: center;
                    background: radial-gradient(circle at center bottom, rgba(197, 160, 89, 0.15) 0%, transparent 70%);
                }
            `}</style>

            {/* HERO */}
            <section className="vg-hero">
                <div className="vg-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="vg-tag">{content.hero.tag}</span>
                        <h1 className="vg-title serif">
                            {language === "es" ? "Presenciá la" : "Witness the"}
                            <span className="gold-accent uppercase">Carnicería.</span>
                            {/* We remove potential duplicate titles here */}
                            {language === "es" ? "Tu voz es la ley." : "Your pulse is power."}
                        </h1>
                        <p className="vg-subtitle">{content.hero.subtitle}</p>
                        <Link href="/apply" className="luxury-cta">
                            {content.hero.cta}
                        </Link>
                    </motion.div>
                </div>

                <div className="vg-hero-visual">
                    <svg viewBox="0 0 500 500" className="w-full h-full text-[var(--gold)]">
                        <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.1" />
                        <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="20 20" opacity="0.2" />
                        <motion.circle 
                            animate={{ r: [140, 160, 140], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="0.5"
                        />
                        <motion.path 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                            d="M 250,250 m -200,0 a 200,200 0 1,0 400,0 a 200,200 0 1,0 -400,0"
                            stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3"
                        />
                        {[...Array(12)].map((_, i) => (
                            <line 
                                key={i}
                                x1="250" y1="250"
                                x2={250 + Math.cos(i * 30 * (Math.PI / 180)) * 250}
                                y2={250 + Math.sin(i * 30 * (Math.PI / 180)) * 250}
                                stroke="currentColor" strokeWidth="0.2" opacity="0.1"
                            />
                        ))}
                    </svg>
                </div>
            </section>

            {/* BENTO GRID PROTOCOL */}
            <section className="vg-protocol-section">
                <div className="vg-section-header">
                    <h2 className="serif italic" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em' }}>
                        {content.steps.label}
                    </h2>
                    <div style={{ height: '4px', width: '150px', background: 'var(--gold)', marginTop: '20px', boxShadow: '0 0 30px var(--gold-glow)' }}></div>
                </div>

                <div className="vg-protocol-grid">
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 80 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bento-card"
                    >
                        <span className="bento-num">01</span>
                        <h3 className="serif bento-title uppercase">{content.steps.items[0].title}</h3>
                        <p className="bento-body">{content.steps.items[0].body}</p>
                    </motion.div>

                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 80 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        className="bento-card"
                    >
                        <span className="bento-num">02</span>
                        <h3 className="serif bento-title uppercase">{content.steps.items[1].title}</h3>
                        <p className="bento-body">{content.steps.items[1].body}</p>
                    </motion.div>

                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 80 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.4 }}
                        className="bento-card full"
                    >
                        <span className="bento-num">03</span>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '4rem' }}>
                            <div style={{ flex: '1 1 500px' }}>
                                <h3 className="serif bento-title uppercase" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                                    {content.steps.items[2].title}
                                </h3>
                                <p className="bento-body" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', maxWidth: 'none' }}>
                                    {content.steps.items[2].body}
                                </p>
                            </div>
                            <div className="mono font-bold" style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.8em', opacity: 0.8 }}>
                                VERDICT PROTOCOL
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECURITY ARTIFACT */}
            <section className="vg-security-section">
                <div className="security-container">
                    <motion.div 
                        whileInView={{ opacity: 1, x: 0 }} 
                        initial={{ opacity: 0, x: -80 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="security-box"
                    >
                        <div className="security-scan"></div>
                        <h3 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, fontStyle: 'italic', marginBottom: '3rem', textTransform: 'uppercase' }}>
                            {content.security.title}
                        </h3>
                        <p className="mono font-bold" style={{ fontSize: '1.4rem', color: 'var(--emerald)', opacity: 0.9, lineHeight: 1.4 }}>
                            {content.security.body}
                        </p>
                        <div style={{ marginTop: '5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            {['ENCRYPTION: AES-256', 'LATENCY: 40MS', 'STATUS: VERIFIED ELITE', 'AUTH: DYNAMIC-QR'].map(tag => (
                                <span key={tag} className="mono" style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 700 }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <div style={{ paddingLeft: '40px' }}>
                        <h4 className="serif italic" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3rem' }}>
                            {language === "es" ? "¿Por qué importa?" : "Why it matters?"}
                        </h4>
                        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7 }}>
                            {language === "es" 
                                ? "El Coliseo no admite títeres. Cada voto capturado mediante el artefacto QR es una prueba de vida, una firma digital de que estuviste ahí, presenciando la gloria o la caída de los gladiadores."
                                : "The Colosseum accepts no puppets. Every vote captured through the QR artifact is proof of life, a digital signature that you were there, witnessing the glory or the fall of the gladiators."
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="vg-final">
                <motion.div
                    whileInView={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="serif italic" style={{ fontSize: 'clamp(3rem, 9vw, 120px)', fontWeight: 900, marginBottom: '6rem', letterSpacing: '-0.06em' }}>
                        {language === "es" ? "¿VAS A REINAR O A MIRAR?" : "REIGN OR WATCH?"}
                    </h2>
                    <Link href="/apply" className="luxury-cta">
                        {content.hero.cta}
                    </Link>
                    <div style={{ marginTop: '5rem' }} className="mono text-[11px] text-white/20 tracking-[1.2em] uppercase font-bold">
                        NO SECOND CHANCES
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
