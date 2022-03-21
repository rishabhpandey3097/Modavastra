import { ActionTypes } from "../constants/Types";
const initialState = {
  saleProducts: [],
  singleSaleProduct: {},
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SALE_PRODUCTS:
      return { ...state, saleProducts: action.payload };
    case ActionTypes.GET_SINGLE_SALE_ITEM:
      return { ...state, singleSaleProduct: action.payload };
    default:
      return state;
  }
};
