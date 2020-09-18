import * as actionTypes from '../actions/actionTypes';

const initalState = {
  token: '',
  userId: '',
  errorMessage: ''
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

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAILED:
      return signupFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
