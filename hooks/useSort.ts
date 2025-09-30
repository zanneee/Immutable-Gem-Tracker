import { useState, useCallback } from 'react';
import type { SortState, SortColumn, SortDirection } from '../types';
import { DEFAULT_SORT } from '../constants';

const getDefaultSortDirection = (column: SortColumn): SortDirection => {
    // Numbers and dates default to descending, text fields to ascending
    return column === 'timestamp' || column === 'increase' || column === 'total' ? 'desc' : 'asc';
};

export const useSort = (
    initialColumn: SortColumn | null = DEFAULT_SORT.column,
    initialDirection: SortDirection = DEFAULT_SORT.direction
) => {
    const [sortState, setSortState] = useState<SortState>({
        column: initialColumn,
        direction: initialDirection
    });

    const handleSort = useCallback((column: SortColumn) => {
        setSortState(prevState => {
            if (prevState.column === column) {
                // If clicking the same column, toggle direction
                return {
                    column,
                    direction: prevState.direction === 'asc' ? 'desc' : 'asc'
                };
            } else {
                // If clicking a new column, use smart default direction
                return {
                    column,
                    direction: getDefaultSortDirection(column)
                };
            }
        });
    }, []);

    const resetSort = useCallback(() => {
        setSortState({
            column: initialColumn,
            direction: initialDirection
        });
    }, [initialColumn, initialDirection]);

    return {
        sortState,
        handleSort,
        resetSort
    };
};
