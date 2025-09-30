// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://api.immutable.com/v1/rewards/gems',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 2,
    RETRY_DELAYS: [1000, 2000], // Exponential backoff delays
} as const;

// UI Configuration
export const UI_CONFIG = {
    CHART_DAYS: 30,
    DEFAULT_ITEMS_PER_PAGE: 10,
    ITEMS_PER_PAGE_OPTIONS: [10, 50, 100, -1],
    MAX_DISPLAY_ITEMS: 2,
    MAX_TRUNCATE_LENGTH: 200,
} as const;

// Default Values
export const DEFAULT_FILTERS = {
    searchQuery: [],
    gameNameFilter: [],
    dateFromFilter: '',
    dateToFilter: '',
    typeFilter: 'all' as const,
};

export const DEFAULT_PAGINATION = {
    currentPage: 1,
    itemsPerPage: UI_CONFIG.DEFAULT_ITEMS_PER_PAGE,
};

export const DEFAULT_SORT = {
    column: 'timestamp' as const,
    direction: 'desc' as const,
};

// Error Messages
export const ERROR_MESSAGES = {
    WALLET_REQUIRED: 'Please enter a wallet address',
    INVALID_RESPONSE: 'Received invalid response from server. Please try again.',
    TIMEOUT: 'Request timed out. The API is taking too long to respond. Please try again.',
    SERVER_ERROR: 'Server error. Please try again.',
    PARSE_ERROR: 'Failed to parse server response',
    NETWORK_ERROR: 'Network error occurred',
} as const;

// UI Text
export const UI_TEXT = {
    APP_TITLE: '💎 Gem Tracker',
    APP_DESCRIPTION: 'Track your Immutable gem rewards and earnings',
    LOADING: 'Loading...',
    TRACK_GEMS: 'Track Gems',
    NO_EARNINGS: 'No earnings found matching your filters',
    RESET_FILTERS: 'Reset Filters',
    SELECT_ALL: 'Select All',
    CLEAR_ALL: 'Clear All',
    SEARCH_PLACEHOLDER: 'Search...',
} as const;

// Stat Card Configuration
export const STAT_CARDS = {
    TOTAL_GEMS: {
        icon: '💎',
        title: 'Total Gems',
        bgColor: 'bg-blue-100',
    },
    TOTAL_TRANSACTIONS: {
        icon: '📊',
        title: 'Total Transactions',
        bgColor: 'bg-green-100',
    },
    GAMES_PLAYED: {
        icon: '🎮',
        title: 'Games Played',
        bgColor: 'bg-pink-100',
    },
    ON_CHAIN: {
        icon: '⛓️',
        title: 'On-Chain',
        bgColor: 'bg-purple-100',
    },
    OFF_CHAIN: {
        icon: '🌐',
        title: 'Off-Chain',
        bgColor: 'bg-orange-100',
    },
} as const;
