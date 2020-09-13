import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false,
  error: null
};

const postsInit = (state, action) => {
  return {
    ...state,
    loading: true
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
    loading: false,
    error: null
  };
};
const createPostErr = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
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
    default:
      return state;
  }
};

export default reducer;
