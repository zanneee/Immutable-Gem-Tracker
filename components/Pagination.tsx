interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage: number;
        if (totalPages <= maxVisiblePages) {
            startPage = 1;
        } else if (currentPage <= 3) {
            startPage = 1;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - maxVisiblePages + 1;
        } else {
            startPage = currentPage - 2;
        }

        for (let i = 0; i < Math.min(maxVisiblePages, totalPages); i++) {
            pages.push(startPage + i);
        }

        return pages;
    };

    return (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        First
                    </button>

                    <button
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {getPageNumbers().map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`px-3 py-1 text-sm border rounded-md ${currentPage === pageNum
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>

                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};
