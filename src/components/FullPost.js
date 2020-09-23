import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

// Make delete method only visible by authenticated users and can only be deleted by users who made the post

const FullPost = props => {
  const [ post, setPost ] = useState([]);
  const [ deleted, setDeleted ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const url = `https://reactblog-82995.firebaseio.com/posts/${props.match.params
    .user}/${props.match.params.id}.json`;
  useEffect(
    () => {
      axios.get(url).then(res => {
        setLoading(false);
        setPost(res.data);
      });
      console.log('inside');
      return () => {
        setDeleted(false);
      };
    },
    [ url ]
  );

  // send this to the store to redirect and show error handling message on the alert
  const deletePostHandler = () => {
    axios
      .delete(`${url}?auth=${props.token}`)
      .then(res => setDeleted(true))
      .catch(err => {
        props.onError(err.response.data.error);
        setDeleted(true);
      });
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  let fullPost = (
    <div className="container">
      <h1 className="text-center">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );

  if (loading) {
    fullPost = <Spinner />;
  }

  let redirect = null;
  if (deleted) {
    redirect = <Redirect to="/posts" />;
  }
  let deleteButton = props.isAuthenticated ? (
    <button className="btn btn-outline-danger" onClick={deletePostHandler}>
      DELETE
    </button>
  ) : null;

  return (
    <React.Fragment>
      {redirect}
      <main className="container mt-3">
        <div className="row justify-content-between">
          <button className="btn btn-outline-primary" onClick={goBackHandler}>
            Go back
          </button>
          {deleteButton}
        </div>
        {fullPost}
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: err => dispatch(actions.deletePostsErr(err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
