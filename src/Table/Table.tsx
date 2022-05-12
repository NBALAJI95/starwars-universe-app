import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import {ITableColumn, ICharacter, ICharactersResponse} from '../App';
import TableSearchBar from './TableSearchBar';
import './Table.css';

export interface IProps {
    title: string;
    columns: ITableColumn[];
    rows: ICharacter[];
    page: number;
    urlState: [string, React.Dispatch<React.SetStateAction<string>>],
    tableState: [ICharactersResponse, React.Dispatch<React.SetStateAction<ICharactersResponse>>];
    searchState?: [string, React.Dispatch<React.SetStateAction<string>>];
    rowOnClickHandler?: ((rowData: ICharacter) => void) | null;
}

export default (props: IProps) => {
    const {
        title,
        columns, rows,
        tableState,
        searchState,
        rowOnClickHandler = null
    } = props;

    const [, setTableData] = tableState;

    return (
        <div data-testid="table-container" style={{ border: '2px solid gray' }}>
            <div className="table-search-bar-container" data-testid="table-search-bar-container">
                <strong style={{ alignSelf: 'center' }}> {title} </strong>
                {
                    (searchState && searchState.length) ? (
                        <div className="table-search-bar-wrapper" data-testid="table-search-bar-wrapper">
                            <TableSearchBar
                                searchState={searchState}
                                setTableData={setTableData}
                            />
                        </div>
                    ): (<div />)
                }
            </div>
            <table data-testid="characters-table">
                <TableHeader columns={columns} />
                <TableBody columns={columns} rows={rows} rowOnClickHandler={rowOnClickHandler} />
            </table>
        </div>
    );
};