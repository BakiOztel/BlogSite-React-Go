import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice.js";
import authSlice from "./authSlice.js";

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});