import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'

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
        case "arts": {
            const general = { ...state.general, isLoading: false };
            const arts = { ...state.arts, apiData: [...action.payload] };
            return { ...state, arts, general };
        }
        case "music":
            const musicData = state.music.concat(action.payload);
            return { ...state, music: musicData };
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

export default createStore(rootReducer, composeWithDevTools());
