import { ActionTypes } from "../constants/Types";
import { useStore } from "react-redux";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const getWishList = (res) => {
  return {
    type: ActionTypes.GET_WISH_ITEMS,
    payload: res,
  };
};

export const getWishListData = (history) => {
  return (dispatch) => {
    server
      .get(`v1/api/wishlist`)
      .then((response) => {
        if (response.data.success) {
          dispatch(getWishList(response.data.data.items));
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

export const removeItemFromWishList = (id, history) => {
  return (dispatch) => {
    server
      .post(`v1/api/wishlist/remove/item/${id}`)
      .then((response) => {
        console.log("response----", response);
        if (response.data.success) {
          successMessage(response.data.message);
        }
        dispatch(getWishListData());
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

export const addToBag = (item, quantity) => {
  return (dispatch) => {
    server
      .post(`v1/api/cart/add/item`, {
        itemId: item.id,
        quantity: quantity,
      })
      .then((response) => {
        if (response.data.success) {
          successMessage("Added to cart successfully.");
          dispatch(removeItemFromWishList(item.id));
        }
        dispatch(getWishListData());
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
