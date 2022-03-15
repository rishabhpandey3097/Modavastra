import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const getSubProductCategory = (res) => {
  return {
    type: ActionTypes.GET_SUB_PRODUCT_CATEGORY,
    payload: res,
  };
};

export const getSubProductCategoryData = (slug) => {
  return (dispatch) => {
    server
      .get(`v1/api/subproduct/${slug}`)
      .then((response) => {
        if (response.data.success) {
          const subCategory = response.data.data.list.filter(
            (category) => category.active
          );
          dispatch(getSubProductCategory(subCategory));
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

export const getSearchSubProductCategoryData = (slug, history) => {
  return (dispatch) => {
    server
      .get(`/v1/api/search/bySubProduct/${slug}`)
      .then((response) => {
        if (response.data.success) {
          const subCategory = response.data.data.filter(
            (category) => category.active
          );
          dispatch(getSubProductCategory(subCategory));
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
