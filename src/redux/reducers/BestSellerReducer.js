import { ActionTypes } from "../constants/Types";
const initialState = {
  bestSeller: [],
};

export const bestSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BEST_SELLER:
      return { ...state, bestSeller: action.payload };
    default:
      return state;
  }
};
