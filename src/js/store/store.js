import { configureStore } from "@reduxjs/toolkit";

import apiCall from "../rtk/api";
import counterReducer from './slice/counterSlice';
import deleteDialogReducer from './slice/deleteDialogSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        deleteDialogData: deleteDialogReducer,
        [apiCall.reducerPath]: apiCall.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiCall.middleware)
});