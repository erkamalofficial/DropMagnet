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

const duringReswipe = (activeTabContent, drop_id, state) => {
  const selectedIndex = activeTabContent.reswipeBucket.findIndex(
    (card) => card.drop_id === drop_id
  );

  if (selectedIndex === 0) {
    const cardIdsAlreadySwiped = [...activeTabContent.selectionBucket.fav];
    const reswipeBucketContent = activeTabContent.apiData.filter((card) =>
      cardIdsAlreadySwiped.includes(card.drop_id)
    );
    if (activeTabContent.reswipeBucket.length === reswipeBucketContent.length) {
      Object.assign(state.general, {
        uidChanged: Date.now(),
      });
    }
    Object.assign(activeTabContent, {
      reswipeBucket: reswipeBucketContent,
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

      if (reswipeModeActive) {
        duringReswipe(activeTabContent, drop_id, state);
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
        duringReswipe(activeTabContent, drop_id, state);
      }

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
      const general = { ...state.general, isLoading: false };
      return {
        ...state,
        general,
        links: action.payload,
        groupedLinks: getGroupedLinks(action.payload),
      };
    }
    case "LINK_UPDATE_REQUEST": {
      const general = {
        ...state.general,
        price: action.payload.price,
        selectedLinksIds: action.payload.linkIds,
      };
      return {
        ...state,
        general,
      };
    }
    case "FETCH_AVAILABLE_LINKS_REQUEST": {
      const general = {
        ...state.general,
        isLoading: true,
        galleryName: action.payload,
      };
      window.localStorage.setItem("galleryName", action.payload);
      return {
        ...state,
        general,
      };
    }
    case "FETCH_AVAILABLE_LINKS_SUCCESS": {
      const general = {
        ...state.general,
        isLoading: false,
      };
      // let availableLinks = map(action.payload, (x) => Object.keys(x)[0]);
      const allLinks = [...state.links];
      const newGrouped = getAvailableLinks(allLinks, action.payload);

      return {
        ...state,
        general,
        availableLinks: action.payload,
        groupedLinks: newGrouped,
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
