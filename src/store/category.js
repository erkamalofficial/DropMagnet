import initialState from "./initial-state";
import { forEach, map, union, values } from "lodash";
import emojis from "./emojiicons";

const getAvailableLinks = (allLinks, availableLinks) => {
  forEach(availableLinks, (avLink) => {
    forEach(allLinks, (item) => {
      const linkKey = Object.keys(avLink)[0];
      if (linkKey === item.id && avLink[linkKey] === 1) {
        item.active = "S";
      }
    });
  });
  return getGroupedLinks(allLinks);
};

const getGroupedLinks = (linkList) => {
  const categories = union(...map(linkList, (item) => item.tags));
  const groupedList = {};
  linkList.forEach((link) => {
    categories.forEach((key) => {
      if (link.tags.includes(key)) {
        groupedList[key] = groupedList[key] || [];
        groupedList[key].push({ icon: emojis[key], title: key, item: link });
      }
    });
  });

  return values(groupedList);
};


const getProcessedCollection = (state, action, type) => {
  const general = { ...state.general, isLoading: false };

  const collection = {
    ...state[type],
    activeBucket: [...action.payload].reverse()
  };
  return {
    ...state,
    [type]: collection,
    general,
  };
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

    // case "FETCH_RESWIPE_REQUEST": {
    //   const currentTab = tabList[state.general.activeTabIndex];
    //   const activeTabContent = state[currentTab];

    //   const cardIdsAlreadySwiped = [
    //     ...activeTabContent.selectionBucket.fav,
    //     ...activeTabContent.selectionBucket.rem,
    //   ];
    //   const remainingCardsForSwipe = activeTabContent.apiData.filter(
    //     (card) => !cardIdsAlreadySwiped.includes(card.drop_id)
    //   );

    //   const selectedTabContent = {
    //     ...activeTabContent,
    //     activeBucket: remainingCardsForSwipe,
    //   };
    //   const general = { ...state.general, reswipeModeActive: false };

    //   return { ...state, general, [currentTab]: selectedTabContent };
    // }
    case "ADD_USER_DATA": {
      const currentTab = tabList[state.general.activeTabIndex];
      const activeTabContent = state[currentTab];
      const { selectionBucket, activeBucket } = activeTabContent;
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

      // if (activeBucket.length < apiData.length) {
      //   activeBucket.unshift(apiData[activeBucket.length]);
      // }

        const reswipeBucketContent = activeBucket.filter((card) =>{
          return favList.includes(card.id)

        }
      );
        Object.assign(activeTabContent, {
          reswipeBucket: reswipeBucketContent,
        });

        console.log(reswipeBucketContent);

      // if (reswipeModeActive) {
      //   duringReswipe(activeTabContent, drop_id, state);
      // }

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
      const { selectionBucket, activeBucket } = activeTabContent;

      const { drop_id } = action.payload;

      var userRem = selectionBucket.rem;
      var userFav = selectionBucket.fav;
      if (userFav.includes(drop_id)) {
        selectionBucket.fav = userFav.filter((item) => item !== drop_id);
      }
      if (!userRem.includes(drop_id)) {
        selectionBucket.rem.push(drop_id);
      }

      // if (activeBucket.length < apiData.length) {
      //   activeBucket.unshift(apiData[activeBucket.length]);
      // }

      // if (state.general.reswipeModeActive) {
      //   duringReswipe(activeTabContent, drop_id, state);
      // }

      const general = {
        ...state.general,
        selectionCount: state.general.selectionCount - 1,
      };

      return { ...state, general, [currentTab]: activeTabContent };
    }
    case "FETCH_LINKS_REQUEST": {
      const general = {
        ...state.general,
        isLoading: true,
      };
      return { ...state, general };
    }
    case "FETCH_LINKS_SUCCESS": {
      console.log(action.payload)
      const general = { ...state.general, isLoading: false };
      return {
        ...state,
        general,
        links: action.payload,
        groupedLinks: getGroupedLinks(action.payload),
      };
    }
    case "PRICE_UPDATE_REQUEST": {
      const general = { ...state.general, price: action.payload.price };
      return {
        ...state,
        general,
      };
    }
    case "SET_RESWIPE_BUCKET": {
      const {newBucket, tab} = action.payload;
      const newSelectionFav = newBucket.map((bucket)=>bucket.id);
      
      return{
        ...state,
        general: {
          ...state.general,
          reswipeModeActive: false
        },
        [tab]: {...state[tab], reswipeBucket: newBucket, selectionBucket: {fav: newSelectionFav, rem:[]}}
      }
    }

    case "CLOSE_RESWIPE": {
      const {tab} = action.payload;
      return{
        ...state,
        general: {
          ...state.general,
          reswipeModeActive: false
        },
        [tab]: {...state[tab], reswipeBucket: []}
      }
    }

    default:
      return state;
  }
};

export default categoryReducer;
