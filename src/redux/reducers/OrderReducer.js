import { ActionTypes } from "../constants/Types";
const initialState = {
  getOrdersData: [],
};

export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ORDERS:
      return { ...state, getOrdersData: action.payload };
    default:
      return state;
  }
};
