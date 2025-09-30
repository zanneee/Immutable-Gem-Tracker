import type { GemStats } from '../types';
import { STAT_CARDS } from '../constants';

interface StatsOverviewProps {
    stats: GemStats;
}

interface StatCardProps {
    icon: string;
    title: string;
    value: string;
    bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, bgColor }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 ${bgColor} rounded-lg flex-shrink-0`}>
                <span className="text-2xl leading-none">{icon}</span>
            </div>
            <div className="ml-4 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
    const statCardsData = [
        {
            ...STAT_CARDS.TOTAL_GEMS,
            value: stats.totalGems.toLocaleString(),
        },
        {
            ...STAT_CARDS.TOTAL_TRANSACTIONS,
            value: stats.totalTransactions.toString(),
        },
        {
            ...STAT_CARDS.GAMES_PLAYED,
            value: stats.gameCount.toString(),
        },
        {
            ...STAT_CARDS.ON_CHAIN,
            value: stats.onChainEarnings.toLocaleString(),
        },
        {
            ...STAT_CARDS.OFF_CHAIN,
            value: stats.offChainEarnings.toLocaleString(),
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {statCardsData.map((card, index) => (
                <StatCard
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    value={card.value}
                    bgColor={card.bgColor}
                />
            ))}
        </div>
    );
};
