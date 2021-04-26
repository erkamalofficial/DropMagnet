import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'

import initialState from './initial-state';

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "art":
            const artData = state.art.concat(action.payload);
            return { ...state, art: artData };
        case "music":
            const musicData = state.music.concat(action.payload);
            return { ...state, music: musicData };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    category: categoryReducer
});

export default createStore(rootReducer, composeWithDevTools());
