import type { FilterState } from '../types';

interface FiltersProps {
    filters: FilterState;
    onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    onReset: () => void;
    resultCount: number;
    totalCount: number;
    itemsPerPage: number;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    startIndex: number;
    endIndex: number;
}

export const Filters: React.FC<FiltersProps> = ({
    filters,
    onFilterChange,
    onReset,
    resultCount,
    totalCount,
    itemsPerPage,
    onItemsPerPageChange,
    startIndex,
    endIndex
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                    onClick={onReset}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Reset Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Rule ID (external_id)
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={filters.searchQuery}
                        onChange={(e) => onFilterChange('searchQuery', e.target.value)}
                        placeholder="e.g., daily-gems-claim"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
                        From Date
                    </label>
                    <input
                        type="date"
                        id="dateFrom"
                        value={filters.dateFromFilter}
                        onChange={(e) => onFilterChange('dateFromFilter', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
                        To Date
                    </label>
                    <input
                        type="date"
                        id="dateTo"
                        value={filters.dateToFilter}
                        onChange={(e) => onFilterChange('dateToFilter', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                    </label>
                    <select
                        id="type"
                        value={filters.typeFilter}
                        onChange={(e) => onFilterChange('typeFilter', e.target.value as 'all' | 'on_chain' | 'off_chain')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Types</option>
                        <option value="on_chain">On-Chain</option>
                        <option value="off_chain">Off-Chain</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    {itemsPerPage === -1 ? (
                        <>Showing all {resultCount} filtered transactions</>
                    ) : (
                        <>Showing {startIndex + 1}-{Math.min(endIndex, resultCount)} of {resultCount} filtered transactions</>
                    )}
                    {resultCount !== totalCount && (
                        <span className="text-gray-500"> ({totalCount} total)</span>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Show:</span>
                    <div className="flex space-x-1">
                        {[10, 50, 100, -1].map((size) => (
                            <button
                                key={size}
                                onClick={() => onItemsPerPageChange(size)}
                                className={`px-3 py-1 text-sm border rounded-md ${itemsPerPage === size
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {size === -1 ? 'All' : size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
