import { ActionTypes } from "../constants/Types";

const initialState = {
  similarProducts: [],
};

export const similarProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SIMILAR_PRODUCTS:
      return {
        ...state,
        similarProducts: action.payload,
      };
    default:
      return state;
  }
};
