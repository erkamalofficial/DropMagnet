import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebase';


const initialState = {
    token: null,
    userId: null
}

// export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser',
//     async () => {
//         auth.onAuthStateChanged((user) => {
//             user.getIdToken().then(function (token) {
//                 console.log('fetchCurrentUser', { token, userId: user.uid })
//                 return { token, userId: user.uid }
//             });
//         });
//     }
// )

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getAuthTokenAndUserId: (state, action) => {
            return action.payload
        },
        removeAuthTokenAndUserId: (state, action) => {
            return {token: null, userId: null}
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
    //         console.log('fetchCurrentUser', action.payload)
    //         state = action.payload
    //     })
    // },
})

export const { getAuthTokenAndUserId, removeAuthTokenAndUserId } = authSlice.actions

export default authSlice.reducer