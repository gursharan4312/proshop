import axios from "axios";
import { USER_LOGIN_REQUEST } from "../constants/userConstants";

export const login = ((email, password) = async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_REQUEST,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.messgae
          ? err.response.data.messgae
          : err.messgae,
    });
  }
});
