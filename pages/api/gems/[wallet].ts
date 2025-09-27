import type { NextApiRequest, NextApiResponse } from 'next';
import type { GemEarning, GemResponse, GemStats } from '../../../types';

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
        const response = await fetch(
            `https://api.immutable.com/v1/rewards/gems/${wallet}/latest_earnings`
        );

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data: GemResponse = await response.json();
        const earnings = data.result.latest_earnings;

        const stats: GemStats = {
            totalGems: earnings.reduce((sum, earning) => sum + earning.increase, 0),
            totalTransactions: earnings.length,
            onChainEarnings: earnings
                .filter(e => e.type === 'on_chain')
                .reduce((sum, earning) => sum + earning.increase, 0),
            offChainEarnings: earnings
                .filter(e => e.type === 'off_chain')
                .reduce((sum, earning) => sum + earning.increase, 0),
            latestActivity: earnings.length > 0 ? earnings[0].timestamp : ''
        };

        res.status(200).json({ ...data, stats });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch gem data',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
