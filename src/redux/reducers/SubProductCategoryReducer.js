import {ActionTypes} from "../constants/Types";
const initialState = {
    getSubCategories: []
}

export const subProductCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_SUB_PRODUCT_CATEGORY:
            return {...state, getSubCategories: action.payload}
        default:
            return state;
    }
}