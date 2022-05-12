import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablePaginationPreviousPage from './TablePaginationPreviousPage';

describe('Table Pagination - previous page button - Render - Testing', () => {
    beforeEach(() => {
        const mockSetURLState = jest.fn();
        render(<TablePaginationPreviousPage previous={null} setURL={mockSetURLState} />);
    });

    test('renders table pagination - previous page container', () => {
        expect(screen.getByTestId('pagination-previous-page-container')).toBeVisible();
    });

    test('renders table pagination - previous page button', () => {
        expect(screen.getByTestId('characters-table-pagination-previous-page-button')).toBeVisible();
    });

    test('renders table pagination - previous page icon', () => {
        expect(screen.getByTestId('characters-table-pagination-previous-page-icon')).toBeVisible();
    });
});

describe('Table Pagination - previous page button behavior - Testing', () => {
    test('previous page button is disabled in 1st page', () => {
        const mockSetURLState = jest.fn();
        render(<TablePaginationPreviousPage previous={null} setURL={mockSetURLState} />);
        expect(screen.getByTestId('characters-table-pagination-previous-page-button')).toBeDisabled();
    });

    test('previous page button is not disabled in pages other than 1st page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationPreviousPage
                previous={'https://swapi.dev/api/people/?page=7'}
                setURL={mockSetURLState}
            />
        );
        expect(screen.getByTestId('characters-table-pagination-previous-page-button')).not.toBeDisabled();
    });

    test('previous page button on click loads previous page from 6th page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationPreviousPage
                previous={'https://swapi.dev/api/people/?page=5'}
                setURL={mockSetURLState}
            />
        );
        fireEvent.click(screen.getByTestId('characters-table-pagination-previous-page-button'));
        expect(mockSetURLState).toHaveBeenCalledTimes(1);
        expect(mockSetURLState).toBeCalledWith('https://swapi.dev/api/people/?page=5');
    });
});

