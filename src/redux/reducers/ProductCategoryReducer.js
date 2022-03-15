import {ActionTypes} from "../constants/Types";
const initialState = {
    getCategories: []
}

export const productCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_PRODUCT_CATEGORY:
            return {...state, getCategories: action.payload}
        default:
            return state;
    }
}