import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  submitted: false,
  userUrl: null
};

const postsInit = (state, action) => {
  return {
    ...state,
    loading: true,
    submitted: false
  };
};

const postsSuccess = (state, action) => {
  return {
    ...state,
    posts: action.posts,
    loading: false
  };
};

const postsFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const createPost = (state, action) => {
  return {
    ...state,
    submitted: true
  };
};
const createPostErr = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
    submitted: true
  };
};

const deletePostsErr = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const showPost = (state, action) => {
  return {
    ...state,
    userUrl: action.url
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_INIT:
      return postsInit(state, action);
    case actionTypes.FETCH_POSTS_SUCCESS:
      return postsSuccess(state, action);
    case actionTypes.FETCH_POSTS_FAILED:
      return postsFailed(state, action);
    case actionTypes.CREATE_POST:
      return createPost(state, action);
    case actionTypes.CREATE_POST_ERR:
      return createPostErr(state, action);
    case actionTypes.DELETE_POST_ERR:
      return deletePostsErr(state, action);
    case actionTypes.SHOW_POST:
      return showPost(state, action);
    default:
      return state;
  }
};

export default reducer;
