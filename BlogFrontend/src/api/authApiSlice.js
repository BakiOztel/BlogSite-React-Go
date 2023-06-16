import { apiSlice } from "./apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/loginuser",
                method: "POST",
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: "/cruser",
                method: "POST",
                body: { ...credentials }
            })
        }),
        isLogin: builder.mutation({
            query: credentials => ({
                url: "/islogin",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
});

export const { useLoginMutation, useIsLoginMutation, useRegisterMutation } = authApiSlice;