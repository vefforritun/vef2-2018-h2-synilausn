import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: JSON.parse(localStorage.getItem('user') || '{}'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: null,
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        username: action.name,
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.message,
      }
    case UPDATE_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
      }
    default:
      return state;
  }
};
