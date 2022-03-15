import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

const bannerImages = (res) => {
  return {
    type: ActionTypes.GET_BANNER_IMAGES,
    payload: res,
  };
};

export const getBannerImages = (history) => {
  return (dispatch) => {
    server
      .get("v1/api/product/active")
      .then((response) => {
        // console.log("response----", response);
        if (response.data.success) {
          dispatch(bannerImages(response.data.data.products));
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
