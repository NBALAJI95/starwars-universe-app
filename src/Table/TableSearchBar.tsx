import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import {ICharactersResponse} from "../App";

interface ITableSearchBar {
    searchState: [string, React.Dispatch<React.SetStateAction<string>>];
    setTableData: React.Dispatch<React.SetStateAction<ICharactersResponse>>;
}

export async function fetchSearchData(
    value: string, setTableData: React.Dispatch<React.SetStateAction<ICharactersResponse>>
) {
    const searchResult = await fetch(
        `https://swapi.dev/api/people?search=${value}`
    );
    const searchData = await searchResult.json();
    setTableData(searchData);
}

export default ({ searchState, setTableData }: ITableSearchBar) => {
    const [search, setSearch] = searchState;

    const debounceLoadData = React.useCallback(debounce(fetchSearchData, 400), []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SearchIcon data-testid="search-icon" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
                name="search-bar" label="Search" variant="standard" fullWidth role="input"
                inputProps={{ 'data-testid': "table-search-field" }}
                value={search}
                onChange={({target: { value }}) => {
                    setSearch(value);
                    debounceLoadData(value, setTableData);
                }}
            />
        </div>
    );
};