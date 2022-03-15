import store from "store";
import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const getOrders = (res) => {
  return {
    type: ActionTypes.GET_ORDERS,
    payload: res,
  };
};

export const getOrdersData = (history) => {
  return (dispatch) => {
    server
      .get(`v1/api/order`)
      .then((response) => {
        // console.log("response----", response);
        if (response.data.success) {
          dispatch(getOrders(response.data.data.orders));
        }
      })
      .catch((error) => {
        console.log("err---", error);
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
