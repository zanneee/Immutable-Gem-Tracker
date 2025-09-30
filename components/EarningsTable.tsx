import type { GemEarning, SortState, SortColumn } from '../types';
import { formatDate } from '../utils';
import { UI_TEXT } from '../constants';

interface EarningsTableProps {
    earnings: GemEarning[];
    sortState: SortState;
    onSort: (column: SortColumn) => void;
}

export const EarningsTable: React.FC<EarningsTableProps> = ({ earnings, sortState, onSort }) => {
    const getSortIcon = (column: SortColumn) => {
        if (sortState.column !== column) {
            return <span className="text-gray-400">↕️</span>;
        }
        return sortState.direction === 'asc' ? <span className="text-blue-600">↑</span> : <span className="text-blue-600">↓</span>;
    };

    const SortableHeader = ({ column, children }: { column: SortColumn; children: React.ReactNode }) => (
        <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
            onClick={() => onSort(column)}
        >
            <div className="flex items-center space-x-1">
                <span>{children}</span>
                {getSortIcon(column)}
            </div>
        </th>
    );
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <SortableHeader column="timestamp">Date</SortableHeader>
                            <SortableHeader column="game_name">Game Name</SortableHeader>
                            <SortableHeader column="rule_id">Rule ID (Quest)</SortableHeader>
                            <SortableHeader column="type">Type</SortableHeader>
                            <SortableHeader column="increase">Gems Earned</SortableHeader>
                            <SortableHeader column="total">Total by Quest</SortableHeader>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {earnings.map((earning, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatDate(earning.timestamp)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="max-w-xs truncate" title={earning.game_name}>
                                        {earning.game_name}
                                    </div>
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
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    {UI_TEXT.NO_EARNINGS}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
