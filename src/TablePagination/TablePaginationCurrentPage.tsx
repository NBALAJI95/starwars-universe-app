import React from 'react';

interface ITablePaginationCurrentPageProps {
    page: number;
    currentpageRowsLength: number;
    count: number;
};

export default ({ page, currentpageRowsLength, count }: ITablePaginationCurrentPageProps) => {
    return (
        <span data-testid="table-pagination-current-page-container">
            {(page - 1) * 10 + 1} - {(page - 1) * 10 + currentpageRowsLength} of {count}
        </span>
    );
};