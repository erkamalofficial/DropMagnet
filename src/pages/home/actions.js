export const fetchArt = ({ activeTabIndex }) => async (dispatch, getState) => {
    dispatch({
        type: "FETCH_ARTS_REQUEST", payload: {
            activeTabIndex
        }
    });
    const response = await fetch(`/api/arts`);
    const result = await response.json();
    dispatch({ type: "FETCH_ARTS_SUCCESS", payload: result });
};

export const fetchMusic = ({ activeTabIndex }) => async (dispatch, getState) => {
    dispatch({
        type: "FETCH_MUSIC_REQUEST", payload: {
            activeTabIndex
        }
    });
    const response = await fetch(`/api/music`);
    const result = await response.json();
    dispatch({ type: "FETCH_MUSIC_SUCCESS", payload: result });
};
export const fetchColletibles = ({ activeTabIndex }) => async (dispatch, getState) => {
    dispatch({
        type: "FETCH_COLLECTABLES_REQUEST", payload: {
            activeTabIndex
        }
    });
    const response = await fetch(`/api/collectables`);
    const result = await response.json();
    dispatch({ type: "FETCH_COLLECTABLES_SUCCESS", payload: result });
};
export const fetchFashion = ({ activeTabIndex }) => async (dispatch, getState) => {
    dispatch({
        type: "FETCH_FASHION_REQUEST", payload: {
            activeTabIndex
        }
    });
    const response = await fetch(`/api/fashion`);
    const result = await response.json();
    dispatch({ type: "FETCH_FASHION_SUCCESS", payload: result });
};
export const fetchReswipeList = (tabIndex) => async (dispatch, getState) => {
    dispatch({
        type: "FETCH_RESWIPE_REQUEST",
        payload: { activeTabIndex: tabIndex }
    });
};



