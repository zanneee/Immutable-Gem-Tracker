import { useState, useCallback } from 'react';
import type { GemResponse } from '../types';
import { API_CONFIG, ERROR_MESSAGES } from '../constants';

export const useGemData = () => {
    const [gemData, setGemData] = useState<GemResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchGemData = useCallback(async (walletAddress: string, retryCount = 0) => {
        if (!walletAddress.trim()) {
            setError(ERROR_MESSAGES.WALLET_REQUIRED);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/gems/${walletAddress}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                console.error('JSON Parse Error in frontend:', parseError);
                throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
            }

            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 504) {
                    throw new Error(ERROR_MESSAGES.TIMEOUT);
                }
                throw new Error(data.message || `${ERROR_MESSAGES.SERVER_ERROR} (${response.status})`);
            }

            setGemData(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';

            // Retry logic for certain errors
            if (retryCount < API_CONFIG.RETRY_ATTEMPTS && (
                errorMessage.includes('invalid response') ||
                errorMessage.includes('timed out') ||
                errorMessage.includes('Server error')
            )) {
                console.log(`Retrying request (attempt ${retryCount + 2}/${API_CONFIG.RETRY_ATTEMPTS + 1})...`);
                setTimeout(() => {
                    fetchGemData(walletAddress, retryCount + 1);
                }, API_CONFIG.RETRY_DELAYS[retryCount] || 2000);
                return;
            }

            setError(errorMessage);
            setGemData(null);
        } finally {
            if (retryCount === 0) { // Only set loading false on the original request
                setLoading(false);
            }
        }
    }, []);

    return {
        gemData,
        loading,
        error,
        fetchGemData
    };
};
