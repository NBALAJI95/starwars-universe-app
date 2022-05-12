import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablePaginationNextPage from './TablePaginationNextPage';

describe('Table Pagination - next page button - Render - Testing', () => {
    beforeEach(() => {
        const mockSetURLState = jest.fn();
        render(<TablePaginationNextPage next={null} setURL={mockSetURLState} />);
    });

    test('renders table pagination - next page container', () => {
        expect(screen.getByTestId('pagination-next-page-container')).toBeVisible();
    });

    test('renders table pagination - next page button', () => {
        expect(screen.getByTestId('characters-table-pagination-next-page-button')).toBeVisible();
    });

    test('renders table pagination - next page icon', () => {
        expect(screen.getByTestId('characters-table-pagination-next-page-icon')).toBeVisible();
    });
});

describe('Table Pagination - next page button behavior - Testing', () => {
    test('next page button is disabled in last page', () => {
        const mockSetURLState = jest.fn();
        render(<TablePaginationNextPage next={null} setURL={mockSetURLState} />);
        expect(screen.getByTestId('characters-table-pagination-next-page-button')).toBeDisabled();
    });

    test('next page button is not disabled in pages other than last page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationNextPage
                next={'https://swapi.dev/api/people/?page=7'}
                setURL={mockSetURLState}
            />
        );
        expect(screen.getByTestId('characters-table-pagination-next-page-button')).not.toBeDisabled();
    });

    test('next page button on click loads next page (7th) from 6th page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationNextPage
                next={'https://swapi.dev/api/people/?page=7'}
                setURL={mockSetURLState}
            />
        );
        fireEvent.click(screen.getByTestId('characters-table-pagination-next-page-button'));
        expect(mockSetURLState).toHaveBeenCalledTimes(1);
        expect(mockSetURLState).toBeCalledWith('https://swapi.dev/api/people/?page=7');
    });
});
