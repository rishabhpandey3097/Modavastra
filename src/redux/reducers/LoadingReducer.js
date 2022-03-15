import { ActionTypes } from "../constants/Types";
const initialState = {
    isRegisterLoading: false,
    isForgotLoading: false,
    isResetPassLoading: false
};

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.START_REGISTER_LOADING:
            return { ...state, isRegisterLoading: true }
        case ActionTypes.START_FORGOT_LOADING:
            return { ...state, isForgotLoading: true }
        case ActionTypes.START_RESET_PASSWORD_LOADING:
            return { ...state, isResetPassLoading: true }
        case ActionTypes.START_RESET_PASSWORD_LOADING:
            return { ...state, isResetPassLoading: true }
        case ActionTypes.STOP_LOADING:
            return initialState
        default:
            return state;
    }
}