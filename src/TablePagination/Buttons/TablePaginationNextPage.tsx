import React from 'react';
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface IPaginationNextPageButton {
    next: null | string;
    setURL: React.Dispatch<React.SetStateAction<string>>;
}

export default ({ next, setURL }: IPaginationNextPageButton) => {
    return (
        <span data-testid="pagination-next-page-container">
            <Button
                data-testid="characters-table-pagination-next-page-button"
                variant="contained"
                disabled={next === null}
                onClick={() => {
                    if (next) setURL(next);
                }}
            >
                <ArrowForwardIcon data-testid="characters-table-pagination-next-page-icon" />
            </Button>
        </span>
    );
};