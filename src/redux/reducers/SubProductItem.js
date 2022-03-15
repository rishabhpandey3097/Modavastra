import { ActionTypes } from "../constants/Types";
const initialState = {
  getSubProductsData: [],
};

export const subProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SUB_PRODUCT:
      return { ...state, getSubProductsData: action.payload };
    default:
      return state;
  }
};
