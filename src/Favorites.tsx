import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {IFavoritesState} from './Router';
import TableHeader from "./Table/TableHeader";
import TableBody from "./Table/TableBody";
import {cols} from './App';

interface IFavoritesProps {
    favoritesState: [IFavoritesState, React.Dispatch<React.SetStateAction<IFavoritesState>>]
}

export const enum FavoritesType {
    Unfavorite = "Unfavorite"
}

export default ({ favoritesState }: IFavoritesProps) => {
    const [favorites, setFavorites] = favoritesState;
    const columns = [
        { field: FavoritesType.Unfavorite, headerName: 'UnFavorite' },
        ...cols
    ];

    return (
        <div data-testid="favorites-table-container">
            <strong data-testid="favorites-title"> Favorites List </strong>
            <table data-testid="favorites-table">
                <div data-testid="favorites-table-header">
                    <TableHeader columns={columns} />
                </div>

                <div data-testid="favorites-table-body">
                    <TableBody
                        columns={columns}
                        rows={
                            favorites.favoritesList
                                .map(favorite => {
                                    return {
                                        [FavoritesType.Unfavorite]: (
                                            <>
                                                <Button
                                                    data-testid="unfavorite-button"
                                                    variant="outlined"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => {
                                                        // @ts-ignore
                                                        favorites.favoritesNamesSet.delete(favorite.name);
                                                        setFavorites({
                                                            favoritesNamesSet: favorites.favoritesNamesSet,
                                                            favoritesList: favorites.favoritesList
                                                                .filter(item => item.name !== favorite.name)
                                                        });
                                                    }}
                                                >
                                                    Remove from Favorites
                                                </Button>
                                            </>
                                        ),
                                        ...favorite
                                    };
                                })
                        }
                    />
                </div>

                {/*<tbody data-testid="characters-table-body">*/}
                {/*{*/}
                {/*    favorites.favoritesList.map((row, i) => (*/}
                {/*        <tr*/}
                {/*            data-testid="characters-table-body-row"*/}
                {/*            key={i}*/}
                {/*        >*/}
                {/*            {*/}
                {/*                columns.map((column, j) => {*/}
                {/*                        return (*/}
                {/*                            <td*/}
                {/*                                key={j}*/}
                {/*                                data-testid="characters-table-body-cell"*/}
                {/*                            >*/}
                {/*                                {*/}
                {/*                                    (column.field !== FavoritesType.Unfavorite) ? (*/}
                {/*                                        row[column.field]*/}
                {/*                                    ): (*/}
                {/*                                        <button*/}
                {/*                                            onClick={() => {*/}
                {/*                                                // @ts-ignore*/}
                {/*                                                favorites.favoritesNamesSet.delete(row.name);*/}
                {/*                                                setFavorites({*/}
                {/*                                                    favoritesNamesSet: favorites.favoritesNamesSet,*/}
                {/*                                                    favoritesList: favorites.favoritesList*/}
                {/*                                                        .filter(item => item.name !== row.name)*/}
                {/*                                                });*/}
                {/*                                            }}*/}
                {/*                                        >*/}
                {/*                                            Remove from Favorite*/}
                {/*                                        </button>*/}
                {/*                                    )*/}
                {/*                                }*/}
                {/*                            </td>*/}
                {/*                        );*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </tr>*/}
                {/*    ))*/}
                {/*}*/}
                {/*</tbody>*/}
            </table>
        </div>
    );
};