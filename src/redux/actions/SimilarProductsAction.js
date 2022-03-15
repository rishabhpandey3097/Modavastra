import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const getSimilarProducts = (res) => {
  return {
    type: ActionTypes.GET_SIMILAR_PRODUCTS,
    payload: res,
  };
};

export const getSimilarProductsData = () => {
  return (dispatch) => {
    server
      .get(`v1/api/search/byItemPrice/4000/3000`)
      .then((response) => {
        // console.log("response----", response);
        if (response.data.success && response.data.data.length > 0) {
          dispatch(getSimilarProducts(response.data.data));
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
