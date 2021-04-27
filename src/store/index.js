import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

import initialState from './initial-state';

// const generalReducer = (state = { activeTabIndex: 0, isLoading: true }, action) => {
//     switch (action.type) {
//         case "general": {
//             const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex };
//             return { ...state, general };
//         }

//         default:
//             return state;
//     }
// };
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
        case "arts": {
            const general = { ...state.general, isLoading: false };
            const arts = { ...state.arts, apiData: [...action.payload] };
            return { ...state, arts, general };
        }
        case "music": {
            const general = { ...state.general, isLoading: false };
            const arts = { ...state.arts, apiData: [...action.payload] };
            return { ...state, arts, general };
        }
        case "addUserData":
            const currentTab = tabList[state.general.activeTabIndex];
            const userSelectedCard = state[currentTab].apiData[action.payload.selectedIndex];
            const userSelectedCards = state[currentTab].userSelectedCards.concat(userSelectedCard)
            const arts = { ...state.arts, userSelectedCards };
            return { ...state, arts };
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
