import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const bestSellerAction = (res) => {
  return {
    type: ActionTypes.GET_BEST_SELLER,
    payload: res,
  };
};

export const getBestSellerProducts = (history) => {
  return (dispatch) => {
    server
      .get("v1/api/bestSeller/getAll")
      .then((response) => {
        console.log("bestSellerProducts----", response);
        if (response.data.success) {
          dispatch(bestSellerAction(response.data.data));
        }
      })
      .catch((error) => {
        // console.log("err---", error);
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
