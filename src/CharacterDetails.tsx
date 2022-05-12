import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import "./CharacterDetails.css";
import {ICharacter} from './App';
import FetchableListItem from './FetchableItem';
import {IFavoritesState} from "./Router";

interface IHeadingProps {
    dataTestid: string;
    text: string;
};

export const Heading = ({ dataTestid, text }: IHeadingProps) => (
    <h2 data-testid={dataTestid}>
        {text}
    </h2>
);

interface ICharacterDetailsProps {
    favoritesState: [IFavoritesState, React.Dispatch<React.SetStateAction<IFavoritesState>>];
}

export default (props: ICharacterDetailsProps) => {
    // console.log('props', props);
    const navigate = useNavigate();
    const [favorites, setFavorites] = props.favoritesState;
    const location = useLocation();
    const state = location.state as ICharacter;
    const { name, hair_color, eye_color, gender, homeworld, films, starships } = state;
    // console.log(state);

    function addToFavoritesHandler(value: any) {
        // @ts-ignore
        const existingFavoritesNamesSet = [...favorites.favoritesNamesSet];
        setFavorites({
            favoritesNamesSet: new Set([existingFavoritesNamesSet, value.name]),
            favoritesList: [...favorites.favoritesList, value]
        });
    }

    return (
        <div data-testid="character-details-container">
            <Heading dataTestid="character-details-heading" text="Character Details" />
            <button data-testid="home-nav-button" onClick={() => navigate('/')}>
                Home Page
            </button>
            {
                (!favorites.favoritesNamesSet.has(name)) ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        data-testid="characters-add-to-favorites-button"
                        onClick={() => {
                            addToFavoritesHandler(state);
                        }}
                    >
                        Add to Favorites
                    </Button>
                ) : (
                    <strong data-testid="favorited-text">Favorited!</strong>
                )
            }
            <span data-testid="character-details-content">
                <ul data-testid="character-details-list">
                    <li>Name: {name}</li>
                    <li>Hair color: {hair_color}</li>
                    <li>Eye color: {eye_color}</li>
                    <li>Gender: {gender}</li>
                    <li data-testid="character-details-planet-fetchable">
                        <FetchableListItem url={homeworld} property="name" prefix="Home Planet: " />
                    </li>
                </ul>
            </span>
            <Heading dataTestid="films-heading" text="Films" />
            <span data-testid="character-details-films-content">
                <ul data-testid="character-details-films-list">
                    {
                        films.map((film: string) => (
                            <li data-testid="character-details-films-item">
                                <FetchableListItem url={film} property="title" />
                            </li>
                        ))
                    }
                </ul>
            </span>
            <Heading dataTestid="starships-heading" text="Starships" />
            <span data-testid="character-details-starships-content">
                <ul data-testid="character-details-starships-list">
                    {
                        starships.map((starship: string) => (
                            <li data-testid="character-details-starships-item">
                                <FetchableListItem url={starship} property="name" />
                            </li>
                        ))
                    }
                </ul>
            </span>
        </div>
    );
};