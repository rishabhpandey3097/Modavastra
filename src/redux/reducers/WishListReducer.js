import { ActionTypes } from "../constants/Types";
const initialState = {
  getWishListData: [],
  itemRemove:false
};

export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_WISH_ITEMS:
      return { ...state, getWishListData: action.payload };
    case ActionTypes.REMOVE_FROM_WISHLIST:
      return {...state,itemRemove:true}
    default:
      return state;
  }
};
