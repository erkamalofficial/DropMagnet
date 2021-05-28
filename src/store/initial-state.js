const buckets = {
  apiData: [],
  reswipeBucket: [],
  activeBucket: [],
  selectionBucket: { fav: [], rem: [] },
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
  },
  arts: JSON.parse(JSON.stringify(buckets)),
  music: JSON.parse(JSON.stringify(buckets)),
  collectables: JSON.parse(JSON.stringify(buckets)),
  fashion: JSON.parse(JSON.stringify(buckets)),
  links: {},
  groupedLinks: [],
  availableLinks: [],
};

export default initialState;
