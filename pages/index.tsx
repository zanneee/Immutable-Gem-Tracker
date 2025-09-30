import { useMemo, useCallback } from 'react';
import Head from 'next/head';
import { useGemData } from '../hooks/useGemData';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';
import { useSort } from '../hooks/useSort';
import { UI_TEXT } from '../constants';
import {
    GemChart,
    StatsOverview,
    WalletInput,
    Filters,
    EarningsTable,
    Pagination
} from '../components';
import { filterEarnings, sortEarnings, paginateData, getUniqueRuleIds, getUniqueGameNames } from '../utils';

export default function Home() {
    const { gemData, loading, error, fetchGemData } = useGemData();
    const { filters, updateFilter, resetFilters } = useFilters();
    const { pagination, setCurrentPage, setItemsPerPage, resetToFirstPage } = usePagination();
    const { sortState, handleSort, resetSort } = useSort('timestamp', 'desc');

    const processedData = useMemo(() => {
        if (!gemData) return null;

        const filteredData = filterEarnings(gemData.result.latest_earnings, filters);
        const sortedData = sortEarnings(filteredData, sortState);
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
    }, [gemData, filters, sortState, pagination]);

    const filterOptions = useMemo(() => {
        if (!gemData) return { ruleIdOptions: [], gameNameOptions: [] };

        return {
            ruleIdOptions: getUniqueRuleIds(gemData.result.latest_earnings),
            gameNameOptions: getUniqueGameNames(gemData.result.latest_earnings)
        };
    }, [gemData]);

    const handleFilterChange = useCallback(<K extends keyof typeof filters>(
        key: K,
        value: typeof filters[K]
    ) => {
        updateFilter(key, value);
        resetToFirstPage();
    }, [updateFilter, resetToFirstPage]);

    const handleResetFilters = useCallback(() => {
        resetFilters();
        resetSort();
        resetToFirstPage();
    }, [resetFilters, resetSort, resetToFirstPage]);

    const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
    }, [setItemsPerPage]);

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
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{UI_TEXT.APP_TITLE}</h1>
                        <p className="text-gray-600">{UI_TEXT.APP_DESCRIPTION}</p>
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
                                    ruleIdOptions={filterOptions.ruleIdOptions}
                                    gameNameOptions={filterOptions.gameNameOptions}
                                />
                            )}

                            {processedData && (
                                <>
                                    <EarningsTable
                                        earnings={processedData.paginated}
                                        sortState={sortState}
                                        onSort={handleSort}
                                    />
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