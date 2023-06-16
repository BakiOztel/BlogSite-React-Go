import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (Headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            Headers.set("authorization", `${token}`);
        }
        return Headers;
    }
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({})
});