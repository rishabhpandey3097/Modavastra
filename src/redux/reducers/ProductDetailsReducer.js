import { ActionTypes } from "../constants/Types";
const initialState = {
  productDetails: {},
  productReviews: {
    reviews: [],
    rating: "",
  },
  productSuggestions: [],
  productSizes: [],
  productCustomization: [],
  productCustomView: [],
  pincodes: [],
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    case ActionTypes.GET_PRODUCT_REVIEWS:
      return { ...state, productReviews: action.payload };
    case ActionTypes.GET_PRODUCT_SUGGESTIONS:
      return { ...state, productSuggestions: action.payload };
    case ActionTypes.GET_PRODUCT_SIZES:
      return { ...state, productSizes: action.payload };
    case ActionTypes.GET_PRODUCT_CUSTOMIZATION:
      return { ...state, productCustomization: action.payload };
    case ActionTypes.GET_PRODUCT_CUSTOM_VIEW:
      return {
        ...state,
        productCustomView: action.payload,
      };
    case ActionTypes.GET_AVAILABLE_PINCODES:
      return {
        ...state,
        pincodes: [...action.payload],
      };
    case ActionTypes.CLEAR_PRODUCT_DETAILS:
      return { ...state, productDetails: {} };

    default:
      return state;
  }
};
