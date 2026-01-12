"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';

export default function GladiatorInterface() {
    const [gladiators, setGladiators] = useState([]);
    const [filteredGladiators, setFilteredGladiators] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useLanguage();

    // Load all gladiators on mount
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

    // Filter on query change
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
                g.email?.toLowerCase().includes(q)
            )
        );
    }, [query, gladiators]);

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
            {/* Search Bar */}
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

            {/* Gladiator Grid */}
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
                        <GladiatorCard key={g.id} data={g} />
                    ))}
                </div>
            )}
        </div>
    );
}

function GladiatorCard({ data }) {
    const wins = data.wins || 0;
    const losses = data.losses || 0;
    const totalMatches = wins + losses;
    const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

    return (
        <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: 'var(--shadow)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        className="gladiator-card"
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                {/* Avatar */}
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
                    {data.name ? data.name.substring(0, 2).toUpperCase() : '??'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '800',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {data.colosseum_name || data.name}
                    </h3>
                    <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        #{String(data.id).padStart(4, '0')}
                    </p>
                </div>
                {/* Stack Badge */}
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

            {/* Stats */}
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

            {/* Last Project */}
            {data.last_project_name && (
                <div style={{
                    padding: '12px',
                    background: 'var(--surface-alt)',
                    borderRadius: '6px',
                    fontSize: '0.85rem'
                }}>
                    <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>LAST PROJECT</span>
                    <p style={{ marginTop: '4px', fontWeight: '600' }}>{data.last_project_name}</p>
                </div>
            )}
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
