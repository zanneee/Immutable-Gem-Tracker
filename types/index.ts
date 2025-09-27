export interface GemEarning {
    increase: number;
    type: 'on_chain' | 'off_chain';
    rule_id: string;
    timestamp: string;
    total: number;
}

export interface GemStats {
    totalGems: number;
    totalTransactions: number;
    onChainEarnings: number;
    offChainEarnings: number;
    latestActivity: string;
}

export interface GemResponse {
    message: string;
    code: number;
    result: {
        latest_earnings: GemEarning[];
    };
    stats: GemStats;
}

export interface FilterState {
    searchQuery: string;
    dateFromFilter: string;
    dateToFilter: string;
    typeFilter: 'all' | 'on_chain' | 'off_chain';
}

export interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
}

export interface ChartDataPoint {
    date: string;
    total: number;
    onChain: number;
    offChain: number;
}
