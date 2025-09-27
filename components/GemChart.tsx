import { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { GemEarning } from '../types';
import { prepareChartData, formatDateShort } from '../utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface GemChartProps {
    earnings: GemEarning[];
}

export const GemChart: React.FC<GemChartProps> = ({ earnings }) => {
    const chartData = useMemo(() => {
        const dailyData = prepareChartData(earnings);

        return {
            labels: dailyData.map(item => formatDateShort(item.date)),
            datasets: [
                {
                    label: 'On-Chain Gems',
                    data: dailyData.map(item => item.onChain),
                    backgroundColor: 'rgba(147, 51, 234, 0.7)',
                    borderColor: 'rgba(147, 51, 234, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Off-Chain Gems',
                    data: dailyData.map(item => item.offChain),
                    backgroundColor: 'rgba(249, 115, 22, 0.7)',
                    borderColor: 'rgba(249, 115, 22, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [earnings]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily Gem Earnings (Last 30 Days)',
                font: {
                    size: 16,
                },
            },
            tooltip: {
                callbacks: {
                    afterLabel: function (context: any) {
                        const dataIndex = context.dataIndex;
                        const onChain = chartData.datasets[0].data[dataIndex] || 0;
                        const offChain = chartData.datasets[1].data[dataIndex] || 0;
                        const total = onChain + offChain;
                        return `Total: ${total.toLocaleString()} gems`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Gems Earned'
                }
            },
        },
    }), [chartData]);

    if (!earnings.length) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="h-80">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
