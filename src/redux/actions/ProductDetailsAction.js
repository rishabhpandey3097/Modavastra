import { ActionTypes } from "../constants/Types";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";
import { userLogout } from "./UserAccount";

export const clearProductDetails = () => {
  return {
    type: ActionTypes.CLEAR_PRODUCT_DETAILS,
  };
};

const getProductDetails = (res) => {
  return {
    type: ActionTypes.GET_PRODUCT_DETAILS,
    payload: res,
  };
};
export const getProductDetailsData = (id, history) => {
  return (dispatch) => {
    server
      .get(`v1/api/items/${id}`)
      .then((response) => {
        if (response.data.success) {
          dispatch(getProductDetails(response.data.data.itemDetails));
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

const getProductReviews = (res) => {
  return {
    type: ActionTypes.GET_PRODUCT_REVIEWS,
    payload: res,
  };
};
export const getProductReviewsData = (id, history) => {
  return (dispatch) => {
    server
      .get(`v1/api/items/${id}/reviews`)
      .then((response) => {
        if (response.data.success) {
          dispatch(getProductReviews(response.data.data));
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

const getProductSuggestions = (res) => {
  return {
    type: ActionTypes.GET_PRODUCT_SUGGESTIONS,
    payload: res,
  };
};

export const getProductSuggestionsData = (minPrice, maxPrice) => {
  return (dispatch) => {
    server
      .get(`v1/api/search/byItemPrice/${maxPrice}/${minPrice}`)
      .then((response) => {
        // console.log("Product Suggestions--------", response);
        if (response.data.success) {
          dispatch(getProductSuggestions(response.data.data));
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

const getProductSizes = (res) => {
  return {
    type: ActionTypes.GET_PRODUCT_SIZES,
    payload: res,
  };
};

export const getProductSizesData = (id, history) => {
  return (dispatch) => {
    server
      .get(`/v1/api/items/CustomSize/${id}`)
      .then((response) => {
        if (response.data.success) {
          dispatch(getProductSizes(response.data.data));
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

const getProductCustomization = (res) => {
  return {
    type: ActionTypes.GET_PRODUCT_CUSTOMIZATION,
    payload: res,
  };
};

export const getProductCustomizationData = (id, history) => {
  return (dispatch) => {
    server
      .get(`v1/api/items/CustomViewData/${id}`)
      .then((response) => {
        if (response.data.success) {
          // response.data.data.forEach((custom) => {
          //   custom.customViewIds.forEach((customId) => {
          //     dispatch(getCustomView(customId));
          //   });
          // });
          dispatch(getProductCustomization(response.data.data));
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

const getProductCustomView = (res) => {
  return {
    type: ActionTypes.GET_PRODUCT_CUSTOM_VIEW,
    payload: res,
  };
};

export const getCustomView = (id) => {
  return (dispatch) => {
    server
      .get(`/v1/api/items/getAllCustomData/${id}`)
      .then((response) => {
        if (
          response.data.success &&
          response.data.data.customItemViews.length > 0
        ) {
          // console.log(
          //   "customView Response---------",
          //   response.data.data.customItemViews
          // );
          let customItems = response.data.data.customItemViews;
          dispatch(getProductCustomView(customItems));
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

const availablePincodes = (res) => {
  return {
    type: ActionTypes.GET_AVAILABLE_PINCODES,
    payload: res,
  };
};

export const getAvailablePincodes = (id) => {
  return (dispatch) => {
    server
      .get(`v1/api/pincode/getByItemId/${id}`)
      .then((response) => {
        console.log("pincodes------", response.data.success);
        if (response.data.success && response.data.data !== null) {
          dispatch(availablePincodes(response.data.data.pincodes));
        } else {
          dispatch(availablePincodes([]));
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        // errorMessage(message);
      });
  };
};
