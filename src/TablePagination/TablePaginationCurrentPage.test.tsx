import React from 'react';
import { render, screen } from '@testing-library/react';
import TablePaginationCurrentPage from './TablePaginationCurrentPage';

describe('Table Pagination - current page - Testing', () => {
    test('renders table pagination - current page container', () => {
        render(<TablePaginationCurrentPage page={1} currentpageRowsLength={10} count={82} />);
        expect(screen.getByTestId('table-pagination-current-page-container')).toBeVisible();
        expect(screen.getByText('1 - 10 of 82')).toBeInTheDocument();
    });

    test('renders table pagination - page 1 - text is rendered correctly', () => {
        render(<TablePaginationCurrentPage page={1} currentpageRowsLength={10} count={82} />);
        expect(screen.getByText('1 - 10 of 82')).toBeInTheDocument();
    });

    test('renders table pagination - last page - text is rendered correctly', () => {
        render(<TablePaginationCurrentPage page={9} currentpageRowsLength={2} count={82} />);
        expect(screen.getByText('81 - 82 of 82')).toBeInTheDocument();
    });

    test('renders table pagination - 2nd page - text is rendered correctly', () => {
        render(<TablePaginationCurrentPage page={2} currentpageRowsLength={10} count={82} />);
        expect(screen.getByText('11 - 20 of 82')).toBeInTheDocument();
    });
});

