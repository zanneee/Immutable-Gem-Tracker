import type { GemEarning, FilterState, ChartDataPoint } from '../types';

export const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatDateShort = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

export const filterEarnings = (
    earnings: GemEarning[],
    filters: FilterState
): GemEarning[] => {
    return earnings.filter(earning => {
        const matchesSearch = filters.searchQuery === '' ||
            earning.rule_id.toLowerCase().includes(filters.searchQuery.toLowerCase());

        const earningDate = earning.timestamp.split('T')[0];
        const matchesDateFrom = filters.dateFromFilter === '' || earningDate >= filters.dateFromFilter;
        const matchesDateTo = filters.dateToFilter === '' || earningDate <= filters.dateToFilter;

        const matchesType = filters.typeFilter === 'all' || earning.type === filters.typeFilter;

        return matchesSearch && matchesDateFrom && matchesDateTo && matchesType;
    });
};

export const sortEarningsByDate = (earnings: GemEarning[]): GemEarning[] => {
    return [...earnings].sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
};

export const paginateData = <T>(
    data: T[],
    page: number,
    itemsPerPage: number
): { paginatedData: T[]; totalPages: number; startIndex: number; endIndex: number } => {
    if (itemsPerPage === -1) {
        return {
            paginatedData: data,
            totalPages: 1,
            startIndex: 0,
            endIndex: data.length
        };
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return { paginatedData, totalPages, startIndex, endIndex };
};

export const prepareChartData = (earnings: GemEarning[]): ChartDataPoint[] => {
    const dailyEarnings: { [key: string]: ChartDataPoint } = {};

    earnings.forEach(earning => {
        const date = earning.timestamp.split('T')[0];

        if (!dailyEarnings[date]) {
            dailyEarnings[date] = { date, total: 0, onChain: 0, offChain: 0 };
        }

        dailyEarnings[date].total += earning.increase;
        if (earning.type === 'on_chain') {
            dailyEarnings[date].onChain += earning.increase;
        } else {
            dailyEarnings[date].offChain += earning.increase;
        }
    });

    return Object.values(dailyEarnings)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-30);
};
