import { userActionTypes } from "./UserActionTypes";
const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.EMAIL_SIGN_IN_START:
    case userActionTypes.SIGN_UP_START:
      return {
        ...state,
        loading: true
      }
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: null
      }
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: null
      }
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
};
export default UserReducer