import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const getSubProduct = (res) => {
  return {
    type: ActionTypes.GET_SUB_PRODUCT,
    payload: res,
  };
};

export const getSubProductData = (
  slug,
  subSlug,
  sortByDate,
  sortByPrice,
  history
) => {
  return (dispatch) => {
    server
      .get(`v1/api/items/product/${slug}/subproduct/${subSlug}`)
      .then((response) => {
        console.log("DYOO Products", response);
        if (response.data.success) {
          const productList = response.data.data.items.filter(
            (item) => item.active
          );
          // if (sortByDate) {
          //   productList.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
          // } else if (sortByPrice) {
          //   productList.sort((a, b) => a.price - b.price);
          // }

          dispatch(getSubProduct(productList));
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

export const getSearchSubProductData = (
  search,
  sortByDate,
  sortByPrice,
  history
) => {
  return (dispatch) => {
    server
      .get(`/v1/api/search/byItemName/${search}`)
      .then((response) => {
        if (response.data.success) {
          const productList = response.data.data.filter((item) => item.active);
          if (sortByDate) {
            productList.sort(
              (a, b) => new Date(a.createdOn) - new Date(b.createdOn)
            );
          } else if (sortByPrice) {
            productList.sort((a, b) => a.price - b.price);
          }
          dispatch(getSubProduct(productList));
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
