import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  deleted: false,
  error: null,
};

const deleteVehicleSlice = createSlice({
  name: "deleteVehicle",
  initialState,
  reducers: {
    deleteVehicleReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteVehicleSuccess: (state) => {
      state.loading = false;
      state.deleted = true;
      state.error = null;
    },
    deleteVehicleFail: (state, action) => {
      state.loading = false;
      state.deleted = false;
      state.error = action.payload;
    },
    resetDeleteVehicle: (state) => {
      state.deleted = false;
    },
  },
});

export const {
  deleteVehicleReq,
  deleteVehicleSuccess,
  deleteVehicleFail,
  resetDeleteVehicle,
} = deleteVehicleSlice.actions;

export default deleteVehicleSlice.reducer;
