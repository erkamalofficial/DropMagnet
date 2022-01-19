const buckets = {
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
  art: JSON.parse(JSON.stringify(buckets)),
  music: JSON.parse(JSON.stringify(buckets)),
  collectible: JSON.parse(JSON.stringify(buckets)),
  fashion: JSON.parse(JSON.stringify(buckets)),
  CloneX: JSON.parse(JSON.stringify(buckets)),
  TWV: JSON.parse(JSON.stringify(buckets)),
  SUPR: JSON.parse(JSON.stringify(buckets)),
  DOODLE: JSON.parse(JSON.stringify(buckets)),
  BAYC: JSON.parse(JSON.stringify(buckets)),
  WOW: JSON.parse(JSON.stringify(buckets)),
  links: {},
  groupedLinks: [],
  availableLinks: [],
  nextIndex: 0,
  curIndex: new Date().getTime(),
  fetchMore: false
};

export default initialState;
