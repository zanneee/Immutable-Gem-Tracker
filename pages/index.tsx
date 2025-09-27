import { useMemo } from 'react';
import Head from 'next/head';
import { useGemData } from '../hooks/useGemData';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';
import {
    GemChart,
    StatsOverview,
    WalletInput,
    Filters,
    EarningsTable,
    Pagination
} from '../components';
import { filterEarnings, sortEarningsByDate, paginateData } from '../utils';

export default function Home() {
    const { gemData, loading, error, fetchGemData } = useGemData();
    const { filters, updateFilter, resetFilters } = useFilters();
    const { pagination, setCurrentPage, setItemsPerPage, resetToFirstPage } = usePagination();

    const processedData = useMemo(() => {
        if (!gemData) return null;

        const filteredData = filterEarnings(gemData.result.latest_earnings, filters);
        const sortedData = sortEarningsByDate(filteredData);
        const paginatedResult = paginateData(
            sortedData,
            pagination.currentPage,
            pagination.itemsPerPage
        );

        return {
            filtered: sortedData,
            paginated: paginatedResult.paginatedData,
            totalPages: paginatedResult.totalPages,
            startIndex: paginatedResult.startIndex,
            endIndex: paginatedResult.endIndex
        };
    }, [gemData, filters, pagination]);

    const handleFilterChange = <K extends keyof typeof filters>(
        key: K,
        value: typeof filters[K]
    ) => {
        updateFilter(key, value);
        resetToFirstPage();
    };

    const handleResetFilters = () => {
        resetFilters();
        resetToFirstPage();
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
    };

    return (
        <>
            <Head>
                <title>Gem Tracker - Immutable Rewards</title>
                <meta name="description" content="Track your Immutable gem rewards and earnings" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">💎 Gem Tracker</h1>
                        <p className="text-gray-600">Track your Immutable gem rewards and earnings</p>
                    </div>

                    <WalletInput
                        onSubmit={fetchGemData}
                        loading={loading}
                        error={error}
                    />

                    {gemData && (
                        <div className="max-w-6xl mx-auto">
                            <StatsOverview stats={gemData.stats} />
                            <GemChart earnings={gemData.result.latest_earnings} />

                            {processedData && (
                                <Filters
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                    onReset={handleResetFilters}
                                    resultCount={processedData.filtered.length}
                                    totalCount={gemData.result.latest_earnings.length}
                                    itemsPerPage={pagination.itemsPerPage}
                                    onItemsPerPageChange={handleItemsPerPageChange}
                                    startIndex={processedData.startIndex}
                                    endIndex={processedData.endIndex}
                                />
                            )}

                            {processedData && (
                                <>
                                    <EarningsTable earnings={processedData.paginated} />
                                    {pagination.itemsPerPage !== -1 && (
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                            <Pagination
                                                currentPage={pagination.currentPage}
                                                totalPages={processedData.totalPages}
                                                onPageChange={setCurrentPage}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}