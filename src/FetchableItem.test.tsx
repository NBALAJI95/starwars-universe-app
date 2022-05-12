import {render, screen, act} from "@testing-library/react";
import FetchableListItem from "./FetchableItem";
import {PLANET_RESPONSE, FILM_RESPONSE, STARSHIP_RESPONSE} from './testResponse';

describe('Character details Testing', () => {
    let originalFetch: any;

    beforeEach(() => {
        originalFetch = (global as any).fetch;
    });

    afterEach(() => {
        (global as any).fetch = originalFetch;
    });

    test('renders fetchable item container and loading text', () => {
        const url = "https://swapi.dev/api/planets/1/";
        render(
            <FetchableListItem
                url={url}
                property="name"
            />
        );
        expect(screen.getByTestId('list-item-fetch')).toBeVisible();
        expect(screen.getByText(`Loading this URL ${url}...`)).toBeVisible();
    });

    test('Planet API - fetch api is called with given url and rendered with prefix and response', async () => {
        const URL = "https://swapi.dev/api/planets/1/";
        const mRes = { json: jest.fn().mockResolvedValueOnce(PLANET_RESPONSE) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
        (global as any).fetch = mockedFetch;

        await act(async () => {
            render(
                <FetchableListItem
                    url={URL}
                    property="name"
                    prefix="Home Planet: "
                />
            );
        });

        expect(mockedFetch).toBeCalledTimes(1);
        expect(mockedFetch).toBeCalledWith(URL);
        expect(mRes.json).toBeCalledTimes(1);
        expect(screen.getByText("Home Planet: " + PLANET_RESPONSE.name)).toBeVisible();
    });

    test('Films API - fetch api is called with given url and rendered with response', async () => {
        const URL = "https://swapi.dev/api/films/6/";
        const mRes = { json: jest.fn().mockResolvedValueOnce(FILM_RESPONSE) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
        (global as any).fetch = mockedFetch;

        await act(async () => {
            render(
                <FetchableListItem url={URL} property="title" />
            );
        });

        expect(mockedFetch).toBeCalledTimes(1);
        expect(mockedFetch).toBeCalledWith(URL);
        expect(mRes.json).toBeCalledTimes(1);
        expect(screen.getByText(FILM_RESPONSE.title)).toBeVisible();
    });

    test('startship API - fetch api is called with given url and rendered with response', async () => {
        const URL = "https://swapi.dev/api/starships/22/";
        const mRes = { json: jest.fn().mockResolvedValueOnce(STARSHIP_RESPONSE) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
        (global as any).fetch = mockedFetch;

        await act(async () => {
            render(
                <FetchableListItem url={URL} property="name" />
            );
        });

        expect(mockedFetch).toBeCalledTimes(1);
        expect(mockedFetch).toBeCalledWith(URL);
        expect(mRes.json).toBeCalledTimes(1);
        expect(screen.getByText(STARSHIP_RESPONSE.name)).toBeVisible();
    });
});