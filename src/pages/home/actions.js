import { db } from "../../firebase";
import * as DropMagnetAPI from '../../DropMagnetAPI'

const getDataFromDb = async (dispatch, categoryType, actionType, extras) => {

  try {
    const querySnapshot = await db
      .collection("drops_v1")
      .where("category", "==", categoryType)
      .get();

    const response = await DropMagnetAPI.getFeeds(categoryType.toLowerCase(), extras)
    .then((res) => res)
    dispatch({ type: actionType, payload: response });
  } catch (err) {
    dispatch({ type: actionType, payload: {data: [], index: null} });
    console.log(`error while fetching ${categoryType}`, err);
  }
};
export const fetchArt =
  ({ activeTabIndex, extras }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_ARTS_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Art", "FETCH_ARTS_SUCCESS", extras);
  };

export const fetchMusic =
  ({ activeTabIndex, extras }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_MUSIC_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Music", "FETCH_MUSIC_SUCCESS", extras);
  };
export const fetchColletibles =
  ({ activeTabIndex, extras }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_COLLECTABLES_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Collectables", "FETCH_COLLECTABLES_SUCCESS", extras);
  };
export const fetchFashion =
  ({ activeTabIndex, extras }) =>
  async (dispatch, getState) => {
    dispatch({
      type: "FETCH_FASHION_REQUEST",
      payload: {
        activeTabIndex,
      },
    });
    getDataFromDb(dispatch, "Fashion", "FETCH_FASHION_SUCCESS", extras);
  };

export const fetchReswipeBuckets = (idToken)=>{
  return dispatch => {
    DropMagnetAPI.getSaveDrops(idToken).then((data)=>{
      dispatch({type: 'SAVE_RESWIPE_BUCKETS',payload: data});
    }).catch((e)=>{
      console.log(e);
    })
  }
    
}
export const fetchReswipeList = (tabIndex) => async (dispatch, getState) => {
  dispatch({
    type: "FETCH_RESWIPE_REQUEST",
    payload: { activeTabIndex: tabIndex },
  });
};
