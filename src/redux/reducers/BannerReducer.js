import { ActionTypes } from "../constants/Types";
const initialState = {
  bannerImages: [],
};

export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BANNER_IMAGES:
      return { ...state, bannerImages: action.payload };
    default:
      return state;
  }
};
