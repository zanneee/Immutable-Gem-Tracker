import type { GemEarning, FilterState, ChartDataPoint, SortState, SortColumn, SelectOption } from '../types';
import { UI_CONFIG } from '../constants';

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
        // Rule ID filter - if array is empty, show all; otherwise check if rule_id is in selected values
        const matchesSearch = filters.searchQuery.length === 0 ||
            filters.searchQuery.some(query =>
                earning.rule_id.toLowerCase().includes(query.toLowerCase())
            );

        // Game name filter - if array is empty, show all; otherwise check if game_name is in selected values
        const matchesGameName = filters.gameNameFilter.length === 0 ||
            filters.gameNameFilter.some(gameName =>
                earning.game_name.toLowerCase().includes(gameName.toLowerCase())
            );

        const earningDate = earning.timestamp.split('T')[0];
        const matchesDateFrom = filters.dateFromFilter === '' || earningDate >= filters.dateFromFilter;
        const matchesDateTo = filters.dateToFilter === '' || earningDate <= filters.dateToFilter;

        const matchesType = filters.typeFilter === 'all' || earning.type === filters.typeFilter;

        return matchesSearch && matchesGameName && matchesDateFrom && matchesDateTo && matchesType;
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

export const sortEarnings = (
    earnings: GemEarning[],
    sortState: SortState
): GemEarning[] => {
    if (!sortState.column) {
        return [...earnings];
    }

    return [...earnings].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortState.column) {
            case 'timestamp':
                aValue = new Date(a.timestamp).getTime();
                bValue = new Date(b.timestamp).getTime();
                break;
            case 'game_name':
                aValue = a.game_name.toLowerCase();
                bValue = b.game_name.toLowerCase();
                break;
            case 'rule_id':
                aValue = a.rule_id.toLowerCase();
                bValue = b.rule_id.toLowerCase();
                break;
            case 'type':
                aValue = a.type;
                bValue = b.type;
                break;
            case 'increase':
                aValue = a.increase;
                bValue = b.increase;
                break;
            case 'total':
                aValue = a.total;
                bValue = b.total;
                break;
            default:
                return 0;
        }

        if (aValue < bValue) {
            return sortState.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortState.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
};

export const getUniqueRuleIds = (earnings: GemEarning[]): SelectOption[] => {
    const uniqueRuleIds = [...new Set(earnings.map(earning => earning.rule_id))]
        .filter(ruleId => ruleId && ruleId.trim() !== '')
        .sort();

    return uniqueRuleIds.map(ruleId => ({
        value: ruleId,
        label: ruleId
    }));
};

export const getUniqueGameNames = (earnings: GemEarning[]): SelectOption[] => {
    const uniqueGameNames = [...new Set(earnings.map(earning => earning.game_name))]
        .filter(gameName => gameName && gameName.trim() !== '')
        .sort();

    return uniqueGameNames.map(gameName => ({
        value: gameName,
        label: gameName
    }));
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
        .slice(-UI_CONFIG.CHART_DAYS);
};
