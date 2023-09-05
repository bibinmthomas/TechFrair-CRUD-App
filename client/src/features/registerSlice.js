import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerReq: (state, action) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default registerSlice.reducer;

export const { registerReq, registerSuccess, registerFail } =
  registerSlice.actions;
