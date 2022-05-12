import React from 'react';
import {ICharacter, ITableColumn} from '../App';
import {FavoritesType} from '../Favorites';
import FetchableItem from '../FetchableItem';

interface IFavorite {
    [FavoritesType.Unfavorite]?: JSX.Element
}

interface ITableRows extends ICharacter, IFavorite {
}

interface ITableBodyProps {
    rows: ITableRows[];
    columns: (ITableColumn | {field: FavoritesType, headerName: string})[];
    rowOnClickHandler?: null | ((rowData: ICharacter) => void);
}

export default ({ rows, columns, rowOnClickHandler = null }: ITableBodyProps) => {
    // console.log('rows', rows);
    return (
        <tbody data-testid="table-body">
            {
                rows.map((row, i) => (
                    <tr
                        data-testid="table-body-row"
                        key={i}
                        onClick={() => {
                            if (rowOnClickHandler) rowOnClickHandler(row);
                        }}
                    >
                        {
                            columns.map((column, j) => {
                                if ("isFetchable" in column && column.isFetchable && typeof row[column.field] === "string")
                                    return (
                                        <td key={j}>
                                            <FetchableItem url={row[column.field].toString()} property="name" />
                                        </td>
                                    );
                                else
                                    return (
                                        <td
                                            key={j}
                                            data-testid="table-body-cell"
                                        >
                                            {row[column.field]}
                                        </td>
                                    );
                            })
                        }
                    </tr>
                ))
            }
        </tbody>
    );
};