import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import initialState from "./initial-state";

const getProcessedCollection = (state, action, type) => {
  const general = { ...state.general, isLoading: false };
  const [first, second, third] = action.payload;

  const collection = {
    ...state[type],
    apiData: [...action.payload],
    activeBucket: [third, second, first],
  };
  return {
    ...state,
    [type]: collection,
    general,
  };
};

const duringReswipe = (activeTabContent, drop_id) => {
  const selectedIndex = activeTabContent.reswipeBucket.findIndex(
    (card) => card.drop_id === drop_id
  );
  if (selectedIndex === 0) {
    const cardIdsAlreadySwiped = [...activeTabContent.selectionBucket.fav];
    const activeBucketContent = activeTabContent.apiData.filter((card) =>
      cardIdsAlreadySwiped.includes(card.drop_id)
    );

    Object.assign(activeTabContent, {
      reswipeBucket: activeBucketContent,
    });
  }
  return activeTabContent;
};

const categoryReducer = (state = initialState, action) => {
  const tabList = ["arts", "music", "collectables", "fashion"];

  switch (action.type) {
    case "general": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
      };
      return { ...state, general };
    }
    case "FETCH_MUSIC_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      return { ...state, general };
    }
    case "FETCH_MUSIC_SUCCESS": {
      const musicCollection = getProcessedCollection(state, action, "music");
      return musicCollection;
    }
    case "FETCH_ARTS_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      return { ...state, general };
    }
    case "FETCH_ARTS_SUCCESS": {
      const artsCollection = getProcessedCollection(state, action, "arts");
      return artsCollection;
    }
    case "FETCH_COLLECTABLES_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      return { ...state, general };
    }
    case "FETCH_COLLECTABLES_SUCCESS": {
      const collectablesCollection = getProcessedCollection(
        state,
        action,
        "collectables"
      );
      return collectablesCollection;
    }

    case "FETCH_FASHION_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      return { ...state, general };
    }
    case "FETCH_FASHION_SUCCESS": {
      const fashionCollection = getProcessedCollection(
        state,
        action,
        "fashion"
      );
      return fashionCollection;
    }

    case "FETCH_RESWIPE_REQUEST": {
      const currentTab = tabList[state.general.activeTabIndex];
      const activeTabContent = state[currentTab];

      const cardIdsAlreadySwiped = [
        ...activeTabContent.selectionBucket.fav,
        ...activeTabContent.selectionBucket.rem,
      ];
      const remainingCardsForSwipe = activeTabContent.apiData.filter(
        (card) => !cardIdsAlreadySwiped.includes(card.drop_id)
      );

      const selectedTabContent = {
        ...activeTabContent,
        activeBucket: remainingCardsForSwipe,
      };
      const general = { ...state.general, reswipeModeActive: false };

      return { ...state, general, [currentTab]: selectedTabContent };
    }
    case "ADD_USER_DATA": {
      const currentTab = tabList[state.general.activeTabIndex];
      const activeTabContent = state[currentTab];
      const { selectionBucket, activeBucket, apiData } = activeTabContent;
      const { drop_id } = action.payload;

      var reswipeModeActive = state.general.reswipeModeActive;
      const favList = selectionBucket.fav;
      if (favList.length < 10 && !favList.includes(drop_id)) {
        favList.push(drop_id);
      }

      const isFavBucketHasTenItems = favList.length === 10;
      if (isFavBucketHasTenItems && !state.general.reswipeModeActive) {
        reswipeModeActive = true;
      }

      if (activeBucket.length < apiData.length) {
        activeBucket.unshift(apiData[activeBucket.length]);
      }

      if (isFavBucketHasTenItems) {
        const reswipeBucketContent = apiData.filter((card) =>
          favList.includes(card.drop_id)
        );
        Object.assign(activeTabContent, {
          reswipeBucket: reswipeBucketContent,
        });
      }
      if (reswipeModeActive && isFavBucketHasTenItems) {
        console.log("WHiat should do");
      }

      if (reswipeModeActive) {
        duringReswipe(activeTabContent, drop_id);
      }

      const general = {
        ...state.general,
        reswipeModeActive: reswipeModeActive,
        selectionCount: state.general.selectionCount + 1,
      };

      return { ...state, [currentTab]: activeTabContent, general };
    }
    case "REMOVE_USER_DATA": {
      const currentTab = tabList[state.general.activeTabIndex];
      const activeTabContent = state[currentTab];
      const { selectionBucket, activeBucket, apiData } = activeTabContent;

      const { drop_id } = action.payload;

      var userRem = selectionBucket.rem;
      var userFav = selectionBucket.fav;
      if (userFav.includes(drop_id)) {
        selectionBucket.fav = userFav.filter((item) => item !== drop_id);
      }
      if (!userRem.includes(drop_id)) {
        selectionBucket.rem.push(drop_id);
      }

      if (activeBucket.length < apiData.length) {
        activeBucket.unshift(apiData[activeBucket.length]);
      }

      if (state.general.reswipeModeActive) {
        duringReswipe(activeTabContent, drop_id);
      }

      const general = {
        ...state.general,
        selectionCount: state.general.selectionCount - 1,
      };

      return { ...state, general, [currentTab]: activeTabContent };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  category: categoryReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
