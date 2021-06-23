import { db } from "../../firebase";
import * as DropMagnetAPI from '../../DropMagnetAPI'

const getDataFromDb = async (dispatch, categoryType, actionType, extras) => {

  try {
    const querySnapshot = await db
      .collection("drops_v1")
      .where("category", "==", categoryType)
      .get();
    

    // https://drop-backend-rnd454q4pa-ew.a.run.app/drops/feed?from=15-04-2021&to=8-04-2021&category=art
    // DropMagnetAPI.getFeeds(token)
    // const result = []
    // querySnapshot.forEach((doc) => {
    //   result.push(doc.data());
    // });

    const response = await DropMagnetAPI.getFeeds(categoryType.toLowerCase(), extras)
    .then(function(res){
      let data= res.data
      let resData = []
      Object.keys(data).forEach((k) => {
        let obj = {
          date: k,
          drops: data[k]
        }
        obj.drops.forEach(d => {
          if(d.user_id !== extras.userID){
            resData.push(d)
          }
        })
      })
      return resData
    })
    response.reverse()
    dispatch({ type: actionType, payload: response });
  } catch (err) {
    dispatch({ type: actionType, payload: [] });
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
export const fetchReswipeList = (tabIndex) => async (dispatch, getState) => {
  dispatch({
    type: "FETCH_RESWIPE_REQUEST",
    payload: { activeTabIndex: tabIndex },
  });
};
