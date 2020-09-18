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

export const newPost = post => {
  return dispatch => {
    const getDate = () => {
      return new Date().toLocaleString();
    };
    axios
      .post('https://reactblog-82995.firebaseio.com/posts.json', {
        ...post,
        date: getDate()
      })
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
        for (let key in res.data) {
          fetched.push({ id: key, ...res.data[key] });
        }
        dispatch(fetchPostsSuccess(fetched));
      })
      .catch(err => {
        dispatch(fetchPostsFail(err));
      });
  };
};
