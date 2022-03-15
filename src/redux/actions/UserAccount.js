import axios from "axios";
import store from "store";
import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import {
  startRegisterLoading,
  stopLoading,
  startForgotLoading,
  startResetPassLoading,
} from "./LoadingAction";
import Cookies from "js-cookie";
import { getProductCategoryData } from "./ProductCategoryAction";

// Login
const loginRequest = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  };
};

const loginSuccess = (user) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user,
  };
};

const userDetails = (user) => {
  return {
    type: ActionTypes.USER_DETAILS_DATA,
    payload: user,
  };
};

// Logout
const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

const loginError = (user) => {
  return {
    type: ActionTypes.LOGIN_ERROR,
    payload: user,
  };
};

const getAddresses = (address) => {
  return {
    type: ActionTypes.USER_ADDRESSES,
    payload: address,
  };
};

const createAddressSuccess = (address) => {
  return {
    type: ActionTypes.ADDRESS_CREATED_SUCCESS,
    payload: address,
  };
};

export const createAddressEmpty = () => {
  return {
    type: ActionTypes.ADDRESS_CREATED_EMPTY,
    payload: null,
  };
};

export const userLogin = (data, history, isGuest) => {
  return (dispatch) => {
    dispatch(loginRequest());

    axios
      .post(`https://modavastraa.com/auth/login`, { ...data })
      .then((response) => {
        console.log(response);
        if (response.data.token_type === "bearer") {
          dispatch(loginSuccess(response.data));
          store.set("token", "Bearer " + response.data.access_token);
          store.set("refresh_token", response.data.refresh_token);
          Cookies.set("valid", true, { expires: 0.5 });
          Cookies.set("isGuest", isGuest);
          history.push("/");
          dispatch(getProductCategoryData(history));
        } else {
          dispatch(loginError(response.data.message));
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        dispatch(loginError(message));
        errorMessage(message);
      });
  };
};

export const userLogout = (history, isLogout = false) => {
  const isGuest = Cookies.get("isGuest");

  return (dispatch) => {
    if (isLogout) {
      dispatch(logoutSuccess());
      store.remove("token");
      store.remove("firstName");
      store.remove("lastName");
      store.remove("gender");
      store.remove("passwordUpdatedAt");
      history.push("/login");
    } else if (isGuest != false) {
      dispatch(
        userLogin(
          {
            username: "gust@gust.com",
            password: "password",
            grant_type: "password",
          },
          history,
          true
        )
      );
    } else {
      dispatch(logoutSuccess());
      store.remove("token");
      store.remove("firstName");
      store.remove("lastName");
      store.remove("gender");
      store.remove("passwordUpdatedAt");
      history.push("/login");
    }
  };
};

// Register User
export const userRegister = (data, history) => {
  return (dispatch) => {
    axios
      .post(`https://modavastraa.com/v1/api/user/create`, { ...data })
      .then((response) => {
        if (response.data.success === true) {
          dispatch(stopLoading());
          successMessage(response.data.message);
          setTimeout(() => {
            history.push("/login");
          }, 5000);
        } else {
          dispatch(stopLoading());
          errorMessage(response.data.error.message);
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error?.response?.message;
        }
        dispatch(stopLoading());
        errorMessage(message);
      });
  };
};

export const refreshToken = (data, history) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post(
        `https://modavastraa.com/oauth/token`,
        { ...data },
        {
          headers: {
            Authorization: "Basic YWJoOnNlY3JldA==",
          },
        }
      )
      .then((response) => {
        if (response.data.token_type === "bearer") {
          dispatch(loginSuccess(response.data));
          store.set("token", "Bearer " + response.data.access_token);
          store.set("token", "Bearer" + response.data.access_token);
          store.set("refresh_token", response.data.refresh_token);
          Cookies.set("valid", true, { expires: 0.5 });
          history.push("/");
        } else {
          dispatch(loginError(response.data.message));
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        dispatch(loginError(message));
      });
  };
};

export const getUserDetails = (history) => {
  return (dispatch) => {
    server
      .get(`/v1/api/user/getUserDeatil`)
      .then((response) => {
        if (response.data.success) {
          dispatch(userDetails(response.data.data));
        } else {
          errorMessage(response.data.message);
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
        // dispatch(userLogout(history));
      });
  };
};

export const updateName = (name) => {
  return (dispatch) => {
    server
      .post(`/v1/api/user/updateName/${name}`)
      .then((response) => {
        if (response.data.success) {
          successMessage("Name successfully updated");
        } else {
          errorMessage(response.data.message);
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
      });
  };
};

export const getAddressDetails = (history) => {
  return (dispatch) => {
    server
      .get(`/v1/api/address/all`)
      .then((response) => {
        if (response.data.success) {
          dispatch(getAddresses(response.data.data));
        } else {
          errorMessage(response.data.message);
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
        // dispatch(userLogout(history));
      });
  };
};

export const createAddress = (data, reset) => {
  return (dispatch) => {
    const editAddress = "/v1/api/address/edit";
    const createAddress = "/v1/api/address/create";
    const url = data.addressId ? editAddress : createAddress;
    server
      .post(url, { ...data })
      .then((response) => {
        if (response.data.success) {
          dispatch(createAddressSuccess(response.data.data));
          dispatch(getAddressDetails());
          successMessage(response.data.message);
          reset && reset();
        } else {
          errorMessage(response.data.message);
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
      });
  };
};

export const changePasswordApi = (data, history) => {
  return (dispatch) => {
    const url = `v1/api/user/changePassword`;
    server
      .post(url, data)
      .then((response) => {
        if (response.data.success) {
          successMessage(response.data.message);
          history.push("/myaccount");
        } else {
          errorMessage(response?.data?.error?.message);
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
        // dispatch(userLogout(history));
      });
  };
};
