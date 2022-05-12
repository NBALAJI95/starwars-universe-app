import React from 'react';
import {act, render, screen} from '@testing-library/react';
import { CHARACTER_RESPONSE_PAGE_1 } from './testResponse';
import App, {ViewOptions} from './App';
import { BrowserRouter } from "react-router-dom";

describe('Testing App components rendering', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <App
                    viewState={[ViewOptions.CHARACTER_LIST_VIEW, jest.fn()]}
                    favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, jest.fn()]}
                />
            </BrowserRouter>
        );
    });

    test('renders app container', () => {
        expect(screen.getByTestId('app-container')).toBeVisible();
    });

    test('renders view options container', () => {
        expect(screen.getByTestId("view-options-parent-container")).toBeVisible();
    });
});

describe('Testing App components rendering - characters list', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <App
                    viewState={[ViewOptions.CHARACTER_LIST_VIEW, jest.fn()]}
                    favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, jest.fn()]}
                />
            </BrowserRouter>
        );
    });

    test('characters container is rendered when CHARACTER_LIST_VIEW is selected', () => {
        expect(screen.getByTestId("characters-container")).toBeVisible();
    });

    test('renders app heading', () => {
      expect(screen.getByRole('title')).toBeVisible();
    });

    test('renders characters table', () => {
        expect(screen.getByTestId('characters-table-wrapper')).toBeVisible();
    });

    test('renders characters table pagination', () => {
        expect(screen.getByTestId('characters-table-pagination-wrapper')).toBeVisible();
    });
})

describe('Testing App components rendering - favorites list', () => {
    test('renders favorites container', () => {
        render(
            <BrowserRouter>
                <App
                    viewState={[ViewOptions.FAVORITES_VIEW, jest.fn()]}
                    favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, jest.fn()]}
                />
            </BrowserRouter>
        );
        expect(screen.getByTestId("favorites-container")).toBeVisible();
    });
});

describe('Testing Characters fetching on initial render', () => {
  let originFetch: any;

  beforeEach( () => {
    originFetch = (global as any).fetch;
  });

  afterEach(() => {
    (global as any).fetch = originFetch;
  });

  it('should call fetch api with given URL', async () => {
    const fakeResponse = CHARACTER_RESPONSE_PAGE_1;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;

      await act(async () => {
          render(
              <BrowserRouter>
                  <App
                      viewState={[ViewOptions.CHARACTER_LIST_VIEW, jest.fn()]}
                      favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, jest.fn()]}
                  />
              </BrowserRouter>
          );
      });

    expect(mockedFetch).toBeCalledTimes(1);
    expect(mockedFetch).toBeCalledWith('https://swapi.dev/api/people');
  });
});
