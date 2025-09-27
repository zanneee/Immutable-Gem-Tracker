import type { GemEarning } from '../types';
import { formatDate } from '../utils';

interface EarningsTableProps {
    earnings: GemEarning[];
}

export const EarningsTable: React.FC<EarningsTableProps> = ({ earnings }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rule ID (Quest)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Gems Earned
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total by Quest
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {earnings.map((earning, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatDate(earning.timestamp)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                                    <div className="max-w-xs truncate" title={earning.rule_id}>
                                        {earning.rule_id}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${earning.type === 'on_chain'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-orange-100 text-orange-800'
                                        }`}>
                                        {earning.type === 'on_chain' ? '⛓️ On-Chain' : '🌐 Off-Chain'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                    +{earning.increase.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {earning.total.toLocaleString()}
                                </td>
                            </tr>
                        ))}

                        {earnings.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No earnings found matching your filters
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
