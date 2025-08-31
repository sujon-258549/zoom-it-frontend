import { createSlice } from "@reduxjs/toolkit";
// import RootState from your store file (adjust the path as needed)
import type { RootState } from "../store";

type TInitialState = {
  user: null | object;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
export const userCurrentUser = (state: RootState) => state.auth.user;
export const userCurrentToken = (state: RootState) => state.auth.token;