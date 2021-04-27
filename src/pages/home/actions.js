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



