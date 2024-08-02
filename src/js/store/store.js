import { configureStore } from "@reduxjs/toolkit";

import { employeeApi } from "../rtk/employee";
import counterReducer from './slice/counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [employeeApi.reducerPath]: employeeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeApi.middleware)
});