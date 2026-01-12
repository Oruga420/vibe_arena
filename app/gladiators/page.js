import GladiatorInterface from '../../components/GladiatorInterface';

export default function GladiatorsPage() {
    return (
        <main>
            <section className="section">
                <div className="section-header" style={{ textAlign: 'center' }}>
                    <p className="mono" style={{ marginBottom: '8px', color: 'var(--primary-green)' }}>GLADIATOR DEX</p>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>The Arena Roster</h1>
                </div>
                
                <GladiatorInterface />
            </section>
        </main>
    );
}
