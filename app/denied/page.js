'use client';

export default function DeniedPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: "'Inter', sans-serif",
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '48px 36px',
                maxWidth: '580px',
                width: '100%',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            }}>
                <div style={{ fontSize: '72px', textAlign: 'center', marginBottom: '16px' }}>👋</div>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textAlign: 'center', color: '#94a3b8', marginBottom: '12px' }}>
                    We Get It.
                </h1>
                <p style={{ fontSize: '16px', color: '#a0a0a0', textAlign: 'center', marginBottom: '28px', lineHeight: 1.5 }}>
                    You&apos;ve declined your spot in this drop.
                </p>

                <Section title="💬 No Hard Feelings">
                    <p>We understand — not everyone has the time, or the guts, to step into the arena. Life happens. The Colosseum will still be here when you&apos;re ready.</p>
                </Section>

                <Section title="🔄 Changed Your Mind?">
                    <p>If you decide you want back in, reach out to the organizer. We can re-activate your spot as long as the drop hasn&apos;t started yet.</p>
                </Section>

                <Section title="👀 Spectator Mode">
                    <p>Even if you&apos;re not competing, you can still watch the gladiators battle it out and vote for your favorite. Visit the Colosseum when the drop goes live.</p>
                </Section>

                <a href="https://vibecodingcolosseum.com" style={{
                    display: 'block',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #475569, #334155)',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '16px',
                    margin: '24px 0 16px',
                }}>🏛️ Visit the Colosseum</a>
                <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
                    See what the gladiators are building.
                </p>

                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '24px 0' }} />
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#555' }}>
                    Vibe Coding Colosseum — Where AI Meets Competition<br />
                    We hope to see you in a future drop. 🤞
                </p>
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
        }}>
            <h2 style={{ color: '#94a3b8', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{title}</h2>
            <div style={{ color: '#b0b0b0', fontSize: '14px', lineHeight: 1.7 }}>{children}</div>
        </div>
    );
}
