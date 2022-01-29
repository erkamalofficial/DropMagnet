export const buckets = {
  apiData: [],
  reswipedDrops: {},
  activeBucket: []
};

const initialState = {
  general: {
    isLoading: true,
    activeTabIndex: 0,
    enableReswipeMode: false,
    reswipeModeActive: false,
    selectionCount: 0,
    uidChanged: Date.now(),
    price: 0,
    galleryName: localStorage.getItem("galleryName") || "",
    selectedLinksIds: [],
    loadingIndexList: []
  },
  allCategories: {
    categories: [],
    external_creators: [],
  },
  links: {},
  groupedLinks: [],
  availableLinks: [],
  nextIndex: 0,
  curIndex: new Date().getTime(),
  fetchMore: false
};

export default initialState;
