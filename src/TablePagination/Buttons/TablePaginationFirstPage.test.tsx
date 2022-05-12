import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablePaginationFirstPage from './TablePaginationFirstPage';

describe('Table Pagination - first page button - Render - Testing', () => {
    beforeEach(() => {
        const mockSetURLState = jest.fn();
        render(<TablePaginationFirstPage previous={null} setURL={mockSetURLState} />);
    });

    test('renders table pagination - first page container', () => {
        expect(screen.getByTestId('pagination-first-page-container')).toBeVisible();
    });

    test('renders table pagination - first page button', () => {
        expect(screen.getByTestId('characters-table-pagination-first-page-button')).toBeVisible();
    });

    test('renders table pagination - first page icon', () => {
        expect(screen.getByTestId('characters-table-pagination-first-page-icon')).toBeVisible();
    });
});

describe('Table Pagination - first page button behavior - Testing', () => {
    test('first page button is disabled in 1st page', () => {
        const mockSetURLState = jest.fn();
        render(<TablePaginationFirstPage previous={null} setURL={mockSetURLState} />);
        expect(screen.getByTestId('characters-table-pagination-first-page-button')).toBeDisabled();
    });

    test('first page button is not disabled in pages other than 1st page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationFirstPage
                previous={'https://swapi.dev/api/people/?page=7'}
                setURL={mockSetURLState}
            />
        );
        expect(screen.getByTestId('characters-table-pagination-first-page-button')).not.toBeDisabled();
    });

    test('first page button on click loads first page from 6th page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationFirstPage
                previous={'https://swapi.dev/api/people/?page=5'}
                setURL={mockSetURLState}
            />
        );
        fireEvent.click(screen.getByTestId('characters-table-pagination-first-page-button'));
        expect(mockSetURLState).toHaveBeenCalledTimes(1);
        expect(mockSetURLState).toBeCalledWith('https://swapi.dev/api/people/?page=1');
    });
});

