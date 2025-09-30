import { useState, useCallback } from 'react';
import type { PaginationState } from '../types';
import { DEFAULT_PAGINATION, UI_CONFIG } from '../constants';

export const usePagination = (initialItemsPerPage: number = UI_CONFIG.DEFAULT_ITEMS_PER_PAGE) => {
    const [pagination, setPagination] = useState<PaginationState>({
        ...DEFAULT_PAGINATION,
        itemsPerPage: initialItemsPerPage
    });

    const setCurrentPage = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    }, []);

    const setItemsPerPage = useCallback((itemsPerPage: number) => {
        setPagination({ currentPage: 1, itemsPerPage });
    }, []);

    const resetToFirstPage = useCallback(() => {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    }, []);

    return {
        pagination,
        setCurrentPage,
        setItemsPerPage,
        resetToFirstPage
    };
};
