import Cookies from "js-cookie";
import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const getProductCategory = (res) => {
  return {
    type: ActionTypes.GET_PRODUCT_CATEGORY,
    payload: res,
  };
};

export const getProductCategoryData = (history) => {
  return (dispatch) => {
    server
      .get("v1/api/product/all")
      .then((response) => {
        if (response.data.success) {
          const productTypes = response.data.data.products
            .filter((p_type) => p_type.active)
            .sort((a, b) => a.priority - b.priority);

          dispatch(getProductCategory(productTypes));
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        Cookies.get("isGuest") != undefined && errorMessage(message);
        // dispatch(userLogout(history));
      });
  };
};

export const getSearchProductCategoryData = (search, history) => {
  return (dispatch) => {
    server
      .get(`/v1/api/search/byProductName/${search}`)
      .then((response) => {
        if (response.data.success) {
          const productTypes = response.data.data
            .filter((p_type) => p_type.active)
            .sort((a, b) => a.priority - b.priority);

          dispatch(getProductCategory(productTypes));
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
