import * as actionTypes from './actionTypes';
import axios from 'axios';

// refactor signupStart and Login so the code follows DRY standards

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
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userId', res.data.localId);
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

export const loginSuccess = data => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data
  };
};

export const loginError = error => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error
  };
};

export const login = (email, password) => {
  return dispatch => {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process
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
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userId', res.data.localId);
        dispatch(loginSuccess(data));
      })
      .catch(err => {
        dispatch(loginError(err.response.data.error));
      });
  };
};

export const checkAuth = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    let expirationDate = localStorage.getItem('expirationDate');
    if (!token) {
      return console.log('no token'); // change this to actually do something
    }
    else if (expirationDate <= new Date().getTime) {
      const refreshToken = localStorage.getItem('refreshToken');
      axios
        .post(
          `https://securetoken.googleapis.com/v1/token?key=${process.env
            .REACT_APP_FIREBASE_KEY}`,
          {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          }
        )
        .then(res => {
          expirationDate = new Date(
            new Date().getTime() + res.data.expires_in * 1000
          );
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('refreshToken', res.data.refresh_token);
          localStorage.setItem('token', res.data.id_token);
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      const data = {
        token,
        userId: localStorage.getItem('userId'),
        refreshToken: localStorage.getItem('refreshToken')
      };
      dispatch(loginSuccess(data));
    }
  };
};
