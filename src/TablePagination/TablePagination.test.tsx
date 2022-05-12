import React from 'react';
import { render, screen } from '@testing-library/react';
import { CHARACTER_RESPONSE_PAGE_1 } from '../testResponse';
import TablePagination from './TablePagination';
import {ICharacter} from '../App';

function getTablePaginationComponent(rows: ICharacter[] = [], mockSetURLState: () => {})
{
    return (
        <TablePagination
            rows={rows}
            previous={CHARACTER_RESPONSE_PAGE_1.previous}
            next={CHARACTER_RESPONSE_PAGE_1.next}
            page={1}
            count={CHARACTER_RESPONSE_PAGE_1.count}
            setURL={mockSetURLState}
        />
    );
};

describe('Table Pagination Testing', () => {
    test('renders Pagination container', () => {
        const mockSetURLState = jest.fn();
        render(getTablePaginationComponent(CHARACTER_RESPONSE_PAGE_1.results, mockSetURLState));
        expect(screen.getByTestId('characters-table-pagination')).toBeVisible();
    });

    test('renders No Record found when row data is empty', () => {
        const mockSetURLState = jest.fn();
        render(getTablePaginationComponent([], mockSetURLState));
        expect(
            screen.getByTestId('characters-table-pagination-records-not-found-container')
        ).toBeVisible();
    });

    describe('Rendering when row data is not empty', () => {
        test('renders Records found container', () => {
            const mockSetURLState = jest.fn();
            render(getTablePaginationComponent(CHARACTER_RESPONSE_PAGE_1.results, mockSetURLState));
            expect(
                screen.getByTestId('characters-table-pagination-records-found-container')
            ).toBeVisible();
        });

    //     test('renders pagination first page button and go to first page icon', () => {
    //         expect(
    //             screen.getByTestId('characters-table-pagination-first-page-button')
    //         ).toBeVisible();
    //         expect(
    //             screen.getByTestId('characters-table-pagination-first-page-icon')
    //         ).toBeVisible();
    //     });
    //
    //     test('renders pagination previous page button and go to previous page icon', () => {
    //         expect(
    //             screen.getByTestId('characters-table-previous-page-button')
    //         ).toBeVisible();
    //         expect(
    //             screen.getByTestId('characters-table-pagination-previous-page-icon')
    //         ).toBeVisible();
    //     });
    //
    //     test('renders pagination next page button and go to next page icon', () => {
    //         expect(
    //             screen.getByTestId('characters-table-pagination-next-page-button')
    //         ).toBeVisible();
    //         expect(
    //             screen.getByTestId('characters-table-pagination-next-page-icon')
    //         ).toBeVisible();
    //     });
    //
    //     test('renders pagination last page button and go to last page icon', () => {
    //         expect(
    //             screen.getByTestId('characters-table-pagination-last-page-button')
    //         ).toBeVisible();
    //         expect(
    //             screen.getByTestId('characters-table-pagination-last-page-icon')
    //         ).toBeVisible();
    //     });
    });

    // test('renders tbody', () => {
    //     render(<TableBody rows={CHARACTER_RESPONSE_PAGE_1.results} columns={cols} />);
    //     expect(screen.getByTestId('characters-table-body')).toBeVisible();
    // });

    // test('renders all given rows', () => {
    //     render(<TableBody rows={CHARACTER_RESPONSE_PAGE_1.results} columns={cols} />);
    //     const list = screen.getAllByTestId('characters-table-body-row');
    //     expect(list.length).toBe(CHARACTER_RESPONSE_PAGE_1.results.length)
    // });
    //
    // test('renders all given cells with intended values', () => {
    //     render(<TableBody rows={CHARACTER_RESPONSE_PAGE_1.results} columns={cols} />);
    //     const list = screen.getAllByTestId('characters-table-body-cell');
    //     const listNames = list.map(item => item.textContent);
    //     const tableCellValues = [];
    //
    //     for (const row of CHARACTER_RESPONSE_PAGE_1.results) {
    //         for (const column of cols) {
    //             tableCellValues.push(row[column.field]);
    //         }
    //     }
    //
    //     expect(listNames.sort()).toEqual(tableCellValues.sort());
    //     expect(list.length).toBe(CHARACTER_RESPONSE_PAGE_1.results.length * cols.length)
    // });
});

