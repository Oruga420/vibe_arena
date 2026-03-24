"use client";

import { useChampionData } from './useChampionData';
import { useLanguage } from './LanguageProvider';

/**
 * ChampionShowcase Component
 * 
 * Displays the latest champion with trophy, their avatar in color,
 * and defeated gladiators in grayscale
 */
export default function ChampionShowcase() {
    const { champion, participants, hasChampion, loading, error } = useChampionData();
    const { t } = useLanguage();

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short'
        });
    };

    // Separate champion from defeated gladiators
    const defeatedGladiators = participants.filter(p => !p.is_champion);

    // Loading state
    if (loading) {
        return (
            <div className="champion-showcase champion-loading">
                <div className="champion-loading-spinner"></div>
                <p className="mono">Loading champion data...</p>
            </div>
        );
    }

    // No champion yet
    if (!hasChampion || !champion) {
        return (
            <div className="champion-showcase champion-empty">
                <div className="trophy-icon">🏆</div>
                <h3>The Arena Awaits Its First Champion</h3>
                <p className="mono">History will be written soon...</p>
            </div>
        );
    }

    const champions = champion.champions || [{
        name: champion.champion_name,
        colosseum_name: champion.champion_colosseum_name,
        avatar_url: champion.champion_avatar_url,
    }];
    const isTie = champions.length > 1;

    return (
        <div className="champion-showcase">
            {/* Drop Info Header */}
            <div className="champion-header">
                <div className="trophy-icon animated">🏆</div>
                <h3 className="drop-name">
                    {champion.drop_name} {isTie ? 'Co-Champions' : 'Champion'}
                </h3>
                <p className="drop-date mono">{formatDate(champion.drop_date)}</p>
            </div>

            {/* Champion Display - side by side for ties */}
            <div className={`champion-display ${isTie ? 'champion-display-tie' : ''}`}>
                {champions.map((champ, idx) => (
                    <div key={idx} className="champion-card">
                        <div className="champion-avatar-container">
                            {champ.avatar_url ? (
                                <img
                                    src={champ.avatar_url}
                                    alt={`${champ.colosseum_name || champ.name} - Champion`}
                                    className="champion-avatar"
                                />
                            ) : (
                                <div className="champion-avatar-placeholder">
                                    <span>
                                        {(champ.colosseum_name || champ.name || '??')
                                            .substring(0, 2)
                                            .toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="champion-crown">👑</div>
                        </div>

                        <h2 className="champion-name">
                            {champ.colosseum_name || champ.name}
                        </h2>
                    </div>
                ))}
            </div>

            {champion.champion_project_name && champion.champion_project_name !== 'TBD' && (
                <p className="champion-project mono">
                    Project: {champion.champion_project_name}
                </p>
            )}

            {/* Defeated Gladiators */}
            {defeatedGladiators.length > 0 && (
                <div className="defeated-section">
                    <p className="defeated-label mono">Defeated Gladiators</p>
                    <div className="defeated-grid">
                        {defeatedGladiators.map((gladiator, index) => (
                            <div key={index} className="defeated-gladiator">
                                {gladiator.avatar_url ? (
                                    <img
                                        src={gladiator.avatar_url}
                                        alt={gladiator.name}
                                        className="defeated-avatar"
                                    />
                                ) : (
                                    <div className="defeated-avatar-placeholder">
                                        <span>👤</span>
                                    </div>
                                )}
                                <span className="defeated-name">
                                    {gladiator.colosseum_name || gladiator.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats - only show if there's a prize pool */}
            {champion.prize_pool && (
                <div className="champion-stats">
                    <div className="stat">
                        <span className="stat-value">
                            ${champion.prize_pool} {champion.prize_currency || 'CAD'}
                        </span>
                        <span className="stat-label">Prize Pool</span>
                    </div>
                </div>
            )}
        </div>
    );
}
