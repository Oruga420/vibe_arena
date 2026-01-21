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
                    --text-secondary: rgba(255, 255, 255, 0.6);
                    --glass: rgba(255, 255, 255, 0.02);
                    --glass-border: rgba(255, 255, 255, 0.1);
                    
                    background-color: var(--obsidian);
                    color: var(--text-main);
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                    line-height: 1.618;
                    overflow-x: hidden;
                }

                .serif { font-family: 'Playfair Display', serif; }
                .mono { font-family: 'JetBrains Mono', monospace; }

                /* LUXURY HERO */
                .vg-hero {
                    position: relative;
                    min-height: 110vh;
                    display: flex;
                    align-items: center;
                    padding: 0 8%;
                    overflow: hidden;
                    background: radial-gradient(circle at 70% 30%, rgba(197, 160, 89, 0.03) 0%, transparent 60%);
                }

                .vg-hero-content {
                    flex: 1;
                    max-width: 800px;
                    z-index: 10;
                    padding-bottom: 50px;
                }

                .vg-tag {
                    font-family: 'JetBrains Mono', monospace;
                    color: var(--gold);
                    letter-spacing: 0.6em;
                    font-size: 11px;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 2.5rem;
                    font-weight: 800;
                }

                .vg-title {
                    font-size: clamp(3.5rem, 9vw, 120px);
                    line-height: 0.9;
                    letter-spacing: -0.05em;
                    margin-bottom: 3rem;
                    font-weight: 900;
                }

                .vg-title .gold-accent {
                    color: var(--gold);
                    font-style: italic;
                    display: block;
                    text-shadow: 0 0 40px var(--gold-glow);
                    margin-top: 0.5rem;
                }

                .vg-subtitle {
                    font-size: clamp(18px, 2vw, 22px);
                    color: var(--text-secondary);
                    max-width: 550px;
                    margin-bottom: 4rem;
                    font-weight: 300;
                    line-height: 1.6;
                }

                /* Visual Centerpiece */
                .vg-hero-visual {
                    position: absolute;
                    right: -10%;
                    top: 0;
                    width: 60%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    opacity: 0.5;
                }

                .colosseum-svg {
                    width: 100%;
                    height: auto;
                    color: var(--gold);
                    filter: drop-shadow(0 0 50px var(--gold-glow));
                }

                /* BENTO GRID PROTOCOL */
                .vg-protocol-section {
                    padding: 180px 8%;
                    background: var(--obsidian-alt);
                    border-top: 1px solid var(--glass-border);
                }

                .vg-section-header {
                    margin-bottom: 120px;
                }

                .vg-protocol-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-auto-rows: minmax(450px, auto);
                    gap: 32px;
                }

                .bento-card {
                    background: var(--glass);
                    border: 1px solid var(--glass-border);
                    padding: 4.5rem;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .bento-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: var(--gold);
                    transform: translateY(-12px);
                    box-shadow: 0 50px 100px -20px rgba(0,0,0,0.9);
                }

                .bento-card.wide { grid-column: span 8; }
                .bento-card.tall { grid-column: span 4; }
                .bento-card.full { grid-column: span 12; min-height: 400px; padding: 5rem 6rem; }

                @media (max-width: 1100px) {
                    .bento-card.wide, .bento-card.tall, .bento-card.full { 
                        grid-column: span 12; 
                        padding: 3.5rem;
                        min-height: 350px;
                    }
                    .vg-protocol-grid { gap: 24px; }
                }

                .bento-num {
                    font-size: 15rem;
                    position: absolute;
                    top: -60px;
                    right: -30px;
                    color: white;
                    opacity: 0.015;
                    font-weight: 900;
                    line-height: 1;
                    transition: opacity 0.5s, color 0.5s;
                }

                .bento-card:hover .bento-num {
                    opacity: 0.04;
                    color: var(--gold);
                }

                .bento-title {
                    font-size: clamp(2rem, 4vw, 3.2rem);
                    margin-bottom: 2rem;
                    color: var(--gold);
                    font-weight: 900;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }

                .bento-body {
                    font-size: clamp(1.1rem, 1.5vw, 1.4rem);
                    color: var(--text-secondary);
                    max-width: 520px;
                    font-weight: 300;
                }

                /* SECURITY SECTION */
                .vg-security-section {
                    padding: 200px 8%;
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 120px;
                    align-items: center;
                }

                @media (max-width: 1100px) {
                    .vg-security-section { grid-template-columns: 1fr; gap: 80px; }
                }

                .security-box {
                    background: #020202;
                    border: 4px solid var(--gold);
                    padding: 5rem;
                    box-shadow: 32px 32px 0px var(--gold-deep);
                    position: relative;
                }

                @media (max-width: 640px) {
                    .security-box { padding: 3rem; box-shadow: 16px 16px 0px var(--gold-deep); }
                }

                .security-scanline {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: var(--emerald);
                    box-shadow: 0 0 30px var(--emerald);
                    animation: scan 5s linear infinite;
                    opacity: 0.4;
                }

                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }

                /* CTA SECTION */
                .vg-cta-section {
                    padding: 250px 8%;
                    text-align: center;
                    background: radial-gradient(circle at center 100%, rgba(197, 160, 89, 0.12) 0%, transparent 60%);
                }

                .luxury-button {
                    display: inline-block;
                    padding: 1.8rem 5rem;
                    background: white;
                    color: var(--obsidian);
                    text-decoration: none;
                    font-weight: 900;
                    font-family: 'JetBrains Mono', monospace;
                    text-transform: uppercase;
                    letter-spacing: 0.5em;
                    font-size: 1.3rem;
                    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                    position: relative;
                }

                .luxury-button:hover {
                    background: var(--gold);
                    color: white;
                    transform: scale(1.08);
                    box-shadow: 0 30px 60px -10px var(--gold-glow);
                }

                .luxury-button::after {
                    content: '';
                    position: absolute;
                    inset: -12px;
                    border: 1px solid rgba(255,255,255,0.15);
                    transition: all 0.5s;
                }

                .luxury-button:hover::after {
                    inset: -25px;
                    opacity: 0;
                }
            `}</style>

            {/* HERO */}
            <section className="vg-hero">
                <div className="vg-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <span className="vg-tag">{content.hero.tag}</span>
                        <h1 className="vg-title serif">
                            {language === "es" ? "Presenciá la" : "Witness the"}
                            <span className="gold-accent uppercase">Carnicería.</span>
                            {content.hero.title}
                        </h1>
                        <p className="vg-subtitle">{content.hero.subtitle}</p>
                        <Link href="/apply" className="luxury-button">
                            {content.hero.cta}
                        </Link>
                    </motion.div>
                </div>

                <div className="vg-hero-visual">
                    <svg className="colosseum-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.1"/>
                        <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="12 12" opacity="0.2"/>
                        <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                        <motion.path 
                            animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            d="M250 80 A170 170 0 0 1 420 250" 
                            stroke="currentColor" 
                            strokeWidth="3"
                        />
                        <rect x="246" y="246" width="8" height="8" fill="currentColor"/>
                        {[...Array(12)].map((_, i) => (
                            <line 
                                key={i}
                                x1="250" y1="250" 
                                x2={250 + Math.cos(i * 30 * Math.PI / 180) * 250} 
                                y2={250 + Math.sin(i * 30 * Math.PI / 180) * 250} 
                                stroke="currentColor" 
                                strokeWidth="0.2"
                                opacity="0.15"
                            />
                        ))}
                    </svg>
                </div>
            </section>

            {/* BENTO GRID PROTOCOL */}
            <section className="vg-protocol-section">
                <div className="vg-section-header">
                    <h2 className="serif italic" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
                        {content.steps.label}
                    </h2>
                    <div style={{ height: '3px', width: '120px', background: 'var(--gold)', boxShadow: '0 0 20px var(--gold-glow)' }}></div>
                </div>

                <div className="vg-protocol-grid">
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 60 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bento-card wide"
                    >
                        <span className="serif bento-num">01</span>
                        <h3 className="serif bento-title italic uppercase">{content.steps.items[0].title}</h3>
                        <p className="bento-body">{content.steps.items[0].body}</p>
                    </motion.div>

                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 60 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        className="bento-card tall"
                    >
                        <span className="serif bento-num">02</span>
                        <h3 className="serif bento-title italic uppercase">{content.steps.items[1].title}</h3>
                        <p className="bento-body">{content.steps.items[1].body}</p>
                    </motion.div>

                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }} 
                        initial={{ opacity: 0, y: 60 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.4 }}
                        className="bento-card full"
                    >
                        <span className="serif bento-num">03</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '3rem', width: '100%' }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h3 className="serif bento-title italic uppercase" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem' }}>
                                    {content.steps.items[2].title}
                                </h3>
                                <p className="bento-body" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', maxWidth: '700px', lineHeight: 1.4 }}>
                                    {content.steps.items[2].body}
                                </p>
                            </div>
                            <div className="mono" style={{ fontSize: '11px', color: 'var(--gold)', opacity: 0.6, letterSpacing: '0.6em', fontWeight: 800 }}>
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
                    initial={{ opacity: 0, x: -70 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="security-box"
                >
                    <div className="security-scanline"></div>
                    <h3 className="serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, marginBottom: '2.5rem', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.04em' }}>
                        {content.security.title}
                    </h3>
                    <p className="mono font-bold" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.4rem)', opacity: 0.8, lineHeight: 1.5, color: 'var(--emerald)' }}>
                        {content.security.body}
                    </p>
                    <div style={{ marginTop: '4rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {['ENCRYPTION: AES-256', 'LATENCY: 40MS', 'AUTH: DYNAMIC-QR', 'STATUS: SECURE'].map(tag => (
                            <span key={tag} className="mono" style={{ fontSize: '10px', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '2px', background: 'rgba(255,255,255,0.02)', fontWeight: 700 }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <div className="security-info" style={{ paddingLeft: '20px' }}>
                    <h4 className="serif italic" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '2.5rem', fontWeight: 800 }}>
                        {language === "es" ? "¿Por qué nos importa?" : "Why it matters?"}
                    </h4>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 300, maxWidth: '450px', lineHeight: 1.8 }}>
                        {language === "es" 
                            ? "El caos es bienvenido, el fraude no. Nuestros artefactos digitales aseguran que cada voto sea el reflejo de un alma presente en el ring. Sin bots, sin intermediarios, solo la verdad del código."
                            : "Chaos is welcome, fraud is not. Our digital artifacts ensure every vote reflects a soul present at the ring. No bots, no middlemen, just the cold truth of the code."
                        }
                    </p>
                    <div style={{ marginTop: '3rem', width: '60px', height: '2px', background: 'var(--gold)' }}></div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="vg-cta-section">
                <motion.div
                    whileInView={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0.92, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                    <h2 className="serif italic" style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)', fontWeight: 900, marginBottom: '5rem', letterSpacing: '-0.05em' }}>
                        {language === "es" ? "¿VAS A REINAR O A MIRAR?" : "REIGN OR WATCH?"}
                    </h2>
                    <Link href="/apply" className="luxury-button">
                        {content.hero.cta}
                    </Link>
                    <div style={{ marginTop: '3rem' }} className="mono text-[10px] text-white/20 tracking-[1em] uppercase">
                        No Second Chances
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
