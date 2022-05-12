import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ViewOptionsInput from './ViewOptionsInput';
import {ViewOptions} from './App';

describe('View options components rendering test', () => {
   beforeEach(() => {
       render (<ViewOptionsInput viewState={[ViewOptions.CHARACTER_LIST_VIEW, jest.fn()]} />);
   });

   test('renders View Options Container', () => {
       expect(screen.getByTestId("view-options-container")).toBeVisible();
   });

   test('render characters view radio button and label', () => {
       expect(screen.getByTestId("view-options-characters-view-radio")).toBeVisible();
       expect(screen.getByTestId("characters-view-label")).toBeVisible();
   });

    test('render favorites view radio button and label', () => {
        expect(screen.getByTestId("view-options-favorites-view-radio")).toBeVisible();
        expect(screen.getByTestId("favorites-view-label")).toBeVisible();
    });
});

describe('View options behavior testing', () => {
    test('Characters radio is checked by default', () => {
        render (<ViewOptionsInput viewState={[ViewOptions.CHARACTER_LIST_VIEW, jest.fn()]} />);
        expect(screen.getByTestId("view-options-characters-view-radio")).toBeChecked();
    });

    test('Clicking on Favorites radio makes it checked', () => {
        const setViewMock = jest.fn();
        render (<ViewOptionsInput viewState={[ViewOptions.CHARACTER_LIST_VIEW, setViewMock]} />);
        fireEvent.click(screen.getByTestId("view-options-favorites-view-radio"));
        expect(setViewMock).toBeCalledTimes(1);
        expect(setViewMock).toBeCalledWith(ViewOptions.FAVORITES_VIEW);
    });

    test('Clicking on Characters radio makes it checked', () => {
        const setViewMock = jest.fn();
        render (<ViewOptionsInput viewState={[ViewOptions.FAVORITES_VIEW, setViewMock]} />);
        fireEvent.click(screen.getByTestId("view-options-characters-view-radio"));
        expect(setViewMock).toBeCalledTimes(1);
        expect(setViewMock).toBeCalledWith(ViewOptions.CHARACTER_LIST_VIEW);
    });
});