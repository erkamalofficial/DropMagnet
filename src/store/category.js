import initialState from "./initial-state";
import { forEach, map, union, values } from "lodash";
import emojis from "./emojiicons";
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
  const general = { ...state.general, isLoading: false };

  let goBack = action.payload.curIndex <= new Date().setUTCHours(0, 0, 0, 0)
    && action.payload.count !== 0 && !action.payload.random

  // console.log(action.payload.curIndex <= new Date().setUTCHours(0, 0, 0, 0),!action.payload.random, action.payload.count !== 0)

  var bucket = []
  if(action.payload && action.payload.drops ){
    bucket = !goBack ? action.payload.drops : action.payload.drops.reverse()
  }
  else{
    bucket = !goBack ? action.payload.data : action.payload.data.reverse()
  }

  

  let pastIndex = null

  if (goBack) {
    pastIndex = goBack ? action.payload.data[0].drop_date : null
    let pastDate = new Date(pastIndex)
    pastDate.setDate(pastDate.getDate() - 1)
    pastIndex = pastDate.getTime()
    console.log(`Current card fetched from : ${pastDate.getDate()}-${pastDate.getMonth() + 1}-${pastDate.getFullYear()}`)
  }

  const collection = {
    ...state[type],
    activeBucket: bucket
  };
  console.log(bucket);

  return {
    ...state,
    [type]: collection,
    general,
    nextIndex: !goBack ? action.payload.index : pastIndex,
    fetchMore: false
  };
};


const categoryReducer = (state = initialState, action) => {
  const tabList = ["art", "music", "collectible", "fashion","CloneX","TWV","SUPR","DOODLE","BAYC","WOW"];
  // const tabList = ["art"];

  switch (action.type) {
    case "general": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
      };
      return { ...state, general };
    }

    case "FETCH_CATEGORY_REQUEST" : {
      return { ...state , loading: true };
    }
    case "FETCH_CATEGORY_SUCCESS" : {
      console.log(action.payload);
      return {...state , loading: false, allCategories : action.payload };
    }

    case "CHANGE_CUR_INDEX": {
      return { ...state, curIndex: action.payload }
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
      const artsCollection = getProcessedCollection(state, action, "art");
      return artsCollection;
    }


    case "FETCH_CloneX_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      console.log(action.payload.activeTabIndex)
      return { ...state, general };
    }
    case "FETCH_CloneX_SUCCESS": {
      const cloneXCollection = getProcessedCollection(state, action, "CloneX");
      console.log(cloneXCollection);
      return cloneXCollection;
    }

    case "FETCH_WOW_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      console.log(action.payload.activeTabIndex)
      return { ...state, general };
    }
    case "FETCH_WOW_SUCCESS": {
      const cloneXCollection = getProcessedCollection(state, action, "WOW");
      console.log(cloneXCollection);
      return cloneXCollection;
    }

    case "FETCH_DOODLE_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      console.log(action.payload.activeTabIndex)
      return { ...state, general };
    }
    case "FETCH_DOODLE_SUCCESS": {
      const cloneXCollection = getProcessedCollection(state, action, "DOODLE");
      console.log(cloneXCollection);
      return cloneXCollection;
    }

    case "FETCH_BAYC_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      console.log(action.payload.activeTabIndex)
      return { ...state, general };
    }
    case "FETCH_BAYC_SUCCESS": {
      const cloneXCollection = getProcessedCollection(state, action, "BAYC");
      console.log(cloneXCollection);
      return cloneXCollection;
    }

    case "FETCH_DWolves_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      console.log(action.payload.activeTabIndex)
      return { ...state, general };
    }
    case "FETCH_DWolves_SUCCESS": {
      const cloneXCollection = getProcessedCollection(state, action, "TWV");
      return cloneXCollection;
    }

    case "FETCH_SuperRare_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      console.log(action.payload.activeTabIndex)
      return { ...state, general };
    }
    case "FETCH_SuperRare_SUCCESS": {
      const cloneXCollection = getProcessedCollection(state, action, "SUPR");
      return cloneXCollection;
    }

    case "FETCH_EC_SUCCESS": {
      console.log('ec fetch success',action.payload)
      return {...state , EC : action.payload};
    }


    case "FETCH_COLLECTIBLES_REQUEST": {
      const general = {
        ...state.general,
        activeTabIndex: action.payload.activeTabIndex,
        isLoading: true,
      };
      return { ...state, general };
    }
    case "FETCH_COLLECTIBLES_SUCCESS": {
      const collectiblesCollection = getProcessedCollection(
        state,
        action,
        "collectible"
      );
      return collectiblesCollection;
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
      console.log(currentTab , state.general.activeTabIndex);
      const activeTabContent = state[currentTab];
      console.log('bucket',currentTab)
      console.log('bucket',state[currentTab]);
      if(!activeTabContent) return {...state} ;
      const { reswipedDrops, activeBucket } = activeTabContent;
      const { drop_id, dropIndex } = action.payload;
      if (!state.general.reswipeModeActive) {
        reswipedDrops[activeBucket[dropIndex].id] = activeBucket[dropIndex];

        Object.assign(activeTabContent, { reswipedDrops });
        let reswipeModeActive = false;
        if (Object.keys(reswipedDrops).length >= MAX_BUCKET_SIZE) {
          reswipeModeActive = true;
        }

        const general = {
          ...state.general,
          reswipeModeActive: reswipeModeActive,
        };

        return { ...state, [currentTab]: activeTabContent, general };

      } else {
        return state;
      }
    }
    case "REMOVE_USER_DATA": {
      const currentTab = tabList[state.general.activeTabIndex];
      const activeTabContent = state[currentTab];
      console.log('active t c',activeTabContent)
      if(!activeTabContent) return {...state} ;
      const { reswipedDrops } = activeTabContent;

      const { drop_id } = action.payload;

      delete reswipedDrops[drop_id];
      console.log()
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

    case "START_RESWIPE": {
      const { newBucket } = action.payload;
      const currentTab = tabList[state.general.activeTabIndex];
      const reswipedDrops = {
        "art": {},
        "music": {},
        "fashion": {},
        "collectible": {},
        "CloneX":{},
        "TWV":{},
        "SUPR":{},
        "DOODLE":{},
        "BAYC":{},
        "WOW":{}
      };
      newBucket.map((d) => {
        switch (d.category) {
          case 'art': {
            reswipedDrops["art"][d.id] = d;
            break;
          }
          case 'music': {
            reswipedDrops["music"][d.id] = d;
            break;
          }
          case 'fashion': {
            reswipedDrops["fashion"][d.id] = d;

            break;
          }
          case 'collectible': {
            reswipedDrops["collectible"][d.id] = d;
            break;
          }
          case 'CloneX': {
            reswipedDrops["CloneX"][d.id] = d;
            break;
          }
          case 'TWV': {
            reswipedDrops["TWV"][d.id] = d;
            break;
          }
          case 'SUPR': {
            reswipedDrops["SUPR"][d.id] = d;
            break;
          }
          case 'DOODLE': {
            reswipedDrops["DOODLE"][d.id] = d;
            break;
          }
          case 'BAYC': {
            reswipedDrops["BAYC"][d.id] = d;
            break;
          }
          case 'WOW': {
            reswipedDrops["WOW"][d.id] = d;
            break;
          }
          default: ;
        }

      })

      const general = {
        ...state.general,
        reswipeModeActive: Object.keys(reswipedDrops['art']).length >= 1 ? true : false
      }
      return {
        ...state,
        general,
        "art": { ...state.art, reswipedDrops: reswipedDrops["art"] },
        "collectible": { ...state.collectible, reswipedDrops: reswipedDrops["collectible"] },
        "music": { ...state.music, reswipedDrops: reswipedDrops["music"] },
        "fashion": { ...state.fashion, reswipedDrops: reswipedDrops["fashion"] },
        "CloneX": { ...state.fashion, reswipedDrops: reswipedDrops["CloneX"] },
        "TWV": { ...state.fashion, reswipedDrops: reswipedDrops["TWV"] },
        "SUPR": { ...state.fashion, reswipedDrops: reswipedDrops["SUPR"] },
        "DOODLE": { ...state.fashion, reswipedDrops: reswipedDrops["DOODLE"] },
        "BAYC": { ...state.fashion, reswipedDrops: reswipedDrops["BAYC"] },
        "WOW": { ...state.fashion, reswipedDrops: reswipedDrops["WOW"] },
      }
    }

    case 'SAVE_RESWIPE_BUCKETS': {
      const savedDrops = action.payload;
      const currentTab = tabList[state.general.activeTabIndex];
      const reswipedDrops = {
        "art": {},
        "music": {},
        "fashion": {},
        "collectible": {},
        "CloneX":{},
        "TWV":{},
        "SUPR":{},
        "DOODLE":{},
        "BAYC":{},
        "WOW":{}
      };
      savedDrops.map((d) => {
        switch (d.category) {
          case 'art': {
            reswipedDrops["art"][d.id] = d;
            break;
          }
          case 'music': {
            reswipedDrops["music"][d.id] = d;
            break;
          }
          case 'fashion': {
            reswipedDrops["fashion"][d.id] = d;

            break;
          }
          case 'collectible': {
            reswipedDrops["collectible"][d.id] = d;
            break;
          }
          case 'CloneX': {
            reswipedDrops["CloneX"][d.id] = d;
            break;
          }
          case 'TWV': {
            reswipedDrops["TWV"][d.id] = d;
            break;
          }
          case 'SUPR': {
            reswipedDrops["SUPR"][d.id] = d;
            break;
          }
          
          case 'DOODLE': {
            reswipedDrops["DOODLE"][d.id] = d;
            break;
          }
          case 'BAYC': {
            reswipedDrops["BAYC"][d.id] = d;
            break;
          }
          case 'WOW': {
            reswipedDrops["WOW"][d.id] = d;
            break;
          }
          default: ;
        }

      })

      let reswipeModeActive = false;
      if (Object.keys(reswipedDrops[currentTab]).length >= MAX_BUCKET_SIZE) {
        reswipeModeActive = true;
      }
      const general = {
        ...state.general,
        reswipeModeActive
      }
      console.log('here to check array');
      return {
        ...state,
        general,
        "art": { ...state.art, reswipedDrops: reswipedDrops["art"] },
        "collectible": { ...state.collectible, reswipedDrops: reswipedDrops["collectible"] },
        "music": { ...state.music, reswipedDrops: reswipedDrops["music"] },
        "fashion": { ...state.fashion, reswipedDrops: reswipedDrops["fashion"] },
        "CloneX": { ...state.fashion, reswipedDrops: reswipedDrops["CloneX"] },
        "TWV": { ...state.fashion, reswipedDrops: reswipedDrops["TWV"] },
        "SUPR": { ...state.fashion, reswipedDrops: reswipedDrops["SUPR"] },
        "DOODLE": { ...state.fashion, reswipedDrops: reswipedDrops["DOODLE"] },
        "BAYC": { ...state.fashion, reswipedDrops: reswipedDrops["BAYC"] },
        "WOW": { ...state.fashion, reswipedDrops: reswipedDrops["WOW"] },
      }
    }
    case 'FETCH_MORE_FEEDS': {
      return { ...state, fetchMore: action.payload };
    }
    default:
      return state;
  }
};

export default categoryReducer;
