"use client";

import { useLanguage } from "../../components/LanguageProvider";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function VotingGuide() {
    const { t } = useLanguage();
    const content = t("votingGuide");
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!content) return null;

    return (
        <main ref={containerRef} className="colosseum-premium-page">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;700;800&family=JetBrains+Mono:wght@300;500&display=swap');

                :root {
                    --obsidian: #050505;
                    --gold: #C5A059;
                    --burnished-gold: #8E7037;
                    --gold-glow: rgba(197, 160, 89, 0.4);
                    --emerald-neon: #00FF85;
                    --emerald-glow: rgba(0, 255, 133, 0.2);
                    --glass-bg: rgba(255, 255, 255, 0.02);
                    --glass-border: rgba(255, 255, 255, 0.08);
                    --phi: 1.618;
                }

                .colosseum-premium-page {
                    background-color: var(--obsidian);
                    color: white;
                    font-family: 'Inter', sans-serif;
                    overflow-x: hidden;
                    selection: background: var(--gold);
                    selection: color: var(--obsidian);
                }

                .serif { font-family: 'Playfair Display', serif; }
                .mono { font-family: 'JetBrains Mono', monospace; }

                /* Golden Ratio Typography */
                .h1-phi { font-size: clamp(4rem, 10vw, 123px); line-height: 0.9; }
                .h2-phi { font-size: clamp(2.5rem, 6vw, 76px); line-height: 1; }
                .h3-phi { font-size: clamp(1.8rem, 4vw, 47px); line-height: 1.1; }
                .body-phi { font-size: 18px; line-height: 1.618; }

                .luxury-shadow {
                    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.5);
                }

                .gold-gradient-text {
                    background: linear-gradient(135deg, var(--gold) 0%, var(--burnished-gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .colosseum-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 32px;
                }

                @media (max-width: 1024px) {
                    .colosseum-grid { display: block; }
                    .colosseum-grid > div { margin-bottom: 32px; }
                }

                .glow-border {
                    position: relative;
                }
                .glow-border::before {
                    content: '';
                    position: absolute;
                    inset: -1px;
                    background: linear-gradient(var(--glass-border), transparent, var(--glass-border));
                    z-index: -1;
                    transition: opacity 0.5s;
                }
                .glow-border:hover::before {
                    background: linear-gradient(var(--gold), transparent, var(--emerald-neon));
                }
            `}</style>

            {/* HERO SECTION: THE SEDUCTION */}
            <section className="relative min-h-[110vh] flex items-center px-[8%] overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.05)_0%,transparent_50%)]">
                {/* Background Artifact (Abstract Colosseum) */}
                <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[50%] h-[80%] z-0 pointer-events-none opacity-60">
                    <svg viewBox="0 0 400 600" className="w-full h-full">
                        <defs>
                            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'var(--gold)', stopOpacity: 0.2 }} />
                                <stop offset="100%" style={{ stopColor: 'var(--obsidian)', stopOpacity: 0 }} />
                            </linearGradient>
                        </defs>
                        <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M 50,100 Q 200,50 350,100 L 350,500 Q 200,550 50,500 Z" 
                            fill="none" 
                            stroke="url(#goldGrad)" 
                            strokeWidth="0.5"
                        />
                        <motion.circle 
                            animate={{ r: [180, 200, 180], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            cx="200" cy="300" r="180" fill="none" stroke="var(--gold)" strokeWidth="0.2" 
                        />
                        {[...Array(12)].map((_, i) => (
                            <motion.line 
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                                x1="200" y1="300" 
                                x2={200 + Math.cos(i * 30 * Math.PI / 180) * 300} 
                                y2={300 + Math.sin(i * 30 * Math.PI / 180) * 300} 
                                stroke="var(--gold)" 
                                strokeWidth="0.5" 
                            />
                        ))}
                    </svg>
                </div>

                <motion.div 
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="relative z-10 max-w-4xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <div className="w-12 h-[1px] bg-var(--gold)"></div>
                        <span className="mono text-[var(--gold)] tracking-[0.6em] text-[10px] uppercase font-bold luxury-text-glow">
                            {content.hero.tag}
                        </span>
                    </motion.div>

                    <h1 className="serif h1-phi font-black tracking-tighter italic mb-8">
                        {content.hero.title.split('.').map((part, i) => (
                            <span key={i} className={`block ${i === 1 ? 'gold-gradient-text not-italic' : 'text-white'}`}>
                                {part}{i === 0 ? '.' : ''}
                            </span>
                        ))}
                    </h1>

                    <p className="body-phi text-white/50 max-w-xl font-light mb-16 leading-[1.8] tracking-tight">
                        {content.hero.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-10">
                        <Link href="/" className="group relative px-16 py-8 bg-transparent overflow-hidden">
                            <div className="absolute inset-0 bg-var(--gold) translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                            <div className="absolute inset-0 border border-var(--gold)/30 group-hover:border-var(--gold) transition-colors duration-500"></div>
                            <span className="relative z-10 mono text-sm font-black tracking-[0.4em] text-var(--gold) group-hover:text-var(--obsidian) transition-colors">
                                {content.hero.cta}
                            </span>
                        </Link>

                        <div className="flex flex-col gap-2">
                            <span className="mono text-[9px] text-white/20 tracking-widest italic">ELITE SPECTATOR ACCESS</span>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-1 h-3 bg-var(--gold)/20 rounded-full overflow-hidden">
                                        <motion.div 
                                            animate={{ height: ["0%", "100%", "0%"] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                            className="w-full bg-var(--gold)"
                                        ></motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Mouse interaction glow */}
                <div 
                    className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(197, 160, 89, 0.03) 0%, transparent 40%)`
                    }}
                ></div>
            </section>

            {/* BENTO GRID: HOW IT WORKS (THE PROTOCOL) */}
            <section className="px-[8%] py-48 bg-[#080808]">
                <div className="max-w-[1400px] mx-auto space-y-32">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                        <div className="space-y-6">
                            <h2 className="serif h2-phi italic tracking-tighter">
                                {content.steps.label}
                            </h2>
                            <div className="w-32 h-1 bg-gradient-to-r from-var(--gold) to-transparent"></div>
                        </div>
                        <p className="body-phi text-white/30 max-w-sm italic">
                            "The code speaks, but the crowd decides who remains standing."
                        </p>
                    </div>

                    <div className="colosseum-grid">
                        {/* 01 Card - The Focus */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="col-span-12 lg:col-span-8 group relative bg-white/[0.02] border border-white/5 p-16 overflow-hidden h-[500px] flex flex-col justify-end transition-all hover:bg-white/[0.04] hover:border-var(--gold)/30"
                        >
                            <span className="serif text-[200px] font-black text-white/[0.02] absolute top-[-50px] left-[-30px] group-hover:text-var(--gold)/5 transition-colors">01</span>
                            <div className="relative z-10 space-y-6">
                                <h3 className="serif h3-phi gold-gradient-text tracking-tighter uppercase italic">{content.steps.items[0].title}</h3>
                                <p className="text-2xl text-white/40 font-light leading-snug max-w-xl">{content.steps.items[0].body}</p>
                                <div className="pt-8 mono text-[10px] text-var(--emerald-neon) tracking-[0.5em] flex items-center gap-4">
                                    <span className="w-2 h-2 bg-var(--emerald-neon) rounded-full shadow-[0_0_10px_var(--emerald-neon)]"></span>
                                    LIVE DECRYPTION ACTIVE
                                </div>
                            </div>
                        </motion.div>

                        {/* 02 Card - The Artifact */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="col-span-12 lg:col-span-4 group relative bg-white/[0.02] border border-white/5 p-12 overflow-hidden h-[500px] flex flex-col justify-between hover:border-var(--emerald-neon)/30"
                        >
                            <div className="space-y-4">
                                <span className="mono text-[10px] text-white/20 tracking-widest uppercase">The Artifact</span>
                                <h3 className="serif text-4xl font-black italic tracking-tighter uppercase">{content.steps.items[1].title}</h3>
                            </div>
                            
                            {/* Visual Pulse for QR sync */}
                            <div className="w-full aspect-square relative flex items-center justify-center">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border border-dashed border-white/10 rounded-full"
                                ></motion.div>
                                <div className="w-16 h-16 bg-var(--gold)/10 border border-var(--gold) flex items-center justify-center p-4">
                                    <div className="w-full h-full bg-var(--gold) animate-pulse"></div>
                                </div>
                            </div>

                            <p className="text-lg text-white/50 leading-relaxed font-light">{content.steps.items[1].body}</p>
                        </motion.div>

                        {/* 03 Card - The Decision */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="col-span-12 group relative bg-var(--glass-bg) border border-white/5 p-16 md:p-24 overflow-hidden min-h-[400px] hover:bg-gradient-to-br hover:from-white/[0.03] hover:to-transparent"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-20">
                                <div className="order-2 md:order-1 space-y-8 flex-1">
                                    <h3 className="serif h2-phi italic tracking-tighter gold-gradient-text uppercase">{content.steps.items[2].title}</h3>
                                    <p className="text-3xl text-white/60 font-light leading-none">{content.steps.items[2].body}</p>
                                    <div className="h-[1px] w-full bg-white/10"></div>
                                    <div className="flex gap-8 mono text-[10px] text-white/30 uppercase tracking-[0.4em]">
                                        <span>Consolidate Victory</span>
                                        <span>Forge Legends</span>
                                    </div>
                                </div>
                                <div className="order-1 md:order-2 shrink-0 relative">
                                    <span className="serif text-[180px] font-black leading-none text-white/[0.03] select-none">03</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECURITY ARTIFACT: THE VAULT */}
            <section className="px-[8%] py-60 border-t border-white/5">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-40 items-center">
                        <motion.div 
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="relative"
                        >
                            {/* Neobrutalist Security Box */}
                            <div className="bg-black border-[4px] border-var(--gold) p-10 md:p-20 luxury-shadow relative">
                                <div className="absolute top-[-20px] left-10 bg-var(--gold) px-6 py-2 mono text-[10px] text-var(--obsidian) font-black tracking-widest uppercase">
                                    SECURE PROTOCOL v2.4
                                </div>
                                <div className="space-y-10">
                                    <h3 className="serif text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                                        {content.security.title}
                                    </h3>
                                    <p className="mono text-xl text-white/40 leading-tight">
                                        {content.security.body}
                                    </p>
                                    <div className="grid grid-cols-2 gap-px bg-white/10">
                                        {[
                                            { t: "BOT PREVENTION", v: "100%" },
                                            { t: "TOKEN ROTATION", v: "10 SEC" },
                                            { t: "LIVE SYNC", v: "VERIFIED" },
                                            { t: "INTEGRITY", v: "AES-256" }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-black p-6 space-y-2">
                                                <span className="mono text-[8px] text-white/20 tracking-widest block">{stat.t}</span>
                                                <span className="mono text-xs text-var(--gold) font-black">{stat.v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Scanline animation */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                                    <motion.div 
                                        animate={{ y: ["-100%", "500%"] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="w-full h-1 bg-var(--emerald-neon) shadow-[0_0_20px_var(--emerald-neon)]"
                                    ></motion.div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-12">
                            <h4 className="serif text-5xl md:text-7xl italic leading-[0.9] tracking-tighter uppercase">
                                {t("es") ? "La \u00e9lite vota aqu\u00ed." : "The elite vote here."}
                            </h4>
                            <p className="body-phi text-white/40 font-light">
                                {t("es")
                                    ? "Nuestro algoritmo de pulso din\u00e1mico garantiza que solo aquellos que est\u00e1n en el momento justo, en el lugar justo, tengan poder de decisi\u00f3n. Es el filtro definitivo contra la mediocridad automatizada."
                                    : "Our dynamic pulse algorithm guarantees that only those in the right moment, at the right place, have decision-making power. It is the ultimate filter against automated mediocrity."
                                }
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-[1px] bg-var(--gold)"></div>
                                <span className="mono text-[10px] text-var(--gold) tracking-[0.5em] uppercase">Forging Legends</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA: THE CALL TO ARMS */}
            <section className="relative py-80 px-[8%] text-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_100%,rgba(197,160,89,0.1)_0%,transparent_60%)]"></div>
                
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative z-10 space-y-24"
                >
                    <div className="space-y-6">
                        <span className="mono text-[10px] text-var(--gold) tracking-[0.8em] uppercase">No Second Chances</span>
                        <h2 className="serif h1-phi font-black italic tracking-tighter line-height-none">
                            {t("es") ? "\u00bfVas a reinar o a mirar?" : "REIGN OR WATCH?"}
                        </h2>
                    </div>
                    
                    <div className="flex flex-col items-center gap-12">
                        <Link href="/" className="group relative px-24 py-12 bg-white flex items-center justify-center transition-all duration-700 hover:bg-var(--gold)">
                            <div className="absolute inset-[-10px] border border-white/10 group-hover:inset-[-20px] group-hover:opacity-0 transition-all duration-700"></div>
                            <span className="relative z-10 mono text-3xl font-black tracking-[0.3em] text-var(--obsidian) group-hover:text-white transition-colors uppercase">
                                {content.hero.cta}
                            </span>
                        </Link>
                        
                        <div className="flex items-center gap-4 text-white/20 mono text-[9px] tracking-widest">
                            <span>CRYPTOGRAPHICALLY SECURED</span>
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                            <span>CROWD VERIFIED</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            <style jsx>{`
                .luxury-text-glow {
                    text-shadow: 0 0 15px var(--gold-glow);
                }
                .line-height-none { line-height: 1; }
            `}</style>
        </main>
    );
}
