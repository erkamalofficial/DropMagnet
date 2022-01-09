import { db } from "../../firebase";
import * as DropMagnetAPI from '../../DropMagnetAPI'
import { getAllDropTabs } from "../../services/drop-services";

const getDataFromDb = async (dispatch, categoryType, actionType, extras) => {

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
      dispatch({ type: actionType, payload: response });
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
        dispatch({ type: actionType, payload: { data: [], count: 0, index: null } });
        error = false
      }
    }
  }

};

const getDataFromDb2 = async (dispatch, categoryType, actionType, extras , id) => {

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
      response = await DropMagnetAPI.getFeeds2(id , extras)
        .then((res) => res)

      response['curIndex'] = d.getTime()
      response['random'] = extras.random
      dispatch({ type: actionType, payload: response });
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
        dispatch({ type: actionType, payload: { data: [], count: 0, index: null } });
        error = false
      }
    }
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

export const fetchCloneX =
    ({ activeTabIndex, extras , id }) =>
      async (dispatch, getState) => {
        //works fine til here
        dispatch({
          type: "FETCH_CloneX_REQUEST",
          payload: {
            activeTabIndex,
          },
        });
        
        getDataFromDb2(dispatch, "cloneX", "FETCH_CloneX_SUCCESS", extras , id);
};

export const fetchDW =
    ({ activeTabIndex, extras , id }) =>
      async (dispatch, getState) => {
        //works fine til here
        dispatch({
          type: "FETCH_DWolves_REQUEST",
          payload: {
            activeTabIndex,
          },
        });
        
        getDataFromDb2(dispatch, "TWV", "FETCH_DWolves_SUCCESS", extras, id);
};

export const fetchSR=
    ({ activeTabIndex, extras , id }) =>
      async (dispatch, getState) => {
        //works fine til here
        dispatch({
          type: "FETCH_SuperRare_REQUEST",
          payload: {
            activeTabIndex,
          },
        });
        
        getDataFromDb2(dispatch, "SUPR", "FETCH_SuperRare_SUCCESS", extras, id);
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
        type: "FETCH_COLLECTIBLES_REQUEST",
        payload: {
          activeTabIndex,
        },
      });
      getDataFromDb(dispatch, "Collectible", "FETCH_COLLECTIBLES_SUCCESS", extras);
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


export const fetchCategory = ( ) => async (dispatch, getState) => {
  try {
    console.log('fetch catt action called');
    const { data } = await getAllDropTabs() 
    dispatch({ type: "FETCH_CATEGORY_SUCCESS" , payload : data });
} 

catch (error) {
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



