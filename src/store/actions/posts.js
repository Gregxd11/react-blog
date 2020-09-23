import * as actionTypes from './actionTypes';
import axios from 'axios';

export const createPost = data => {
  return {
    type: actionTypes.CREATE_POST,
    data
  };
};

export const createPostErr = error => {
  return { type: actionTypes.CREATE_POST_ERR, error };
};

export const newPost = (post, token) => {
  return (dispatch, getState) => {
    const getDate = () => {
      return new Date().toLocaleString();
    };
    const { userId } = getState().auth;
    axios
      .post(
        `https://reactblog-82995.firebaseio.com/posts/${userId}.json?auth=${token}`,
        {
          ...post,
          date: getDate(),
          userId
        }
      )
      .then(res => {
        dispatch(createPost(res.data));
      })
      .catch(err => {
        dispatch(createPostErr(err.response.data.error));
      });
  };
};

export const fetchPostsInit = () => {
  return { type: actionTypes.FETCH_POSTS_INIT };
};

export const fetchPostsSuccess = posts => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts
  };
};

export const fetchPostsFail = error => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED,
    error
  };
};

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsInit());
    axios
      .get('https://reactblog-82995.firebaseio.com/posts.json')
      .then(res => {
        const fetched = [];
        // res returns an object with all users, therefore a nested loop is necessary
        for (let user in res.data) {
          for (let key in res.data[user]) {
            fetched.push({ user, id: key, ...res.data[user][key] });
          }
        }
        dispatch(fetchPostsSuccess(fetched));
      })
      .catch(err => {
        dispatch(fetchPostsFail(err));
      });
  };
};

export const deletePostsErr = error => {
  return {
    type: actionTypes.DELETE_POST_ERR,
    error
  };
};
