import { useState } from 'react';
import type { FilterState } from '../types';

export const useFilters = () => {
    const [filters, setFilters] = useState<FilterState>({
        searchQuery: '',
        dateFromFilter: '',
        dateToFilter: '',
        typeFilter: 'all'
    });

    const updateFilter = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            searchQuery: '',
            dateFromFilter: '',
            dateToFilter: '',
            typeFilter: 'all'
        });
    };

    return {
        filters,
        updateFilter,
        resetFilters
    };
};
