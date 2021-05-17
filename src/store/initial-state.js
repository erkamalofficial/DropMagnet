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
  },
  arts: JSON.parse(JSON.stringify(buckets)),
  music: JSON.parse(JSON.stringify(buckets)),
  collectables: JSON.parse(JSON.stringify(buckets)),
  fashion: JSON.parse(JSON.stringify(buckets)),
};

export default initialState;
