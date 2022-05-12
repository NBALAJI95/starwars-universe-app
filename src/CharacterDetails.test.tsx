import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import CharacterDetails, {Heading} from './CharacterDetails';
import {BrowserRouter, useNavigate} from "react-router-dom";

describe('Testing Heading component', () => {
    test('Heading is rendered correctly with given test id attribute', () => {
        render(<Heading dataTestid="test-heading" text="Test Heading" />);
        expect(screen.getByTestId("test-heading")).toBeVisible();
    });

    test('Heading text is rendered correctly', () => {
        render(<Heading dataTestid="test-heading" text="Test Heading" />);
        expect(screen.getByText("Test Heading")).toBeVisible();
    });
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    useLocation: () => ({
        state: {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "homeworld": "https://swapi.dev/api/planets/1/",
            "films": [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/2/",
                "https://swapi.dev/api/films/3/",
                "https://swapi.dev/api/films/6/"
            ],
            "species": [],
            "vehicles": [
                "https://swapi.dev/api/vehicles/14/",
                "https://swapi.dev/api/vehicles/30/"
            ],
            "starships": [
                "https://swapi.dev/api/starships/12/",
                "https://swapi.dev/api/starships/22/"
            ],
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-20T21:17:56.891000Z",
            "url": "https://swapi.dev/api/people/1/"
        }
    })
}));

describe('Character details Testing', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <CharacterDetails favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, jest.fn()]} />
            </BrowserRouter>
        );
    });

    test('renders character details container', () => {
        expect(screen.getByTestId('character-details-container')).toBeVisible();
    });

    test('renders home navigator button', () => {
        expect(screen.getByTestId('home-nav-button')).toBeVisible();
    });

    test('renders character details heading', () => {
        expect(screen.getByTestId('character-details-heading')).toBeVisible();
    });

    test('renders character details films heading', () => {
        expect(screen.getByTestId('films-heading')).toBeVisible();
    });

    test('renders character details starships heading', () => {
        expect(screen.getByTestId('starships-heading')).toBeVisible();
    });

    test('renders character details content', () => {
        expect(screen.getByTestId('character-details-content')).toBeVisible();
    });

    test('renders character details list', () => {
        expect(screen.getByTestId('character-details-list')).toBeVisible();
    });

    test('renders character details', () => {
        expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
        expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
        expect(screen.getByText('Gender: male')).toBeInTheDocument();
        expect(screen.getByTestId('character-details-planet-fetchable')).toBeInTheDocument();
    });

    test('renders character details - films content', () => {
        expect(screen.getByTestId('character-details-films-content')).toBeVisible();
    });

    test('renders character details - films list', () => {
        expect(screen.getByTestId('character-details-films-list')).toBeVisible();
    });

    test('renders character details - films list item', () => {
        expect(screen.getAllByTestId("character-details-films-item")).toHaveLength(4);
    });

    test('renders character details - starships content', () => {
        expect(screen.getByTestId('character-details-starships-content')).toBeVisible();
    });

    test('renders character details - starships list', () => {
        expect(screen.getByTestId('character-details-starships-list')).toBeVisible();
    });

    test('renders character details - starships list item', () => {
        expect(screen.getAllByTestId("character-details-starships-item")).toHaveLength(2);
    });
});

describe('Character Details Favorites testing', () => {
    test('Renders Add to Favorites button if the character is not already in favorites', () => {
        const setFavoritesMock = jest.fn();
        render(
            <BrowserRouter>
                <CharacterDetails favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, setFavoritesMock]} />
            </BrowserRouter>
        );

        expect(screen.getByTestId('characters-add-to-favorites-button')).toBeVisible();
    });

    test('Clicking on Add to Favorites adds to favorites list', () => {
        const setFavoritesMock = jest.fn();
        render(
            <BrowserRouter>
                <CharacterDetails favoritesState={[{favoritesNamesSet: new Set(), favoritesList: []}, setFavoritesMock]} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("characters-add-to-favorites-button"));
        expect(setFavoritesMock).toBeCalledTimes(1);
    });

    test('renders Favorited if the character is already added to Favorites', () => {
        render(
            <BrowserRouter>
                <CharacterDetails
                    favoritesState={[
                        {
                            favoritesNamesSet: new Set(["Luke Skywalker"]),
                            favoritesList: [
                                {
                                    "name": "Luke Skywalker",
                                    "height": "172",
                                    "mass": "77",
                                    "hair_color": "blond",
                                    "skin_color": "fair",
                                    "eye_color": "blue",
                                    "birth_year": "19BBY",
                                    "gender": "male",
                                    "homeworld": "https://swapi.dev/api/planets/1/",
                                    "films": [
                                        "https://swapi.dev/api/films/1/",
                                        "https://swapi.dev/api/films/2/",
                                        "https://swapi.dev/api/films/3/",
                                        "https://swapi.dev/api/films/6/"
                                    ],
                                    "species": [],
                                    "vehicles": [
                                        "https://swapi.dev/api/vehicles/14/",
                                        "https://swapi.dev/api/vehicles/30/"
                                    ],
                                    "starships": [
                                        "https://swapi.dev/api/starships/12/",
                                        "https://swapi.dev/api/starships/22/"
                                    ],
                                    "created": "2014-12-09T13:50:51.644000Z",
                                    "edited": "2014-12-20T21:17:56.891000Z",
                                    "url": "https://swapi.dev/api/people/1/"
                                }
                            ]
                        }, jest.fn()
                    ]}
                />
            </BrowserRouter>
        );

        expect(screen.getByTestId('favorited-text')).toBeVisible();
        expect(screen.getByText("Favorited!")).toBeVisible();
    });
});
