import Link from 'next/link';
import GladiatorInterface from '../../components/GladiatorInterface';

export default function GladiatorsPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                        GLADIATOR<span className="text-primary-green">_DEX</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-mono">
                        DATABASE_ACCESS_LEVEL: <span className="text-primary-green">PUBLIC</span>
                    </p>
                </div>
                
                {/* Search Interface */}
                <GladiatorInterface />
            </div>
        </main>
    );
}
