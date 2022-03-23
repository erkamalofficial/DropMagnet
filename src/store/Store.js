import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CategoryReducer from "./reducers/CategoryReducer";
import {DropApi} from './api/DropApi';
import AuthReducer from "./reducers/AuthReducer";
import thunk from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


export const Store = configureStore({
    reducer: {
        auth: AuthReducer,
        category: CategoryReducer,
        [DropApi.reducerPath]: DropApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(DropApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(Store.dispatch)