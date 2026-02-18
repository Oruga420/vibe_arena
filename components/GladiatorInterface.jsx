"use client";

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from './LanguageProvider';

export default function GladiatorInterface() {
    const [gladiators, setGladiators] = useState([]);
    const [filteredGladiators, setFilteredGladiators] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGladiator, setSelectedGladiator] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchGladiators = async () => {
            try {
                const res = await fetch('/api/gladiators');
                const data = await res.json();
                if (data.success && data.data) {
                    setGladiators(data.data);
                    setFilteredGladiators(data.data);
                } else {
                    setError('No gladiators found');
                }
            } catch (err) {
                setError('Failed to load gladiators');
            } finally {
                setLoading(false);
            }
        };
        fetchGladiators();
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredGladiators(gladiators);
            return;
        }
        const q = query.toLowerCase();
        setFilteredGladiators(
            gladiators.filter(g =>
                g.name?.toLowerCase().includes(q) ||
                g.colosseum_name?.toLowerCase().includes(q) ||
                g.email?.toLowerCase().includes(q) ||
                g.gladiator_name?.toLowerCase().includes(q)
            )
        );
    }, [query, gladiators]);

    const closeModal = useCallback(() => setSelectedGladiator(null), []);

    useEffect(() => {
        if (!selectedGladiator) return;
        const handleEsc = (e) => { if (e.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [selectedGladiator, closeModal]);

    if (loading) {
        return (
            <div className="text-center py-20">
                <p className="mono" style={{ color: 'var(--primary-green)' }}>LOADING_GLADIATORS...</p>
            </div>
        );
    }

    if (error && gladiators.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="mono" style={{ color: 'var(--accent-red)' }}>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search gladiators..."
                    style={{
                        width: '100%',
                        padding: '16px 20px',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-main)',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--deep-green)',
                        outline: 'none'
                    }}
                />
            </div>

            {filteredGladiators.length === 0 ? (
                <div className="text-center py-12">
                    <p className="mono" style={{ color: 'var(--text-muted)' }}>NO_RESULTS_FOUND</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px'
                }}>
                    {filteredGladiators.map((g) => (
                        <GladiatorCard key={g.id + g.source} data={g} onClick={() => setSelectedGladiator(g)} />
                    ))}
                </div>
            )}

            {selectedGladiator && (
                <GladiatorModal data={selectedGladiator} onClose={closeModal} />
            )}
        </div>
    );
}

/* ─────────────── CARD ─────────────── */
function GladiatorCard({ data, onClick }) {
    const wins = data.wins || 0;
    const losses = data.losses || 0;
    const totalMatches = wins + losses;
    const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
    const displayName = data.gladiator_name || data.colosseum_name || data.name;
    const archetype = data.attributes?.archetype;

    return (
        <div
            onClick={onClick}
            style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: 'var(--shadow)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                cursor: 'pointer'
            }}
            className="gladiator-card"
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                {data.avatar_url ? (
                    <img
                        src={data.avatar_url}
                        alt={displayName}
                        style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid var(--primary-green)',
                            flexShrink: 0
                        }}
                    />
                ) : (
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--primary-green)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '800',
                        fontSize: '1.2rem',
                        flexShrink: 0
                    }}>
                        {(data.name || '??').substring(0, 2).toUpperCase()}
                    </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {displayName}
                    </h3>
                    <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        #{String(data.id).padStart(4, '0')}
                        {archetype && <span style={{ marginLeft: '8px', color: 'var(--primary-green)' }}>• {archetype}</span>}
                    </p>
                </div>
                {data.stack && (
                    <span style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--border)',
                        color: 'var(--deep-green)'
                    }}>
                        {data.stack}
                    </span>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '16px'
            }}>
                <StatBlock label="WINS" value={wins} color="var(--primary-green)" />
                <StatBlock label="LOSSES" value={losses} color="var(--accent-red)" />
                <StatBlock label="WIN%" value={`${winRate}%`} color="var(--deep-green)" />
            </div>
        </div>
    );
}

/* ─────────────── MODAL ─────────────── */
function GladiatorModal({ data, onClose }) {
    const wins = data.wins || 0;
    const losses = data.losses || 0;
    const totalMatches = wins + losses;
    const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
    const displayName = data.gladiator_name || data.colosseum_name || data.name;

    const attrs = data.attributes || {};
    const title = attrs.title;
    const archetype = attrs.archetype;
    const powerUps = attrs.powerUps || data.power_ups || [];
    const weaknesses = attrs.weaknesses || [];
    const battleCry = attrs.battleCry;
    const story = data.competitor_story;
    const gallery = data.generated_images || [];

    return createPortal(
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(8px)',
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '40px 20px',
                animation: 'fadeIn 0.2s ease'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    maxWidth: '680px',
                    width: '100%',
                    margin: '0 auto',
                    boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
                    position: 'relative'
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid var(--border)',
                        background: 'var(--surface-alt)',
                        color: 'var(--deep-green)',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}
                >✕</button>

                {/* Hero Section */}
                <div style={{
                    padding: '40px 32px 24px',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start'
                }}>
                    {data.avatar_url ? (
                        <img
                            src={data.avatar_url}
                            alt={displayName}
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '16px',
                                objectFit: 'cover',
                                border: '3px solid var(--primary-green)',
                                flexShrink: 0
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, var(--primary-green), #006b3a)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '800',
                            fontSize: '2.5rem',
                            flexShrink: 0
                        }}>
                            {(data.name || '??').substring(0, 2).toUpperCase()}
                        </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '4px' }}>
                            {displayName}
                        </h2>
                        <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>
                            #{String(data.id).padStart(4, '0')}
                            {data.stack && <span> • {data.stack.toUpperCase()}</span>}
                        </p>
                        {title && (
                            <p style={{ color: 'var(--primary-green)', fontWeight: '600', fontSize: '1rem', marginBottom: '4px' }}>
                                {title}
                            </p>
                        )}
                        {archetype && (
                            <span style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                background: 'var(--surface-alt)',
                                border: '1px solid var(--border)',
                                color: 'var(--deep-green)'
                            }}>
                                {archetype}
                            </span>
                        )}
                    </div>
                </div>

                {/* Stats Bar */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0',
                    borderTop: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)'
                }}>
                    <ModalStat label="WINS" value={wins} color="var(--primary-green)" />
                    <ModalStat label="LOSSES" value={losses} color="var(--accent-red)" border />
                    <ModalStat label="WIN RATE" value={`${winRate}%`} color="var(--deep-green)" />
                </div>

                {/* Body Content */}
                <div style={{ padding: '24px 32px 32px' }}>
                    {/* Battle Cry */}
                    {battleCry && (
                        <div style={{
                            padding: '16px 20px',
                            background: 'var(--surface-alt)',
                            borderRadius: '10px',
                            borderLeft: '4px solid var(--primary-green)',
                            marginBottom: '24px'
                        }}>
                            <p className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '6px' }}>BATTLE CRY</p>
                            <p style={{ fontStyle: 'italic', fontSize: '1.05rem', fontWeight: '600' }}>"{battleCry}"</p>
                        </div>
                    )}

                    {/* Power Ups */}
                    {powerUps.length > 0 && (
                        <DossierSection label="⚡ POWER UPS">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {powerUps.map((p, i) => (
                                    <span key={i} style={{
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: 'rgba(0,196,106,0.12)',
                                        color: 'var(--primary-green)',
                                        border: '1px solid rgba(0,196,106,0.25)'
                                    }}>{p}</span>
                                ))}
                            </div>
                        </DossierSection>
                    )}

                    {/* Weaknesses */}
                    {weaknesses.length > 0 && (
                        <DossierSection label="💀 WEAKNESSES">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {weaknesses.map((w, i) => (
                                    <span key={i} style={{
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: 'rgba(255,45,45,0.1)',
                                        color: 'var(--accent-red)',
                                        border: '1px solid rgba(255,45,45,0.2)'
                                    }}>{w}</span>
                                ))}
                            </div>
                        </DossierSection>
                    )}

                    {/* Stack */}
                    {data.stack && (
                        <DossierSection label="🛠️ TECH STACK">
                            <p style={{ fontSize: '0.95rem' }}>{data.stack}</p>
                        </DossierSection>
                    )}

                    {/* Competitor Story */}
                    {story && (
                        <DossierSection label="📖 COMPETITOR STORY">
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{story}</p>
                        </DossierSection>
                    )}

                    {/* Avatar Gallery */}
                    {gallery.length > 0 && (
                        <DossierSection label="🖼️ AVATAR GALLERY">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${Math.min(gallery.length, 4)}, 1fr)`,
                                gap: '10px'
                            }}>
                                {gallery.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`${displayName} avatar ${i + 1}`}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '1',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            border: '1px solid var(--border)'
                                        }}
                                    />
                                ))}
                            </div>
                        </DossierSection>
                    )}


                </div>
            </div>
        </div>,
        document.body
    );
}

/* ─────────────── HELPERS ─────────────── */
function DossierSection({ label, children }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <p className="mono" style={{
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                marginBottom: '10px',
                letterSpacing: '0.08em'
            }}>{label}</p>
            {children}
        </div>
    );
}

function StatBlock({ label, value, color }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <p className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '800', color }}>{value}</p>
        </div>
    );
}

function ModalStat({ label, value, color, border }) {
    return (
        <div style={{
            textAlign: 'center',
            padding: '20px 16px',
            borderLeft: border ? '1px solid var(--border)' : 'none',
            borderRight: border ? '1px solid var(--border)' : 'none'
        }}>
            <p className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{label}</p>
            <p style={{ fontSize: '2rem', fontWeight: '800', color }}>{value}</p>
        </div>
    );
}
