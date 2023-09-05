import { loginFail, loginReq, loginSuccess } from "../features/loginSlice";
import axiosConfig from "../config/axios";
import {
  registerFail,
  registerReq,
  registerSuccess,
} from "../features/registerSlice";
// import {
//   messageFail,
//   messageReq,
//   messageSuccess,
// } from "../features/messageSlice";

export const register = (email, password, name) => async (dispatch) => {
  try {
    console.log("action : ", email);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(registerReq());

    const { data } = await axiosConfig.post(
      `/register`,
      {
        name,
        email,
        password,
      },
      config
    );
    dispatch(registerSuccess(data));
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(registerFail(errorIs));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    console.log("action : ", email, password);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(loginReq());

    const { data } = await axiosConfig.post(
      `/login`,
      {
        email,
        password,
      },
      config
    );
    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(loginFail(errorIs));
  }
};
