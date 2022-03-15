import { ActionTypes } from "../constants/Types";
import { useStore } from "react-redux";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";

const getBagList = (res) => {
  return {
    type: ActionTypes.GET_BAG_ITEMS,
    payload: res,
  };
};

export const getBagListData = () => {
  return (dispatch) => {
    server
      .get(`v1/api/cart`)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBagList(response.data.data));
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

export const addItemToShoppingBag = (data) => {
  return (dispatch) => {
    server
      .post(`v1/api/cart/add/item`, data)
      .then((response) => {
        console.log("response----", response);
        if (response.data.success) {
          successMessage(response.data.message);
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

export const removeItemFromBag = (id) => {
  return (dispatch) => {
    server
      .post(`v1/api/cart/remove/item/${id}`)
      .then((response) => {
        console.log("response----", response);
        if (response.data.success) {
          successMessage(response.data.message);
        }
        dispatch(getBagListData());
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

// export const addItemToShoppingBag = (item, quantity) => {
//   return (dispatch) => {
//     server.post(`v1/api/add/item`, {itemId: item.id, size})
//   };
// };

export const addToWishList = (id) => {
  return (dispatch) => {
    server
      .post(`v1/api/wishlist/add/item/${id}`)
      .then((response) => {
        console.log("response----", response);
        if (response.data.success) {
          successMessage("Added to wishList successfully.");
          dispatch(removeItemFromBag(id));
        }
        dispatch(getBagListData());
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

export const proceedToCheckout = (data, history) => {
  return (dispatch) => {
    server
      .post(`v1/api/order`)
      .then((response) => {
        if (response.data.success) {
          console.log("response.data", response.data);
          data["orderId"] = response.data.data.orderId;
          history.push({
            pathname: "/checkout",
            state: data,
          });
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

export const proceedToPay = (data, history, addressId) => {
  return (dispatch) => {
    server
      .post(`/v1/api/order/${data.orderId}/address/${addressId}`)
      .then((response) => {
        if (response.data.success) {
          history.push({
            pathname: "/payment",
            state: data,
          });
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
