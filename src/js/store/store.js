import { configureStore } from "@reduxjs/toolkit";

import apiCall from "../rtk/api";
import counterReducer from './slice/counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiCall.reducerPath]: apiCall.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiCall.middleware)
});