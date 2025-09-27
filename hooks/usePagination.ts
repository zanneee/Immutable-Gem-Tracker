import { useState } from 'react';
import type { PaginationState } from '../types';

export const usePagination = (initialItemsPerPage: number = 50) => {
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 1,
        itemsPerPage: initialItemsPerPage
    });

    const setCurrentPage = (page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const setItemsPerPage = (itemsPerPage: number) => {
        setPagination({ currentPage: 1, itemsPerPage });
    };

    const resetToFirstPage = () => {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    return {
        pagination,
        setCurrentPage,
        setItemsPerPage,
        resetToFirstPage
    };
};
