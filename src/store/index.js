import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

import initialState from './initial-state';

const categoryReducer = (state = initialState, action) => {
    const tabList = ["arts", "music", "collectables", "fashion"];

    switch (action.type) {
        case "general": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex };
            return { ...state, general };
        }
        case "FETCH_MUSIC_REQUEST": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex, isLoading: true };
            return { ...state, general };
        }
        case "FETCH_MUSIC_SUCCESS": {
            const general = { ...state.general, isLoading: false };
            const music = { ...state.music, apiData: [...action.payload] };
            return { ...state, music, general };
        }
        case "FETCH_ARTS_REQUEST": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex, isLoading: true };
            return { ...state, general };
        }
        case "FETCH_ARTS_SUCCESS": {
            const general = { ...state.general, isLoading: false };
            const arts = { ...state.arts, apiData: [...action.payload] };
            return { ...state, arts, general };
        }
        case "FETCH_COLLECTABLES_REQUEST": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex, isLoading: true };
            return { ...state, general };
        }
        case "FETCH_COLLECTABLES_SUCCESS": {
            const general = { ...state.general, isLoading: false };
            const collectables = { ...state.collectables, apiData: [...action.payload] };
            return { ...state, collectables, general };
        }

        case "FETCH_FASHION_REQUEST": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex, isLoading: true };
            return { ...state, general };
        }
        case "FETCH_FASHION_SUCCESS": {
            const general = { ...state.general, isLoading: false };
            const fashion = { ...state.fashion, apiData: [...action.payload] };
            return { ...state, fashion, general };
        }

        case "FETCH_RESWIPE_REQUEST": {
            const general = { ...state.general, reswipeModeActive: false };
            return { ...state, general };
        }
        case "addUserData": {
            const currentTab = tabList[state.general.activeTabIndex];
            const userSelectedCard = state[currentTab].apiData[action.payload.selectedIndex];
            const userSelectedCards = state[currentTab].userSelectedCards.concat(userSelectedCard)

            const isInReswipeMode = state.general.enableReswipeMode;

            const isReswipe = (userSelectedCards.length === 10);
            var reswipeModeActive = state.general.reswipeModeActive;
            if (isReswipe && !state.general.reswipeModeActive) {
                reswipeModeActive = true;
            }
            var arts = { ...state.arts, userSelectedCards };
            if (isReswipe) {
                userSelectedCards.sort((a, b) => a.drop_id - b.drop_id);
                arts = { ...state.arts, apiData: userSelectedCards, userSelectedCards: [] };
            }

            const general = {
                ...state.general,
                enableReswipeMode: isReswipe,
                reswipeModeActive: reswipeModeActive
            };

            return { ...state, arts, general };
        }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    category: categoryReducer
});

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
