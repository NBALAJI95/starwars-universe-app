import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CHARACTER_RESPONSE_PAGE_1, FAV_CHAR2, FAV_CHAR1 } from '../testResponse';
import TableBody from './TableBody';
import {cols} from '../App';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {FavoritesType} from "../Favorites";

describe('Table Body Testing - characters table', () => {
    test('renders tbody', () => {
        render(<TableBody rows={CHARACTER_RESPONSE_PAGE_1.results} columns={cols} />);
        expect(screen.getByTestId('table-body')).toBeVisible();
    });

    test('renders all given rows', () => {
        render(<TableBody rows={CHARACTER_RESPONSE_PAGE_1.results} columns={cols} />);
        const list = screen.getAllByTestId('table-body-row');
        expect(list.length).toBe(CHARACTER_RESPONSE_PAGE_1.results.length)
    });

    test('renders all given cells with intended values', () => {
        render(<TableBody rows={CHARACTER_RESPONSE_PAGE_1.results} columns={cols} />);
        const list = screen.getAllByTestId('table-body-cell');
        const listNames = list.map(item => item.textContent);
        const tableCellValues = [];

        for (const row of CHARACTER_RESPONSE_PAGE_1.results) {
            for (const column of cols) {
                tableCellValues.push(row[column.field]);
            }
        }

        expect(listNames.sort()).toEqual(tableCellValues.sort());
        expect(list.length).toBe(CHARACTER_RESPONSE_PAGE_1.results.length * cols.length)
    });

    test('row click is working properly', () => {
        const rowOnClickHandlerMock = jest.fn();
        render(
            <TableBody
                rows={CHARACTER_RESPONSE_PAGE_1.results} columns={cols}
                rowOnClickHandler={rowOnClickHandlerMock}
            />
        );
        const rows = screen.getAllByTestId('table-body-row');

        rows.forEach((row, i) => {
            fireEvent.click(row);
            expect(rowOnClickHandlerMock).toHaveBeenCalledWith(CHARACTER_RESPONSE_PAGE_1.results[i]);
        });
    })
});

describe('Table Body Testing - favorites table', () => {
    let setFavoritesMock: any;
    beforeEach(() => {
        setFavoritesMock = jest.fn();
        const favorites = {
            favoritesNamesSet: new Set([FAV_CHAR1.name, FAV_CHAR2.name]),
            favoritesList: [FAV_CHAR1, FAV_CHAR2]
        };
        render(
            <TableBody
                columns={[{ field: FavoritesType.Unfavorite, headerName: 'UnFavorite' }, ...cols]}
                rows={
                    favorites.favoritesList
                        .map(favorite => {
                            return {
                                [FavoritesType.Unfavorite]: (
                                    <>
                                        <Button
                                            variant="outlined"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => {
                                                favorites.favoritesNamesSet.delete(favorite.name);
                                                setFavoritesMock();
                                            }}
                                        >
                                            Remove from Favorites
                                        </Button>
                                    </>
                                ),
                                ...favorite
                            };
                        })
                }
            />
        );
    });

    test('renders tbody', () => {
        expect(screen.getByTestId('table-body')).toBeVisible();
    });

    test('renders all given rows', () => {
        const list = screen.getAllByTestId('table-body-row');
        expect(list.length).toBe(2)
    });

    test('renders all given cells with intended values', () => {
        const list = screen.getAllByTestId('table-body-cell');
        const tableCellValues = [];
        const columns = [{ field: FavoritesType.Unfavorite, headerName: 'UnFavorite' }, ...cols];

        for (const row of [FAV_CHAR1, FAV_CHAR2]) {
            for (const column of columns) {
                // @ts-ignore
                tableCellValues.push(row[column.field]);
            }
        }
        expect(list.length).toBe([FAV_CHAR1, FAV_CHAR2].length * columns.length)
    });
});

