import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Table from './Table/Table';
import './App.css';
import TablePagination from "./TablePagination/TablePagination";
import Favorites from "./Favorites";
import ViewOptionsInput from "./ViewOptionsInput";
import {IFavoritesState} from "./Router";

export enum CharacterFields {
    name = 'name',
    gender = 'gender',
    homeworld = 'homeworld',
    hair_color = 'hair_color',
    eye_color = 'eye_color',
    films = 'films',
    starships = 'starships'
}

export interface ICharacter {
    [CharacterFields.name]: string;
    [CharacterFields.gender]: string;
    [CharacterFields.homeworld]: string;
    [CharacterFields.hair_color]: string;
    [CharacterFields.eye_color]: string;
    [CharacterFields.films]: string[];
    [CharacterFields.starships]: string[];
    height?: string;
    mass?: string;
    skin_color?: string;
    birth_year?: string;
    species?: string[];
    vehicles?: string[];
    created?: string;
    edited?: string;
    url?: string;
}

export interface ITableColumn {
    field: CharacterFields;
    headerName: string;
    isFetchable?: boolean;
}

export interface ICharactersResponse {
    count: number;
    results: ICharacter[];
    previous: null | string;
    next: null | string;
}

export const cols: ITableColumn[] = [
    { field: CharacterFields.name, headerName: 'Name' },
    { field: CharacterFields.gender, headerName: 'Gender' },
    { field: CharacterFields.homeworld, headerName: 'Home World', isFetchable: false },
];

export const calculatePage = (previous: null | string, next: null | string) => {
    let page = 1;

    if (previous !== null) {
        page = (parseInt(previous[previous.length - 1]) + 1);
    } else if (next !== null) {
        page = (parseInt(next[next.length - 1]) - 1);
    }

    return page;
};

export enum ViewOptions {
    CHARACTER_LIST_VIEW = "CHARACTER_LIST_VIEW",
    FAVORITES_VIEW = "FAVORITES_VIEW"
}

interface IAppProps {
    favoritesState: [IFavoritesState, React.Dispatch<React.SetStateAction<IFavoritesState>>];
    viewState: [ViewOptions, React.Dispatch<React.SetStateAction<ViewOptions>>]
}

function App({ favoritesState, viewState }: IAppProps) {
    let page = 1;
    const [url, setURL] = useState<string>('https://swapi.dev/api/people');
    const [favorites, setFavorites] = favoritesState;
    // const [view, setView] = useState<ViewOptions>(ViewOptions.CHARACTER_LIST_VIEW);
    const [view, setView] = viewState;
    const [tableData, setTableData] = useState<ICharactersResponse>(
        { count: 0, results: [], previous: null, next: null }
    );
    const [search, setSearch] = useState<string>('');
    const {next, previous} = tableData;
    const navigate = useNavigate();

    page = calculatePage(previous, next);

    if (next !== null) {
        page = (parseInt(next[next.length - 1]) - 1);
    } else if (previous !== null) {
        page = (parseInt(previous[previous.length - 1]) + 1);
    }

    const getCharactersData = (): Promise<any> => fetch(url);

    useEffect(() => {
        (async () => {
            const data = await getCharactersData();
            setTableData(await data.json());
        })();
    }, [url]);

    return (
        <div data-testid="app-container" className="Container">
            <div
                data-testid="view-options-parent-container"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <ViewOptionsInput viewState={[view, setView]} />
            </div>

            {(view === ViewOptions.CHARACTER_LIST_VIEW) ? (
                <div data-testid="characters-container">
                    <strong role="title"> Starwars Universe </strong>
                    <div data-testid="characters-table-wrapper">
                        <Table
                            title="Character List"
                            columns={cols}
                            rows={tableData.results}
                            page={page}
                            urlState={[url, setURL]}
                            tableState={[tableData, setTableData]}
                            searchState={[search, setSearch]}
                            rowOnClickHandler={(rowData: ICharacter) => {
                                navigate('/characterDetails', {state: rowData});
                            }}
                        />
                    </div>
                    <div data-testid="characters-table-pagination-wrapper">
                        <TablePagination
                            rows={tableData.results}
                            previous={previous}
                            next={next}
                            setURL={setURL}
                            page={page}
                            count={tableData.count}
                        />
                    </div>
                </div>
            ): (
                <div data-testid="favorites-container">
                    <Favorites favoritesState={[favorites, setFavorites]} />
                </div>
            )}
        </div>
    );
}

export default App;
