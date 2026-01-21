"use client";

import { useLanguage } from "../../components/LanguageProvider";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function VotingGuide() {
    const { t, language } = useLanguage();
    const content = t("votingGuide");
    const containerRef = useRef(null);

    // Golden Ratio constant
    const phi = 1.618;

    if (!content) return null;

    return (
        <main ref={containerRef} className="vg-luxury-page">
            <style jsx>{`
                .vg-luxury-page {
                    --obsidian: #050505;
                    --obsidian-alt: #0a0a0a;
                    --gold: #C5A059;
                    --gold-deep: #8E7037;
                    --gold-glow: rgba(197, 160, 89, 0.3);
                    --emerald: #00FF85;
                    --emerald-dark: #004d28;
                    --text-main: #ffffff;
                    --text-secondary: rgba(255, 255, 255, 0.6);
                    --glass: rgba(255, 255, 255, 0.03);
                    --glass-border: rgba(255, 255, 255, 0.08);
                    
                    background-color: var(--obsidian);
                    color: var(--text-main);
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                    line-height: 1.618;
                }

                .serif { font-family: 'Playfair Display', serif; }
                .mono { font-family: 'JetBrains Mono', monospace; }

                /* LUXURY HERO */
                .vg-hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 0 8%;
                    overflow: hidden;
                }

                .vg-hero-content {
                    flex: 1;
                    max-width: 700px;
                    z-index: 10;
                    padding-top: 100px;
                }

                .vg-tag {
                    font-family: 'JetBrains Mono', monospace;
                    color: var(--gold);
                    letter-spacing: 0.5em;
                    font-size: 12px;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 2rem;
                    font-weight: 700;
                }

                .vg-title {
                    font-size: clamp(3.5rem, 8vw, 110px);
                    line-height: 0.95;
                    letter-spacing: -0.04em;
                    margin-bottom: 2.5rem;
                }

                .vg-title .gold-accent {
                    color: var(--gold);
                    font-style: italic;
                    display: block;
                    text-shadow: 0 0 30px var(--gold-glow);
                }

                .vg-subtitle {
                    font-size: 20px;
                    color: var(--text-secondary);
                    max-width: 500px;
                    margin-bottom: 3.5rem;
                    font-weight: 300;
                }

                /* Visual Centerpiece */
                .vg-hero-visual {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    opacity: 0.7;
                }

                .colosseum-svg {
                    width: 120%;
                    height: auto;
                    color: var(--gold);
                    filter: drop-shadow(0 0 40px var(--gold-glow));
                }

                /* BENTO GRID PROTOCOL */
                .vg-protocol-section {
                    padding: 160px 8%;
                    background: var(--obsidian-alt);
                    border-top: 1px solid var(--glass-border);
                }

                .vg-section-header {
                    margin-bottom: 80px;
                }

                .vg-protocol-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 32px;
                }

                .bento-card {
                    background: var(--glass);
                    border: 1px solid var(--glass-border);
                    padding: 3.5rem;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .bento-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--gold);
                    transform: translateY(-8px);
                    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8);
                }

                .bento-card.wide { grid-column: span 8; }
                .bento-card.tall { grid-column: span 4; }
                .bento-card.full { grid-column: span 12; }

                @media (max-width: 1024px) {
                    .bento-card.wide, .bento-card.tall, .bento-card.full { grid-column: span 12; }
                }

                .bento-num {
                    font-size: 15rem;
                    position: absolute;
                    top: -40px;
                    right: -20px;
                    color: white;
                    opacity: 0.02;
                    font-weight: 900;
                    transition: opacity 0.5s;
                }

                .bento-card:hover .bento-num {
                    opacity: 0.05;
                    color: var(--gold);
                }

                .bento-title {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                    color: var(--gold);
                }

                .bento-body {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    max-width: 480px;
                }

                /* SECURITY SECTION */
                .vg-security-section {
                    padding: 160px 8%;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 100px;
                    align-items: center;
                }

                @media (max-width: 1024px) {
                    .vg-security-section { grid-template-columns: 1fr; gap: 60px; }
                }

                .security-box {
                    background: black;
                    border: 4px solid var(--gold);
                    padding: 4rem;
                    box-shadow: 24px 24px 0px var(--gold-deep);
                    position: relative;
                }

                .security-scanline {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--emerald);
                    box-shadow: 0 0 20px var(--emerald);
                    animation: scan 4s linear infinite;
                    opacity: 0.3;
                }

                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }

                /* CTA SECTION */
                .vg-cta-section {
                    padding: 200px 8%;
                    text-align: center;
                    background: radial-gradient(circle at center bottom, rgba(197, 160, 89, 0.1) 0%, transparent 70%);
                }

                .luxury-button {
                    display: inline-block;
                    padding: 1.5rem 4rem;
                    background: white;
                    color: var(--obsidian);
                    text-decoration: none;
                    font-weight: 900;
                    font-family: 'JetBrains Mono', monospace;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    font-size: 1.2rem;
                    transition: all 0.4s;
                    position: relative;
                }

                .luxury-button:hover {
                    background: var(--gold);
                    color: white;
                    transform: scale(1.05);
                    box-shadow: 0 20px 40px var(--gold-glow);
                }

                .luxury-button::after {
                    content: '';
                    position: absolute;
                    inset: -10px;
                    border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.4s;
                }

                .luxury-button:hover::after {
                    inset: -20px;
                    opacity: 0;
                }
            `}</style>

            {/* HERO */}
            <section className="vg-hero">
                <div className="vg-hero-content">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="vg-tag">{content.hero.tag}</span>
                        <h1 className="vg-title serif">
                            {language === "es" ? "Presenciá la" : "Witness the"}
                            <span className="gold-accent">CARNICERÍA</span>
                            {content.hero.title}
                        </h1>
                        <p className="vg-subtitle">{content.hero.subtitle}</p>
                        <Link href="/" className="luxury-button">
                            {content.hero.cta}
                        </Link>
                    </motion.div>
                </div>

                <div className="vg-hero-visual">
                    <svg className="colosseum-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2"/>
                        <circle cx="250" cy="250" r="150" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" opacity="0.3"/>
                        <path d="M250 50 L250 450 M50 250 L450 250" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                        <motion.path 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            d="M250 100 A150 150 0 0 1 400 250" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        />
                        <rect x="245" y="245" width="10" height="10" fill="currentColor"/>
                        {[...Array(8)].map((_, i) => (
                            <line 
                                key={i}
                                x1="250" y1="250" 
                                x2={250 + Math.cos(i * 45 * Math.PI / 180) * 220} 
                                y2={250 + Math.sin(i * 45 * Math.PI / 180) * 220} 
                                stroke="currentColor" 
                                strokeWidth="0.2"
                                opacity="0.3"
                            />
                        ))}
                    </svg>
                </div>
            </section>

            {/* BENTO GRID PROTOCOL */}
            <section className="vg-protocol-section">
                <div className="vg-section-header">
                    <h2 className="serif" style={{ fontSize: '4rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                        {content.steps.label}
                    </h2>
                    <div style={{ height: '2px', width: '100px', background: 'var(--gold)' }}></div>
                </div>

                <div className="vg-protocol-grid">
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 40 }}
                        viewport={{ once: true }}
                        className="bento-card wide"
                    >
                        <span className="serif bento-num">01</span>
                        <h3 className="serif bento-title italic">{content.steps.items[0].title}</h3>
                        <p className="bento-body">{content.steps.items[0].body}</p>
                    </motion.div>

                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 40 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bento-card tall"
                    >
                        <span className="serif bento-num">02</span>
                        <h3 className="serif bento-title italic">{content.steps.items[1].title}</h3>
                        <p className="bento-body">{content.steps.items[1].body}</p>
                    </motion.div>

                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 40 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bento-card full"
                    >
                        <span className="serif bento-num">03</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                            <div>
                                <h3 className="serif bento-title italic" style={{ fontSize: '3.5rem' }}>{content.steps.items[2].title}</h3>
                                <p className="bento-body" style={{ fontSize: '1.5rem', maxWidth: '600px' }}>{content.steps.items[2].body}</p>
                            </div>
                            <div className="mono" style={{ fontSize: '10px', color: 'var(--gold)', opacity: 0.5, letterSpacing: '0.4em' }}>
                                FINAL VERDICT PROTOCOL
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECURITY BOX */}
            <section className="vg-security-section">
                <motion.div 
                    whileInView={{ opacity: 1, x: 0 }} 
                    initial={{ opacity: 0, x: -50 }}
                    viewport={{ once: true }}
                    className="security-box"
                >
                    <div className="security-scanline"></div>
                    <h3 className="serif" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', fontStyle: 'italic', textTransform: 'uppercase' }}>
                        {content.security.title}
                    </h3>
                    <p className="mono" style={{ fontSize: '1.2rem', opacity: 0.7, lineHeight: 1.4 }}>
                        {content.security.body}
                    </p>
                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {['ENCRYPTION: ACTIVE', 'LATENCY: 40MS', 'AUTH: DYNAMIC'].map(tag => (
                            <span key={tag} className="mono" style={{ fontSize: '9px', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '2px' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <div className="security-info">
                    <h4 className="serif" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                        {language === "es" ? "Por qué nos importa?" : "Why it matters?"}
                    </h4>
                    <p className="body-phi" style={{ opacity: 0.5 }}>
                        {language === "es" 
                            ? "El caos es bienvenido, el fraude no. Nuestros artefactos digitales aseguran que cada voto sea el reflejo de un alma presente en el ring."
                            : "Chaos is welcome, fraud is not. Our digital artifacts ensure every vote reflects a soul present at the ring."
                        }
                    </p>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="vg-cta-section">
                <motion.div
                    whileInView={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="serif" style={{ fontSize: 'clamp(3rem, 7vw, 90px)', fontStyle: 'italic', marginBottom: '4rem' }}>
                        {language === "es" ? "¿VAS A REINAR O A MIRAR?" : "REIGN OR WATCH?"}
                    </h2>
                    <Link href="/" className="luxury-button">
                        {content.hero.cta}
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
