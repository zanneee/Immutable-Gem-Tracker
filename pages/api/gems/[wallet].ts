import type { NextApiRequest, NextApiResponse } from 'next';
import type { GemEarning, GemResponse, GemStats } from '../../../types';
import { API_CONFIG, ERROR_MESSAGES } from '../../../constants';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { wallet } = req.query;

    if (!wallet || typeof wallet !== 'string') {
        return res.status(400).json({ message: 'Wallet address is required' });
    }

    try {
        console.log(`Fetching gem data for wallet: ${wallet}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/${wallet}/latest_earnings`,
            {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'gem-tracker/1.0'
                }
            }
        );

        clearTimeout(timeoutId);

        console.log(`API Response Status: ${response.status}`);
        console.log(`API Response Headers:`, Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error Response: ${errorText}`);
            throw new Error(`API responded with status: ${response.status}. Response: ${errorText.substring(0, 200)}`);
        }

        const contentType = response.headers.get('content-type');
        console.log(`Content-Type: ${contentType}`);

        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error(`Non-JSON Response: ${responseText.substring(0, 500)}`);
            throw new Error(`Expected JSON response but got ${contentType}. Response: ${responseText.substring(0, 200)}`);
        }

        // Clone the response to read it twice if needed
        const responseClone = response.clone();
        let data: GemResponse;

        try {
            data = await response.json();
            console.log(`Successfully parsed JSON. Earnings count: ${data.result?.latest_earnings?.length || 0}`);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            const responseText = await responseClone.text();
            console.error(`Raw response text (first 1000 chars): ${responseText.substring(0, 1000)}`);
            throw new Error(`Failed to parse JSON response. Parse error: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}. Response preview: ${responseText.substring(0, 200)}`);
        }

        if (!data.result || !Array.isArray(data.result.latest_earnings)) {
            console.error('Invalid response structure:', JSON.stringify(data, null, 2).substring(0, 500));
            throw new Error(`Invalid response structure. Expected result.latest_earnings array but got: ${JSON.stringify(data).substring(0, 200)}`);
        }

        const earnings = data.result.latest_earnings;

        // Calculate unique games
        const uniqueGames = new Set(
            earnings
                .map(earning => earning.game_name)
                .filter(gameName => gameName && gameName.trim() !== '')
        );

        const stats: GemStats = {
            totalGems: earnings.reduce((sum, earning) => sum + earning.increase, 0),
            totalTransactions: earnings.length,
            onChainEarnings: earnings
                .filter(e => e.type === 'on_chain')
                .reduce((sum, earning) => sum + earning.increase, 0),
            offChainEarnings: earnings
                .filter(e => e.type === 'off_chain')
                .reduce((sum, earning) => sum + earning.increase, 0),
            gameCount: uniqueGames.size,
            latestActivity: earnings.length > 0 ? earnings[0].timestamp : ''
        };

        console.log(`Successfully processed ${earnings.length} earnings. Total gems: ${stats.totalGems}`);
        res.status(200).json({ ...data, stats });

    } catch (error) {
        console.error('API Error Details:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            wallet: wallet,
            timestamp: new Date().toISOString()
        });

        // Handle timeout errors specifically
        if (error instanceof Error && error.name === 'AbortError') {
            return res.status(504).json({
                message: 'Request timeout - the API took too long to respond',
                error: 'Gateway Timeout',
                wallet: wallet
            });
        }

        res.status(500).json({
            message: 'Failed to fetch gem data',
            error: error instanceof Error ? error.message : 'Unknown error',
            wallet: wallet,
            timestamp: new Date().toISOString()
        });
    }
}
