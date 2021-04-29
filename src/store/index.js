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
            const music = { ...state.music, apiData: [...action.payload], activeBucket: [...action.payload] };
            return { ...state, music, general };
        }
        case "FETCH_ARTS_REQUEST": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex, isLoading: true };
            return { ...state, general };
        }
        case "FETCH_ARTS_SUCCESS": {
            const general = { ...state.general, isLoading: false };
            const arts = { ...state.arts, apiData: [...action.payload], activeBucket: [...action.payload] };
            return { ...state, arts, general };
        }
        case "FETCH_COLLECTABLES_REQUEST": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex, isLoading: true };
            return { ...state, general };
        }
        case "FETCH_COLLECTABLES_SUCCESS": {
            const general = { ...state.general, isLoading: false };
            const collectables = { ...state.collectables, apiData: [...action.payload], activeBucket: [...action.payload] };
            return { ...state, collectables, general };
        }

        case "FETCH_FASHION_REQUEST": {
            const general = { ...state.general, activeTabIndex: action.payload.activeTabIndex, isLoading: true };
            return { ...state, general };
        }
        case "FETCH_FASHION_SUCCESS": {
            const general = { ...state.general, isLoading: false };
            const fashion = { ...state.fashion, apiData: [...action.payload], activeBucket: [...action.payload] };
            return { ...state, fashion, general };
        }

        case "FETCH_RESWIPE_REQUEST": {
            const currentTab = tabList[state.general.activeTabIndex];
            const activeTabContent = state[currentTab];

            const cardIdsAlreadySwiped = [...activeTabContent.selectionBucket.fav, ...activeTabContent.selectionBucket.rem];
            const remainingCardsForSwipe = activeTabContent.apiData.filter((card) => !cardIdsAlreadySwiped.includes(card.drop_id))

            const selectedTabContent = { ...activeTabContent, activeBucket: remainingCardsForSwipe };
            const general = { ...state.general, reswipeModeActive: false };

            return { ...state, general, [currentTab]: selectedTabContent };
        }
        case "ADD_USER_DATA": {
            const currentTab = tabList[state.general.activeTabIndex];
            const activeTabContent = state[currentTab];

            var userSelectedCard = activeTabContent.activeBucket[action.payload.selectedIndex];
            if (state.general.reswipeModeActive) {
                userSelectedCard = activeTabContent.reswipeBucket[action.payload.selectedIndex];
            }

            var reswipeModeActive = state.general.reswipeModeActive;
            const favList = activeTabContent.selectionBucket.fav;
            const isFavBucketHasTenItems = favList.length === 10;
            if (favList.length < 10 && !favList.includes(userSelectedCard.drop_id)) {
                favList.push(userSelectedCard.drop_id);
            }
            // else {
            //     reswipeModeActive = true;
            // }


            if (isFavBucketHasTenItems && !state.general.reswipeModeActive) {
                reswipeModeActive = true;
            }


            var selectedTab = { ...activeTabContent };

            if (favList.length === 10) {
                const reswipeBucketContent = activeTabContent.apiData.filter((card) => favList.includes(card.drop_id));
                reswipeBucketContent.sort((a, b) => a.drop_id - b.drop_id);
                selectedTab = { ...activeTabContent, reswipeBucket: reswipeBucketContent };
            }

            if (state.general.reswipeModeActive && action.payload.selectedIndex === 0) {
                const cardIdsAlreadySwiped = [...activeTabContent.selectionBucket.fav];
                const activeBucketContent = activeTabContent.apiData.filter((card) => cardIdsAlreadySwiped.includes(card.drop_id))

                selectedTab = { ...activeTabContent, reswipeBucket: activeBucketContent };
            }

            // //reswipe over
            // if (state.general.reswipeModeActive && action.payload.selectedIndex === 0) {
            //     reswipeModeActive = false;
            //     const cardIdsAlreadySwiped = [...activeTabContent.selectionBucket.fav, ...activeTabContent.selectionBucket.rem];
            //     const activeBucketContent = activeTabContent.apiData.filter((card) => !cardIdsAlreadySwiped.includes(card.drop_id))

            //     selectedTab = { ...activeTabContent, activeBucket: activeBucketContent };
            // }


            const general = {
                ...state.general,
                reswipeModeActive: reswipeModeActive,
                selectionCount: state.general.selectionCount + 1
            };

            return { ...state, [currentTab]: selectedTab, general };
        }
        case "REMOVE_USER_DATA": {
            const currentTab = tabList[state.general.activeTabIndex];
            const activeTabContent = state[currentTab];

            var userSelectedCard = activeTabContent.activeBucket[action.payload.selectedIndex];
            if (state.general.reswipeModeActive) {
                userSelectedCard = activeTabContent.reswipeBucket[action.payload.selectedIndex];
            }
            var userFav = activeTabContent.selectionBucket.fav;
            if (userFav.includes(userSelectedCard.drop_id)) {
                activeTabContent.selectionBucket.fav = userFav.filter(item => item != userSelectedCard.drop_id)
            }
            activeTabContent.selectionBucket.rem.push(userSelectedCard.drop_id);

            const general = {
                ...state.general,
                selectionCount: state.general.selectionCount - 1
            };
            var selectedTab = { ...activeTabContent, selectionBucket: activeTabContent.selectionBucket };

            return { ...state, general, [currentTab]: selectedTab, };
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
