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
        case "ADD_USER_DATA": {
            const currentTab = tabList[state.general.activeTabIndex];
            const activeTabContent = state[currentTab];
            const userSelectedCard = activeTabContent.apiData[action.payload.selectedIndex];
            var reswipeBucketContent = activeTabContent.reswipeBucket;
            var favBucketContent = activeTabContent.favBucket;
            if (activeTabContent.reswipeBucket.length < 10) {
                reswipeBucketContent = activeTabContent.reswipeBucket.concat(userSelectedCard);
            }
            if (state.general.reswipeModeActive) {
                const contentForFav = activeTabContent.reswipeBucket[action.payload.selectedIndex];
                favBucketContent = activeTabContent.favBucket.concat(contentForFav)
            }


            const isInReswipeMode = state.general.enableReswipeMode;

            const isReswipe = (reswipeBucketContent.length === 10);
            var reswipeModeActive = state.general.reswipeModeActive;

            if (isReswipe && !state.general.reswipeModeActive) {
                reswipeModeActive = true;
            }

            var selectedTab = { ...activeTabContent, reswipeBucket: reswipeBucketContent };
            if (isReswipe) {
                reswipeBucketContent.sort((a, b) => a.drop_id - b.drop_id);
                selectedTab = {
                    ...activeTabContent,
                    reswipeBucket: reswipeBucketContent,
                    favBucket: favBucketContent
                };
            }

            const general = {
                ...state.general,
                enableReswipeMode: isReswipe,
                reswipeModeActive: reswipeModeActive,
                selectionCount: state.general.selectionCount + 1
            };

            return { ...state, [currentTab]: selectedTab, general };
        }
        case "REMOVE_USER_DATA": {

            const general = {
                ...state.general,
                selectionCount: state.general.selectionCount - 1
            };
            return { ...state, general };
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
