import { ActionTypes } from "../constants/Types";
const initialState = {
  bagData: [],
};

export const BagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BAG_ITEMS:
      return { ...state, bagData: action.payload };
    default:
      return state;
  }
};
