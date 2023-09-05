import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    addVehicleReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    addVehicleSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    addVehicleFail: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { addVehicleReq, addVehicleSuccess, addVehicleFail } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;
