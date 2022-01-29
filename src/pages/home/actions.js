import { db } from "../../firebase";
import * as DropMagnetAPI from '../../DropMagnetAPI'
import { getAllDropTabs } from "../../services/drop-services";

const getDataFromDb = async (dispatch, categoryType, actionType, activeTabIndex, extras) => {
  const querySnapshot = await db
    .collection("drops_v1")
    .where("category", "==", categoryType)
    .get();

  let response = {}
  let timeIndex = extras.curTime
  var d = new Date(timeIndex);
  let error = true
  let past = timeIndex < new Date().setUTCHours(0, 0, 0, 0) && !extras.random
  let i = 0;

  while (error) {
    d.setDate(d.getDate() - i);
    let tx = d.getTime()
    extras = { ...extras, curTime: tx }
    if (past) {
      d.setDate(d.getDate() - 1)
      extras = { ...extras, random: false }
    }

    try {
      dispatch({ type: "CHANGE_CUR_INDEX", payload: d.getTime() });
      response = await DropMagnetAPI.getFeeds(categoryType.toLowerCase(), extras, past)
        .then((res) => res)

      response['curIndex'] = d.getTime()
      response['random'] = extras.random
      dispatch({ type: actionType, payload: { ...response, activeTabIndex, categorySymbol: categoryType } });
      error = false
    }

    catch (err) {
      if (d.getTime() >= new Date().setUTCHours(0, 0, 0, 0)) {
        d = new Date();
        let curIdx = new Date()
        curIdx.setDate(curIdx.getDate() - 1)
        dispatch({ type: "CHANGE_CUR_INDEX", payload: curIdx.getTime() });
        error = true
        past = true
      }
      else if (extras.random) {
        d = new Date();
        let curIdx = new Date()
        curIdx.setDate(curIdx.getDate() - 1)
        dispatch({ type: "CHANGE_CUR_INDEX", payload: curIdx.getTime() });
        error = true
        past = true
      }
      else {
        // in case if there is no data to reset category from loading list
        dispatch({ type: actionType, payload: { data: [], count: 0, activeTabIndex, index: null, categorySymbol: categoryType } });
        error = false
      }
    }
  }

};

const getDataFromDb2 = async (dispatch, categorySymbol, actionType, activeTabIndex, extras , id) => {
  // const querySnapshot = await db
  //   .collection("drops_v1")
  //   .where("category", "==", categorySymbol)
  //   .get();

  let response = {}
  let timeIndex = extras.curTime
  var d = new Date(timeIndex);
  let error = true
  let past = timeIndex < new Date().setUTCHours(0, 0, 0, 0) && !extras.random
  let i = 0;

  while (error) {
    d.setDate(d.getDate() - i);
    let tx = d.getTime()
    extras = { ...extras, curTime: tx }
    if (past) {
      d.setDate(d.getDate() - 1)
      extras = { ...extras, random: false }
    }

    try {
      dispatch({ type: "CHANGE_CUR_INDEX", payload: d.getTime() });
      response = await DropMagnetAPI.getFeeds2(id , extras)
        .then((res) => res)

      response['curIndex'] = d.getTime()
      response['random'] = extras.random
      dispatch({ type: actionType, payload: { ...response, activeTabIndex, categorySymbol } });
      error = false
    } catch (err) {
      if (d.getTime() >= new Date().setUTCHours(0, 0, 0, 0)) {
        d = new Date();
        let curIdx = new Date()
        curIdx.setDate(curIdx.getDate() - 1)
        dispatch({ type: "CHANGE_CUR_INDEX", payload: curIdx.getTime() });
        error = true
        past = true
      }
      else if (extras.random) {
        d = new Date();
        let curIdx = new Date()
        curIdx.setDate(curIdx.getDate() - 1)
        dispatch({ type: "CHANGE_CUR_INDEX", payload: curIdx.getTime() });
        error = true
        past = true
      }
      else {
        // in case if there is no data to reset category from loading list
        dispatch({ type: actionType, payload: { data: [], count: 0, activeTabIndex, index: null, categorySymbol } });
        error = false
      }
    }
  }

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


export const fetchCategory = ( ) => async (dispatch, getState) => {
  try {
    // console.log('fetch catt action called');
    const { data } = await getAllDropTabs() 
    dispatch({ type: "FETCH_CATEGORY_SUCCESS" , payload : data });
  } catch (error) {
    dispatch({
      type: "FETCH_CATEGORY_ERROR",
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchExternalCreators =
  ({ extras }) =>
    async (dispatch, getState) => {
      const Ex = await DropMagnetAPI.getEC(extras)
      dispatch({ type: "FETCH_EC_SUCCESS" , payload : Ex });
  };


export const fetchCategoryDrops =
  ({ activeTabIndex, extras, id, categorySymbol, isExternalCategory }) =>
    async (dispatch) => {
      dispatch({
        type: "FETCH_CATEGORY_DROPS",
        payload: {
          categoryId: id,
          categorySymbol,
          activeTabIndex,
        },
      });

    if (isExternalCategory) {
      getDataFromDb2(dispatch, categorySymbol, "FETCH_CATEGORY_DROPS_SUCCESS", activeTabIndex, extras, id);
    } else {
      getDataFromDb(dispatch, categorySymbol, "FETCH_CATEGORY_DROPS_SUCCESS", activeTabIndex, extras);
    }
};