import React from 'react';

interface ITableHeaderColumn {
    field: string;
    headerName: string;
    isFetchable?: boolean;
};

interface ITableHeaderProps {
    columns: ITableHeaderColumn[];
}

export default ({ columns }: ITableHeaderProps) => {
    return (
        <thead data-testid="characters-table-head">
            <tr data-testid="characters-table-header-row">
                {
                    columns.map((column, i) => (
                        <th data-testid="characters-table-column" key={i}>{column.headerName}</th>
                    ))
                }
            </tr>
        </thead>
    );
}