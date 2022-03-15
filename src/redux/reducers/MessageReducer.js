import { ActionTypes } from "../constants/Types";
const initialState = {
    isUpdateProfileError: false,
    isUpdateProfileSuccess: false,
    errorUpdateProfileMessage: null,
    successUpdateProfileMessage: null,
    isPasswordUpdateError: false,
    isPasswordUpdateSuccess: false,
    errorPasswordUpdateMessage: null,
    successPasswordUpdateMessage: null,
    isLoginError: false,
    errorLoginMessage: null,
    isRegisterError: false,
    errorRegisterMessage: null,
    isRegisterSuccess: false,
    successRegisterMessage: null,
    isForgotError: false,
    errorForgotMessage: null,
    isForgotSuccess: false,
    successForgotMessage: null,
    isResetPassError: false,
    errorResetPassMessage: null,
    isResetPassSuccess: false,
    successResetPassMessage: null,
   
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ERROR_MESSAGE:
            return { ...state, isUpdateProfileError: true, errorUpdateProfileMessage: action.payload }
        case ActionTypes.SUCCESS_MESSAGE:
            return { ...state, isUpdateProfileSuccess: true, successUpdateProfileMessage: action.payload }
        case ActionTypes.PASSWORD_ERROR_MESSAGE:
            return { ...state, isPasswordUpdateError: true, errorPasswordUpdateMessage: action.payload }
        case ActionTypes.PASSWORD_SUCCESS_MESSAGE:
            return { ...state, isPasswordUpdateSuccess: true, successPasswordUpdateMessage: action.payload }
        case ActionTypes.LOGIN_ERROR_MESSAGE:
            return { ...state, isLoginError: true, errorLoginMessage: action.payload }
        case ActionTypes.REGISTER_ERROR_MESSAGE:
            return { ...state, isRegisterError: true, errorRegisterMessage: action.payload }
        case ActionTypes.REGISTER_SUCCESS_MESSAGE:
            return { ...state, isRegisterSuccess: true, successRegisterMessage: action.payload }
        case ActionTypes.FORGOT_ERROR_MESSAGE:
            return { ...state, isForgotError: true, errorForgotMessage: action.payload }
        case ActionTypes.FORGOT_SUCCESS_MESSAGE:
            return { ...state, isForgotSuccess: true, successForgotMessage: action.payload }
        case ActionTypes.RESET_PASSWORD_ERROR_MESSAGE:
            return { ...state, isResetPassError: true, errorResetPassMessage: action.payload }
        case ActionTypes.RESET_PASSWORD_SUCCESS_MESSAGE:
            return { ...state, isResetPassSuccess: true, successResetPassMessage: action.payload }
      
        case ActionTypes.LOAD_INTIAL_STATE:
            return initialState
        default:
            return state;
    }
}