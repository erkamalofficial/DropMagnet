import { db } from "../../firebase";

const getDataFromDb = async (dispatch, categoryType, actionType) => {
  try {
    const querySnapshot = await db
      .collection("drops_v1")
      .where("category", "==", categoryType)
      .get();
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    dispatch({ type: actionType, payload: result });
  } catch (err) {
    console.log(`error while fetching ${categoryType}`, err);
  }
};
export const fetchArt =
  ({ activeTabIndex }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_ARTS_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Art", "FETCH_ARTS_SUCCESS");
  };

export const fetchMusic =
  ({ activeTabIndex }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_MUSIC_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Music", "FETCH_MUSIC_SUCCESS");
  };
export const fetchColletibles =
  ({ activeTabIndex }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_COLLECTABLES_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Collectables", "FETCH_COLLECTABLES_SUCCESS");
  };
export const fetchFashion =
  ({ activeTabIndex }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_FASHION_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Fashion", "FETCH_FASHION_SUCCESS");
  };
export const fetchReswipeList = (tabIndex) => async (dispatch, getState) => {
  dispatch({
    type: "FETCH_RESWIPE_REQUEST",
    payload: { activeTabIndex: tabIndex },
  });
};
