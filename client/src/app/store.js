import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});

export default store;
