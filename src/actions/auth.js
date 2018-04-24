
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function receiveLogin(user, token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    token,
    message: null,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  }
}

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';

function requestUpdate() {
  return {
    type: UPDATE_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  }
}

function updateError(message) {
  return {
    type: UPDATE_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    message,
  }
}

function receiveUpdate(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    const post = await api.post('/login', { username, password });

    if (post.status >= 400) {
      dispatch(loginError(post.result.error || 'Villa'))
    }

    if (post.status === 200) {
      const { token, user } = post.result;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(receiveLogin(user, token));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  }
}

export const updateUser = ({ name, password } = {}) => {
  return async (dispatch) => {
    dispatch(requestUpdate());

    const data = {}

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = password;
    }

    const patch = await api.patch('/users/me', data);

    if (patch.status >= 400) {
      dispatch(updateError(patch.result.error || 'Villa'))
    }

    if (patch.status === 200) {
      const { result } = patch;
      localStorage.setItem('user', JSON.stringify(result));
      dispatch(receiveUpdate(result));
    }
  }
}
