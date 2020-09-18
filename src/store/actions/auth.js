import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupStart = (email, password) => {
  return dispatch => {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process
          .env.REACT_APP_FIREBASE_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .then(res => {
        const data = {
          token: res.data.idToken,
          refreshToken: res.data.refreshToken,
          userId: res.data.localId
        };
        dispatch(signupSuccess(data));
      })
      .catch(err => {
        dispatch(signupError(err.response.data.error));
      });
  };
};

export const signupSuccess = data => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    data
  };
};

export const signupError = error => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    error
  };
};
