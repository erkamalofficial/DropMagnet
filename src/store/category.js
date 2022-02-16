import initialState, { buckets } from "./initial-state";
import { forEach, map, union, values } from "lodash";
import emojis from "./emojiicons";
import { getCategorySymbolByPosition, getFirstExternalCategoryPosition } from "../utils/category";
import { getCategorySavedDrops } from "../DropMagnetAPI";

const MAX_BUCKET_SIZE = 10;
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
  const loadingIndexList = state.general.loadingIndexList.filter(it => it !== action.payload?.activeTabIndex);
  const general = { ...state.general, isLoading: false, loadingIndexList };

  let goBack = action.payload.curIndex <= new Date().setUTCHours(0, 0, 0, 0)
    && action.payload.count !== 0 && !action.payload.random

  let bucket;

  if (action.payload && action.payload.drops) {
    bucket = !goBack ? action.payload.drops : action.payload.drops.reverse()
  } else {
    bucket = !goBack ? action.payload.data : action.payload.data.reverse()
  }

  let pastIndex = null

  if (goBack) {
    pastIndex = goBack ? action.payload.data[0].drop_date : null
    let pastDate = new Date(pastIndex)
    pastDate.setDate(pastDate.getDate() - 1)
    pastIndex = pastDate.getTime()
    // console.log(`Current card fetched from : ${pastDate.getDate()}-${pastDate.getMonth() + 1}-${pastDate.getFullYear()}`)
  }

  const currentCollectionState = state[type] ? state[type] : { apiData: [], reswipedDrops: {}, activeBucket: [] };

  const collection = {
    ...currentCollectionState,
    activeBucket: bucket
  };

  return {
    ...state,
    [type]: collection,
    general,
    nextIndex: !goBack ? action.payload.index : pastIndex,
    fetchMore: false
  };
};


const categoryReducer = (state = initialState, action) => {
  const loadingIndexList = [...state.general.loadingIndexList];

  if (action.payload?.activeTabIndex) {
    loadingIndexList.push(action.payload.activeTabIndex);
  }

  switch (action.type) {
    case "general": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        loadingIndexList: loadingIndexList
      };
      return { ...state, general };
    }

    case "FETCH_CATEGORY_REQUEST" : {
      return { ...state , loading: true };
    }
    case "FETCH_CATEGORY_SUCCESS" : {
      return {
        ...state,
        general: {
          ...state.general,
          activeTabIndex: getFirstExternalCategoryPosition(action.payload),
        },
        loading: false,
        allCategories : action.payload
      };
    }

    case "CHANGE_CUR_INDEX": {
      return { ...state, curIndex: action.payload }
    }

    case "FETCH_EC_SUCCESS": {
      return {...state , EC : action.payload};
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
      const currentTab = action.payload.currentTab
      const activeTabContent = state[currentTab];

      const { reswipedDrops, activeBucket } = activeTabContent;
      const { drop_id, dropIndex } = action.payload;

      const general = {
        ...state.general,
        reswipeModeActive: state.general.reswipeModeActive,
      };
      console.log("length:", action.payload.length)
      if(action.payload.length >= MAX_BUCKET_SIZE) { // - 1
        console.log("overflow")
        general.reswipeModeActive = true;
        return { ...state, general: general };
      }
      else {
        if(!activeTabContent) {
          console.log("activeTabContent")
          return {...state};
        }
        
        console.log("state reswipeMode: ", state.general.reswipeModeActive)
        reswipedDrops[activeBucket[dropIndex].id] = activeBucket[dropIndex];

        Object.assign(activeTabContent, { reswipedDrops });
        return { ...state, general: general, [currentTab]: activeTabContent };
      }
    }
    case "REMOVE_USER_DATA": {
      const currentTab = getCategorySymbolByPosition(state.general.activeTabIndex, state.allCategories);
      const activeTabContent = state[currentTab];

      if(!activeTabContent) return {...state} ;
      const { reswipedDrops } = activeTabContent;

      const { drop_id } = action.payload;

      delete reswipedDrops[drop_id];
      const general = {
        ...state.general,
        selectionCount: state.general.selectionCount - 1,
      };

      Object.assign(activeTabContent, { reswipedDrops });

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
      const { newBucket, tab } = action.payload;
      return {
        ...state,
        general: {
          ...state.general,
          reswipeModeActive: false
        },
        [tab]: { ...state[tab], reswipedDrops: newBucket }
      }

    }

    // Can be used for array with various categories or for specific one
    case "START_RESWIPE":
    case 'CATEGORY_SAVED_BUCKET': {
      const { newBucket } = action.payload;

      const reswipedDrops = {};
      newBucket.forEach((d) => {
        if (!reswipedDrops[d.category]) {
          reswipedDrops[d.category] = {};
        }

        reswipedDrops[d.category][d.id] = d;
      });


      const general = {
        ...state.general,
        reswipeModeActive: false // Object.keys(reswipedDrops['art').length >= 1
      }

      const updatedCategories = Object.entries(reswipedDrops).reduce((previousValue, [key, value]) => ({
          ...previousValue,
          [key]: {
            ...state[key],
            reswipedDrops: value,
          }
        }), {});

      return {
        ...state,
        general,
        ...updatedCategories
      }
    }

    case 'SAVE_RESWIPE_BUCKETS': {
      const savedDrops = action.payload;
      const currentTab = getCategorySymbolByPosition(state.general.activeTabIndex, state.allCategories);
      const reswipedDrops = {};

      let reswipeModeActive = false;
      if (Object.keys(reswipedDrops[currentTab]).length >= MAX_BUCKET_SIZE) {
        reswipeModeActive = true;
      }

      savedDrops.forEach((d) => {
        if (!reswipedDrops[d.category]) {
          reswipedDrops[d.category] = {};
        }

        reswipedDrops[d.category][d.id] = d;
      });

      // let reswipeModeActive = false;
      // if (Object.keys(reswipedDrops[currentTab]).length >= MAX_BUCKET_SIZE) {
      //   reswipeModeActive = true;
      // }
      const general = {
        ...state.general,
        reswipeModeActive
      }

      const updatedCategories = Object.entries(reswipedDrops).reduce(
        (previousValue, [key, value]) => ({
          ...previousValue,
          [key]: {
            ...state[key],
            reswipedDrops: value,
          }
        }), {});

      return {
        ...state,
        general,
        ...updatedCategories,
      }
    }
    case 'FETCH_MORE_FEEDS': {
      return { ...state, fetchMore: action.payload };
    }
    case 'FETCH_CATEGORY_DROPS': {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
        loadingIndexList
      };
      return { ...state, general };
    }

    case 'FETCH_CATEGORY_DROPS_SUCCESS': {
      const updatedState = getProcessedCollection(state, action, action.payload.categorySymbol);

      return { ...updatedState };
    }
    default:
      return state;
  }
};

export default categoryReducer;
