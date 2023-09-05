import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  vehicles: [],
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    fetchVehiclesReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVehiclesSuccess: (state, action) => {
      state.loading = false;
      state.vehicles = action.payload;
      state.error = null;
    },
    fetchVehiclesFail: (state, action) => {
      state.loading = false;
      state.vehicles = [];
      state.error = action.payload;
    },
  },
});

export const { fetchVehiclesReq, fetchVehiclesSuccess, fetchVehiclesFail } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;
