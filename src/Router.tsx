import React, {useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import App, {ICharacter, ViewOptions} from './App';
import CharacterDetails from './CharacterDetails';
import Favorites from './Favorites';

export interface IFavoritesState {
    favoritesNamesSet: Set<string>;
    favoritesList: Array<ICharacter>;
}

function Router() {
    const [favorites, setFavorites] = useState<IFavoritesState>({ favoritesNamesSet: new Set(), favoritesList: [] });
    const [view, setView] = useState<ViewOptions>(ViewOptions.CHARACTER_LIST_VIEW);

    return (
        <div className="App">
            <Routes>
                <Route
                   path="/"
                   element={
                        <App
                            favoritesState={[favorites, setFavorites]}
                            viewState={[view, setView]}
                        />
                    }
                />

                <Route
                    path="/characterDetails"
                    element={<CharacterDetails favoritesState={[favorites, setFavorites]} />}
                />
            </Routes>
        </div>
    );
}

export default Router;