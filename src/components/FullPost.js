import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Spinner from './Spinner';
import { connect } from 'react-redux';

// Make delete method only visible by authenticated users and can only be deleted by users who made the post

const FullPost = props => {
  const [ post, setPost ] = useState([]);
  const [ deleted, setDeleted ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  useEffect(
    () => {
      axios
        .get(
          `https://reactblog-82995.firebaseio.com/posts/${props.match.params
            .id}.json`
        )
        .then(res => {
          setLoading(false);
          setPost(res.data);
        });
      return () => {
        setDeleted(false);
      };
    },
    [ props.match.params.id ]
  );

  // send this to the store to redirect and show error handling message on the alert
  const deletePostHandler = async () => {
    const res = await axios.delete(
      `https://reactblog-82995.firebaseio.com/posts/${props.match.params
        .id}.json?auth=${props.token}`
    );
    if (res) {
      setDeleted(true);
    }
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

  return (
    <React.Fragment>
      {redirect}
      <main className="container mt-3">
        <div className="row justify-content-between">
          <button className="btn btn-outline-primary" onClick={goBackHandler}>
            Go back
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={deletePostHandler}
          >
            DELETE
          </button>
        </div>
        {fullPost}
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(FullPost);
