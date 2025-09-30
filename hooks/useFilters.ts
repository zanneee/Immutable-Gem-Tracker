import { useState, useCallback } from 'react';
import type { FilterState } from '../types';
import { DEFAULT_FILTERS } from '../constants';

export const useFilters = () => {
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

    const updateFilter = useCallback(<K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
    }, []);

    return {
        filters,
        updateFilter,
        resetFilters
    };
};
