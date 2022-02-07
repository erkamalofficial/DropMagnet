const defaultState = {
    isOpen: false,
    drop: {},
}

const SET_OPEN = "SET_OPEN";

export const OpenReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_OPEN:
            return {
                isOpen: !state.isOpen,
                drop: action.payload.drop,
            }
        default:
            return state
    }
}

export const setOpen = (payload) => ({type: SET_OPEN, payload})