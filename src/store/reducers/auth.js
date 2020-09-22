import * as actionTypes from '../actions/actionTypes';

const initalState = {
  token: null,
  userId: null,
  errorMessage: null
};

const signupSuccess = (state, action) => {
  return {
    ...state,
    token: action.data.token,
    userId: action.data.userId
  };
};

const signupFailed = (state, action) => {
  return {
    ...state,
    errorMessage: action.error
  };
};

const loggedIn = (state, action) => {
  return {
    ...state,
    token: action.data.token,
    userId: action.data.userId
  };
};

const loggedInFailed = (state, action) => {
  return {
    ...state,
    errorMessage: action.error
  };
};

const logout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null
  };
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAILED:
      return signupFailed(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loggedIn(state, action);
    case actionTypes.LOGIN_FAILED:
      return loggedInFailed(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
