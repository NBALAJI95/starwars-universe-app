import React from 'react';
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SkipNextIcon from "@mui/icons-material/SkipNext";

interface IPaginationLastPageButton {
    next: null | string;
    setURL: React.Dispatch<React.SetStateAction<string>>;
    rowsLength: number;
    count: number;
}

export default ({ next, setURL, rowsLength, count }: IPaginationLastPageButton) => {
    return (
        <span data-testid="pagination-last-page-container">
            <Button
                data-testid="characters-table-pagination-last-page-button"
                variant="contained"
                color="secondary"
                disabled={next === null}
                onClick={() => {
                    if (next)
                        setURL(next.slice(0, next.length - 1) + `${Math.ceil(count / rowsLength)}`);
                }}
            >
                <SkipNextIcon data-testid="characters-table-pagination-last-page-icon" />
            </Button>
        </span>
    );
};