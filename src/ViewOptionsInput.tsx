import React from 'react';
import {ViewOptions} from './App';

interface IViewOptionsProps {
    viewState: [ViewOptions, React.Dispatch<React.SetStateAction<ViewOptions>>];
}

export default ({ viewState }: IViewOptionsProps) => {
    const [view, setView] = viewState;

    const onValueChangeHandler = (event: any) => {
        if (view !== event.target.value) {
            setView(event.target.value);
        }
    }

    return (
        <div
            data-testid="view-options-container"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <input
                type="radio" id="CHARACTER_LIST_VIEW" name="CHARACTER_LIST_VIEW"
                data-testid="view-options-characters-view-radio"
                value={ViewOptions.CHARACTER_LIST_VIEW}
                checked={view === ViewOptions.CHARACTER_LIST_VIEW}
                onChange={onValueChangeHandler}
            />
            <label
                htmlFor="CHARACTER_LIST_VIEW"
                data-testid="characters-view-label"
            >
                Character List
            </label><br />
            <input
                type="radio" id="FAVORITES_VIEW" name="FAVORITES_VIEW"
                data-testid="view-options-favorites-view-radio"
                value={ViewOptions.FAVORITES_VIEW}
                checked={view === ViewOptions.FAVORITES_VIEW}
                onChange={onValueChangeHandler}
            />
            <label
                htmlFor="FAVORITES_VIEW"
                data-testid="favorites-view-label"
            >
                Favorites
            </label><br />
        </div>
    );
};