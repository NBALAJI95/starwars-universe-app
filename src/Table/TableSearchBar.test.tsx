import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableSearchBar, {fetchSearchData} from './TableSearchBar';
import {SEARCH_RESPONSE} from '../testResponse';

describe('testing fetchSearchData', () => {
    let originalFetch: any;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => (
            Promise.resolve({
                json: () => Promise.resolve(SEARCH_RESPONSE),
            }))
        ) as jest.Mock;
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test('fetchSearchData makes fetch request with value provided', async () => {
        const setTableDataMock = jest.fn();
        await fetchSearchData('Darth', setTableDataMock);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://swapi.dev/api/people?search=Darth`);
    });

    test('fetchSearchData sets tableData with the fetch response', async () => {
        const setTableDataMock = jest.fn();
        await fetchSearchData('Darth', setTableDataMock);
        expect(setTableDataMock).toHaveBeenCalledTimes(1);
        expect(setTableDataMock).toHaveBeenCalledWith(SEARCH_RESPONSE);
    });
});

describe('Table SearchBar Testing', () => {
    test('renders search icon', () => {
        const setSearchStateMock = jest.fn(), setTableData = jest.fn();
        render(<TableSearchBar searchState={['', setSearchStateMock]} setTableData={setTableData} />);
        expect(screen.getByTestId('search-icon')).toBeVisible();
    });

    test('renders table search input field with given state value', () => {
        const setSearchStateMock = jest.fn(), setTableData = jest.fn();
        render(
            <TableSearchBar
                searchState={['test search', setSearchStateMock]}
                setTableData={setTableData}
            />
        );
        expect(screen.getByTestId('table-search-field')).toBeVisible();
        expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
    });

    test('table search input sets onChange value successfully', () => {
        const originalUseCallback = React.useCallback;
        const debounceLoadDataMock = jest.fn();
        // @ts-ignore
        (React.useCallback as jest.Mock) = (() => debounceLoadDataMock);
        const setSearchStateMock = jest.fn(), setTableDataMock = jest.fn();

        render(
            <TableSearchBar
                searchState={['test search', setSearchStateMock]}
                setTableData={setTableDataMock}
            />
        );

        fireEvent.change(screen.getByTestId('table-search-field'), {target: {value: 'Darth'}});
        expect(setSearchStateMock).toHaveBeenCalledWith('Darth');
        expect(debounceLoadDataMock).toHaveBeenCalledWith('Darth', setTableDataMock);

        React.useCallback = originalUseCallback;
    });
});
