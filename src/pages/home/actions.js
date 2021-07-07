import { db } from "../../firebase";
import * as DropMagnetAPI from '../../DropMagnetAPI'

const getDataFromDb = async (dispatch, categoryType, actionType, extras) => {

  const querySnapshot = await db
    .collection("drops_v1")
    .where("category", "==", categoryType)
    .get();

  let response = []
  let timeIndex = extras.curTime
  let i = 0;
  while (Object.keys(response).length < 1) {
    var d = new Date(timeIndex);
    d.setDate(d.getDate() - i);
    console.log(d.getTime(), timeIndex)
    extras ={...extras, curTime: d.getTime()}
    try {
      response = await DropMagnetAPI.getFeeds(categoryType.toLowerCase(), extras)
        .then((res) => res)
      response['curIndex'] = d.getTime()
    }
    catch (err) {
      i += 1
    }
  }
  dispatch({ type: actionType, payload: response});

  // dispatch({ type: actionType, payload: { data: [], index: null } });

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

export const fetchReswipeBuckets = (idToken) => {
  return dispatch => {
    DropMagnetAPI.getSaveDrops(idToken).then((data) => {
      dispatch({ type: 'SAVE_RESWIPE_BUCKETS', payload: data });
    }).catch((e) => {
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
