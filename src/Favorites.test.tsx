import {render, screen, act, fireEvent} from "@testing-library/react";
import Favorites from "./Favorites";
import {FAV_CHAR2, FAV_CHAR1} from "./testResponse";

describe('Favorites list Testing - rendering', () => {
    beforeEach(() => {
        render(
            <Favorites
                favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, jest.fn()]}
            />
        );
    });

    test('Favorites table container is rendered', () => {
        expect(screen.getByTestId("favorites-table-container")).toBeVisible();
    });

    test('Favorites table title is rendered', () => {
        expect(screen.getByTestId("favorites-title")).toBeVisible();
    });

    test('Favorites table is rendered', () => {
        expect(screen.getByTestId("favorites-table")).toBeVisible();
    });

    test('Favorites table header is rendered', () => {
        expect(screen.getByTestId("favorites-table-header")).toBeVisible();
    });

    test('Favorites table body is rendered', () => {
        expect(screen.getByTestId("favorites-table-body")).toBeVisible();
    });
});

describe('Favorites list Testing - behavior', () => {
    test('Unfavorites buttons and its click behavior are working correctly', async () => {
        const setFavoritesMock = jest.fn();
        await act(async () => {
            render(
                <Favorites
                    favoritesState={[
                        {
                            favoritesNamesSet: new Set([FAV_CHAR1.name, FAV_CHAR2.name]),
                            favoritesList: [FAV_CHAR1, FAV_CHAR2]
                        },
                        setFavoritesMock
                    ]}
                />
            );
        });
        expect(screen.getAllByTestId("unfavorite-button")).toHaveLength(2);
        fireEvent.click(screen.getAllByTestId("unfavorite-button")[0]);
        expect(setFavoritesMock).toHaveBeenCalledTimes(1);
        fireEvent.click(screen.getAllByTestId("unfavorite-button")[1]);
        expect(setFavoritesMock).toHaveBeenCalledTimes(2);
    })
});