import React from 'react';
import {ICharacter} from "../App";
import TablePaginationCurrentPage from './TablePaginationCurrentPage';
import TablePaginationFirstPage from './Buttons/TablePaginationFirstPage';
import TablePaginationPreviousPage from './Buttons/TablePaginationPreviousPage';
import TablePaginationNextPage from './Buttons/TablePaginationNextPage';
import TablePaginationLastPage from './Buttons/TablePaginationLastPage';

interface ITablePaginationProps {
    rows: ICharacter[];
    previous: string | null;
    next: string | null;
    setURL: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    count: number;
}

export default ({ rows = [], previous, next, setURL, page, count }: ITablePaginationProps) => {
    return (
        <div data-testid="characters-table-pagination">
            {
                (rows.length) ? (
                    <div data-testid="characters-table-pagination-records-found-container">
                        <TablePaginationFirstPage previous={previous} setURL={setURL} />
                        <TablePaginationPreviousPage previous={previous} setURL={setURL} />

                        <TablePaginationCurrentPage
                            page={page} currentpageRowsLength={rows.length} count={count}
                        />

                        <TablePaginationNextPage next={next} setURL={setURL} />
                        <TablePaginationLastPage
                            next={next} setURL={setURL} rowsLength={rows.length} count={count}
                        />
                    </div>
                ) : (
                    <div data-testid="characters-table-pagination-records-not-found-container">
                        No Record found
                    </div>
                )
            }
        </div>
    );
};