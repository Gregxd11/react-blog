import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

// Make delete method only visible by authenticated users

const FullPost = ({ onLoad, ...props }) => {
  const [ post, setPost ] = useState([]);
  const [ deleted, setDeleted ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const url = `https://reactblog-82995.firebaseio.com/posts/${props.match.params
    .user}/${props.match.params.id}.json`;
  const userUrl = props.match.params.user;
  useEffect(
    () => {
      axios.get(url).then(res => {
        setLoading(false);
        setPost(res.data);
      });
      onLoad(userUrl);
      return () => {
        setDeleted(false);
      };
    },
    [ url, onLoad, userUrl ]
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
  let deleteButton = props.isOwner ? (
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
    isOwner: state.auth.userId === state.posts.userUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: err => dispatch(actions.deletePostsErr(err)),
    onLoad: url => dispatch(actions.showPost(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
