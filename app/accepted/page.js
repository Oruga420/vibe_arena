'use client';

export default function AcceptedPage() {
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
                <div style={{ fontSize: '72px', textAlign: 'center', marginBottom: '16px' }}>⚔️</div>
                <h1 style={{ fontSize: '32px', fontWeight: 800, textAlign: 'center', color: '#22c55e', marginBottom: '12px' }}>
                    You&apos;re In, Gladiator!
                </h1>
                <p style={{ fontSize: '16px', color: '#a0a0a0', textAlign: 'center', marginBottom: '28px', lineHeight: 1.5 }}>
                    Your spot has been confirmed. Prepare for battle.
                </p>

                {/* Strikethrough Stripe message */}
                <div style={{
                    textDecoration: 'line-through',
                    color: '#666',
                    fontSize: '15px',
                    textAlign: 'center',
                    marginBottom: '8px',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                }}>
                    💳 Your Stripe payment link will be sent to your email shortly.
                </div>

                {/* Beta Free Badge */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    textAlign: 'center',
                    marginBottom: '24px',
                }}>
                    <span style={{
                        display: 'inline-block',
                        background: '#22c55e',
                        color: '#000',
                        padding: '4px 14px',
                        borderRadius: '100px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        marginBottom: '8px',
                    }}>🎉 BETA DROP</span>
                    <p style={{ color: '#86efac', fontSize: '15px', lineHeight: 1.5 }}>
                        This is a <strong>Beta Drop</strong> — your entry fee is <strong>covered by the Coliseum</strong>. No payment needed. Just show up and code.
                    </p>
                </div>

                {/* Prize */}
                <Section title="🏆 What's at Stake">
                    <p>The winner takes home <strong style={{ color: '#fbbf24' }}>$100 CAD</strong>. That&apos;s real money for real code.</p>
                </Section>

                {/* Rules */}
                <Section title="📜 The Rules of the Arena">
                    <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                        <li style={{ marginBottom: '6px' }}><strong>Vibe Coding Only</strong> — Build your project using AI-assisted coding tools (Cursor, Copilot, Claude, etc.). No traditional hand-coding.</li>
                        <li style={{ marginBottom: '6px' }}><strong>Time Limit</strong> — You&apos;ll have a set time window to build and submit. Details sent before the drop.</li>
                        <li style={{ marginBottom: '6px' }}><strong>Theme Reveal</strong> — The project theme is revealed at the start. Everyone gets the same prompt.</li>
                        <li style={{ marginBottom: '6px' }}><strong>Judging</strong> — Projects judged by community vote on the Colosseum. Most votes wins.</li>
                        <li style={{ marginBottom: '6px' }}><strong>Avatar Required</strong> — You need a Gladiator Avatar to enter the arena. Create or update yours now!</li>
                    </ul>
                </Section>

                {/* Next Steps */}
                <Section title="⚡ Next Steps">
                    <p>Your avatar generator has been <strong style={{ color: '#22c55e' }}>unlocked</strong>. Head to the Gladiator Cage to create or update your avatar for this drop. Make it legendary.</p>
                </Section>

                {/* CTA */}
                <a href="https://vibecodingcolosseum-image-prompts.vercel.app/" style={{
                    display: 'block',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '16px',
                    margin: '24px 0 16px',
                }}>🛡️ Create / Update My Gladiator Avatar</a>
                <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
                    Your image generation tokens have been reset. You have 4 new attempts.
                </p>

                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '24px 0' }} />
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#555' }}>
                    Vibe Coding Colosseum — Where AI Meets Competition<br />
                    More details about the drop will be sent to your email soon.
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
            <h2 style={{ color: '#c4b5fd', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{title}</h2>
            <div style={{ color: '#b0b0b0', fontSize: '14px', lineHeight: 1.7 }}>{children}</div>
        </div>
    );
}
