"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function GladiatorInterface() {
    const [query, setQuery] = useState('');
    const [gladiator, setGladiator] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setGladiator(null);

        try {
            const res = await fetch(`/api/gladiators?query=${encodeURIComponent(query)}`);
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || 'Search failed');
            
            if (data.data) {
                setGladiator(data.data);
            } else {
                setError('GLADIATOR_NOT_FOUND');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto relative group">
                <div className="absolute inset-0 bg-primary-green/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-black/50 border border-white/10 p-2 rounded-lg backdrop-blur-sm focus-within:border-primary-green/50 transition-colors">
                    <Search className="w-6 h-6 text-zinc-500 ml-2" />
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="SEARCH_BY_NAME_OR_HANDLE..."
                        className="w-full bg-transparent border-none text-white font-mono p-4 focus:ring-0 placeholder:text-zinc-600 text-lg uppercase"
                    />
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-primary-green text-black font-bold px-6 py-2 rounded font-mono hover:bg-emerald-400 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'SCANNING...' : 'SCAN'}
                    </button>
                </div>
            </form>

            {/* Display Area */}
            {error && (
                <div className="text-center p-12 border border-red-500/20 bg-red-500/5 rounded-lg max-w-2xl mx-auto">
                    <p className="text-red-500 font-mono text-xl animate-pulse">ERROR: {error}</p>
                </div>
            )}

            {gladiator && <GladiatorCard data={gladiator} />}
        </div>
    );
}

function GladiatorCard({ data }) {
    return (
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md max-w-5xl mx-auto shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Top Bar */}
            <div className="bg-zinc-950/80 border-b border-white/10 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-800 to-black p-1 border border-white/10">
                         {/* Avatar Placeholder: DiceBear or Initials */}
                        <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-black text-zinc-600">
                            {data.name.substring(0, 2).toUpperCase()}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                            {data.colosseum_name || data.name}
                        </h2>
                        <p className="text-primary-green font-mono text-sm">
                            #{String(data.id).padStart(4, '0')} - {data.location || 'UNKNOWN_REGION'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                     {/* Type Badges */}
                     <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${stackColor(data.stack)}`}>
                        {data.stack || 'NO_DATA'}
                     </span>
                </div>
            </div>

            <div className="grid md:grid-cols-2">
                {/* Left Column: Stats & Weaknesses */}
                <div className="p-8 border-r border-white/10 space-y-8">
                    
                    {/* Stats Radar/Bars */}
                    <div>
                        <h3 className="text-zinc-500 font-mono text-sm mb-4 uppercase">Battle Stats</h3>
                        <div className="space-y-3">
                            <StatBar label="Win Rate" value={data.winRate || 0} color="bg-primary-green" />
                            <StatBar label="Speed (Shipping)" value={75} color="bg-blue-500" /> {/* Mocked for now */}
                            <StatBar label="Experience" value={data.matches || 0 * 10} max={100} color="bg-purple-500" />
                        </div>
                    </div>

                    {/* "Weaknesses" / Tech Debt */}
                    <div>
                        <h3 className="text-red-400 font-mono text-sm mb-3 uppercase">Known Vulnerabilities</h3>
                        <div className="flex flex-wrap gap-2">
                            {['SLEEP_DEPRIVATION', 'SCOPE_CREEP', 'WIFI_LATENCY'].map(deb => (
                                <span key={deb} className="px-2 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded text-[10px] font-mono tracking-wide">
                                    {deb}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Moves & Info */}
                <div className="p-8 bg-zinc-950/30">
                     <h3 className="text-zinc-500 font-mono text-sm mb-4 uppercase">Signature Moves</h3>
                     
                     <div className="space-y-4">
                        <div className="group p-4 bg-zinc-900 border border-white/5 hover:border-primary-green/30 transition-colors rounded">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-white font-bold">Deploy to Prod</span>
                                <span className="text-xs font-mono text-zinc-500">CRIT RATE 100%</span>
                            </div>
                            <p className="text-sm text-zinc-400">
                                {data.last_project_name ? `Last deployed: "${data.last_project_name}"` : 'No recent deployment records.'}
                            </p>
                        </div>
                        
                        <div className="group p-4 bg-zinc-900 border border-white/5 hover:border-primary-green/30 transition-colors rounded">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-white font-bold">Stack Overflow</span>
                                <span className="text-xs font-mono text-zinc-500">PASSIVE</span>
                            </div>
                            <p className="text-sm text-zinc-400">
                                {data.competitor_story || 'Mystery gladiator. No backstory provided.'}
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
}

function StatBar({ label, value, max = 100, color }) {
    const width = Math.min(100, Math.max(0, (value / max) * 100));
    return (
        <div className="flex items-center gap-4">
            <span className="w-24 text-xs font-bold text-zinc-400 uppercase text-right">{label}</span>
            <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${color} shadow-[0_0_10px_currentColor]`} 
                    style={{ width: `${width}%` }} 
                />
            </div>
            <span className="w-8 text-xs font-mono text-zinc-500">{value}%</span>
        </div>
    );
}

function stackColor(stack) {
    switch (stack?.toLowerCase()) {
        case 'frontend': return 'bg-pink-500/20 text-pink-500 border border-pink-500/30';
        case 'backend': return 'bg-blue-500/20 text-blue-500 border border-blue-500/30';
        case 'fullstack': return 'bg-purple-500/20 text-purple-500 border border-purple-500/30';
        case 'mobile': return 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30';
        case 'data': return 'bg-green-500/20 text-green-500 border border-green-500/30';
        default: return 'bg-zinc-500/20 text-zinc-500 border border-zinc-500/30';
    }
}
