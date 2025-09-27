import type { GemStats } from '../types';

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
            <div className={`p-2 ${bgColor} rounded-lg`}>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                icon="💎"
                title="Total Gems"
                value={stats.totalGems.toLocaleString()}
                bgColor="bg-blue-100"
            />
            <StatCard
                icon="📊"
                title="Total Transactions"
                value={stats.totalTransactions.toString()}
                bgColor="bg-green-100"
            />
            <StatCard
                icon="⛓️"
                title="On-Chain"
                value={stats.onChainEarnings.toLocaleString()}
                bgColor="bg-purple-100"
            />
            <StatCard
                icon="🌐"
                title="Off-Chain"
                value={stats.offChainEarnings.toLocaleString()}
                bgColor="bg-orange-100"
            />
        </div>
    );
};
