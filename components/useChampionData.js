/**
 * Custom hook to fetch champion data from API
 */

import { useState, useEffect } from 'react';

export function useChampionData() {
    const [data, setData] = useState({
        champion: null,
        participants: [],
        hasChampion: false,
        loading: true,
        error: null
    });

    useEffect(() => {
        async function fetchChampion() {
            try {
                const response = await fetch('/api/champions?type=latest');
                const result = await response.json();

                if (result.success) {
                    setData({
                        champion: result.data.champion,
                        participants: result.data.participants || [],
                        hasChampion: result.data.hasChampion,
                        loading: false,
                        error: null
                    });
                } else {
                    setData(prev => ({
                        ...prev,
                        loading: false,
                        error: result.error || 'Failed to fetch champion data'
                    }));
                }
            } catch (error) {
                console.error('[useChampionData] Error:', error);
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message
                }));
            }
        }

        fetchChampion();
    }, []);

    return data;
}

export function useCompetitionStats() {
    const [stats, setStats] = useState({
        total_drops: 0,
        unique_champions: 0,
        total_gladiators: 0,
        total_prizes: 0,
        loading: true
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('/api/champions?type=stats');
                const result = await response.json();

                if (result.success) {
                    setStats({
                        ...result.data,
                        loading: false
                    });
                }
            } catch (error) {
                console.error('[useCompetitionStats] Error:', error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        }

        fetchStats();
    }, []);

    return stats;
}
