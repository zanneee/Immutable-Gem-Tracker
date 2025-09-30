export interface GemEarning {
    increase: number;
    type: 'on_chain' | 'off_chain';
    rule_id: string;
    timestamp: string;
    total: number;
    game_name: string;
}

export interface GemStats {
    totalGems: number;
    totalTransactions: number;
    onChainEarnings: number;
    offChainEarnings: number;
    gameCount: number;
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
    searchQuery: string[];
    gameNameFilter: string[];
    dateFromFilter: string;
    dateToFilter: string;
    typeFilter: 'all' | 'on_chain' | 'off_chain';
}

export interface SelectOption {
    value: string;
    label: string;
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

export type SortColumn = 'timestamp' | 'game_name' | 'rule_id' | 'type' | 'increase' | 'total';
export type SortDirection = 'asc' | 'desc';

export interface SortState {
    column: SortColumn | null;
    direction: SortDirection;
}

// Utility types for better type safety
export type TransactionType = GemEarning['type'];
export type FilterKey = keyof FilterState;

// API Response types for better error handling
export interface ApiError {
    message: string;
    error?: string;
    wallet?: string;
    timestamp?: string;
}

// Component prop types for consistency
export interface BaseComponentProps {
    className?: string;
}

export interface LoadingState {
    loading: boolean;
    error: string;
}
