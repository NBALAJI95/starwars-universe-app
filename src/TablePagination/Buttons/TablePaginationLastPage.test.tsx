import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablePaginationLastPage from './TablePaginationLastPage';

describe('Table Pagination - last page button - Render - Testing', () => {
    beforeEach(() => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationLastPage
                next={null} setURL={mockSetURLState} rowsLength={10} count={82}
            />
        );
    });

    test('renders table pagination - last page container', () => {
        expect(screen.getByTestId('pagination-last-page-container')).toBeVisible();
    });

    test('renders table pagination - last page button', () => {
        expect(screen.getByTestId('characters-table-pagination-last-page-button')).toBeVisible();
    });

    test('renders table pagination - last page icon', () => {
        expect(screen.getByTestId('characters-table-pagination-last-page-icon')).toBeVisible();
    });
});

describe('Table Pagination - last page button behavior - Testing', () => {
    test('last page button is disabled in last page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationLastPage
                next={null} setURL={mockSetURLState} rowsLength={2} count={82}
            />);
        expect(screen.getByTestId('characters-table-pagination-last-page-button')).toBeDisabled();
    });

    test('last page button is not disabled in pages other than last page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationLastPage
                next={'https://swapi.dev/api/people/?page=7'}
                setURL={mockSetURLState} rowsLength={10} count={82}
            />
        );
        expect(screen.getByTestId('characters-table-pagination-last-page-button')).not.toBeDisabled();
    });

    test('last page button on click loads last page from 1st page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationLastPage
                next={'https://swapi.dev/api/people/?page=1'}
                setURL={mockSetURLState} rowsLength={10} count={82}
            />
        );
        fireEvent.click(screen.getByTestId('characters-table-pagination-last-page-button'));
        expect(mockSetURLState).toHaveBeenCalledTimes(1);
        expect(mockSetURLState).toBeCalledWith('https://swapi.dev/api/people/?page=9');
    });

    test('last page button on click loads last page from 4th page', () => {
        const mockSetURLState = jest.fn();
        render(
            <TablePaginationLastPage
                next={'https://swapi.dev/api/people/?page=4'}
                setURL={mockSetURLState} rowsLength={10} count={82}
            />
        );
        fireEvent.click(screen.getByTestId('characters-table-pagination-last-page-button'));
        expect(mockSetURLState).toHaveBeenCalledTimes(1);
        expect(mockSetURLState).toBeCalledWith('https://swapi.dev/api/people/?page=9');
    });
});
