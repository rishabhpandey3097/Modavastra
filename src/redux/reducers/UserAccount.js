import { ActionTypes } from '../constants/Types'
const initialState = {
  loginSuccess: false,
  isLoading: false,
  errorMessage: '',
  id: '',
  token: null,
  deviceToken: null,
  email: '',
  user: {},
  addresses: [],
  addressCreate: null,
}

export const userAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ActionTypes.LOGIN_REQUEST:
    // return { ...state, isLoading: true }
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        loginSuccess: true,
        isLoading: false,
      }
    // case ActionTypes.LOGIN_ERROR:
    // return { ...state, errorMessage:action.payload.message, isLoading: false }
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state }
    case ActionTypes.USER_DETAILS_DATA:
      return { ...state, user: action.payload }
    case ActionTypes.USER_ADDRESSES:
      return { ...state, addresses: action.payload }
    case ActionTypes.ADDRESS_CREATED_SUCCESS:
      return {
        ...state,
        addressCreate: action.payload,
      }
    case ActionTypes.ADDRESS_CREATED_EMPTY:
      return {
        ...state,
        addressCreate: null,
      }
    default:
      return state
  }
}
