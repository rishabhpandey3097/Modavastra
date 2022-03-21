import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const saleProducts = (res) => {
  return {
    type: ActionTypes.GET_SALE_PRODUCTS,
    payload: res,
  };
};

export const getProductsOnSale = (history) => {
  return (dispatch) => {
    server
      .get("v1/api/sale/allActive")
      .then((response) => {
        // console.log("sales products----", response);
        if (response.data.success) {
          dispatch(saleProducts(response.data.data));
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
      });
  };
};

const singleSaleItem = (res) => {
  return {
    type: ActionTypes.GET_SINGLE_SALE_ITEM,
    payload: res,
  };
};

export const getSingleSaleItem = (id) => {
  return (dispatch) => {
    server
      .get(`v1/api/sale/getByItemId/${id}`)
      .then((response) => {
        // console.log("sales products----", response);
        if (response.data.success) {
          dispatch(singleSaleItem(response.data.data));
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
      });
  };
};
