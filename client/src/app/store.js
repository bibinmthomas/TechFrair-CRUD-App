import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import fetchVehiclesReducer from "../features/fetchVehicles";
import addVehicleReducer from "../features/addVehicle";
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    addVehicle: addVehicleReducer,
    fetchVehicles: fetchVehiclesReducer,
  },
});

export default store;
