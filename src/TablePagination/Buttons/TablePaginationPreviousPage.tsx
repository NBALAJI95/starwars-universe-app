import React from 'react';
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IPaginationPreviousPageButton {
    previous: null | string;
    setURL: React.Dispatch<React.SetStateAction<string>>;
}

export default ({ previous, setURL }: IPaginationPreviousPageButton) => {
    return (
        <span data-testid="pagination-previous-page-container">
            <Button
                variant="contained"
                disabled={previous === null}
                color="primary"
                data-testid="characters-table-pagination-previous-page-button"
                onClick={() => {
                    if (previous) setURL(previous);
                }}
            >
                <ArrowBackIcon data-testid="characters-table-pagination-previous-page-icon" />
            </Button>
        </span>
    );
};