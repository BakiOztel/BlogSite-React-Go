import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null },
    reducers: {
        setCredentials: (state, { payload }) => {
            state.user = payload;
        },
        logOut: (state, action) => {
            state.user = null;
        }
    }
});


export const { setCredentials, logOut } = authSlice.actions;


export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;