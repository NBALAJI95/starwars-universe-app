import React from 'react';
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Button from "@mui/material/Button";

interface IPaginationFirstPageButton {
    previous: null | string;
    setURL: React.Dispatch<React.SetStateAction<string>>;
}

export default ({ previous, setURL }: IPaginationFirstPageButton) => {
    return (
        <span data-testid="pagination-first-page-container">
            <Button
                variant="contained"
                disabled={previous === null}
                color="secondary"
                data-testid="characters-table-pagination-first-page-button"
                onClick={() => {
                    if (previous) setURL(previous.slice(0, previous.length - 1) + '1');
                }}
            >
                <SkipPreviousIcon data-testid="characters-table-pagination-first-page-icon" />
            </Button>
        </span>
    );
};