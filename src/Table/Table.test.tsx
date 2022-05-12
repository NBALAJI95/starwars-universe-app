import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from "./Table";
import { CHARACTER_RESPONSE_PAGE_1 } from '../testResponse';
import { IProps } from './Table';

const mockSetURLState = jest.fn();
const mockSetTableState = jest.fn();
const mockSetSearchState = jest.fn();
const title = "SW Characters";
const props: IProps = {
    title: 'SW Characters',
    columns: [],
    rows: CHARACTER_RESPONSE_PAGE_1.results,
    page: 1,
    urlState: ['', mockSetURLState],
    tableState: [CHARACTER_RESPONSE_PAGE_1, mockSetTableState],
    searchState: ['test', mockSetSearchState]
};

describe('', () => {
    beforeEach(() => {
        const {
            title,
            columns, rows,
            page,
            urlState,
            tableState,
            searchState
        } = props;
        render(
            <Table
                title={title} columns={columns} rows={rows} page={page}
                urlState={urlState} tableState={tableState}
                searchState={searchState}
            />
        );
    });

    test('renders table container', () => {
        expect(screen.getByTestId("table-container")).toBeVisible();
    });

    test('renders table search bar container', () => {
        expect(screen.getByTestId("table-search-bar-container")).toBeVisible();
    });

    test('renders table title', () => {
        expect(screen.getByText(title)).toBeVisible();
    });

    test('renders table search bar wrapper with search input', () => {
        expect(screen.getByTestId("table-search-bar-wrapper")).toBeVisible();
    });

    test('renders table element', () => {
        expect(screen.getByTestId('characters-table')).toBeVisible();
    });
});