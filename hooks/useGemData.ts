import { useState } from 'react';
import type { GemResponse } from '../types';

export const useGemData = () => {
    const [gemData, setGemData] = useState<GemResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchGemData = async (walletAddress: string) => {
        if (!walletAddress.trim()) {
            setError('Please enter a wallet address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/gems/${walletAddress}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch gem data');
            }

            setGemData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setGemData(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        gemData,
        loading,
        error,
        fetchGemData
    };
};
