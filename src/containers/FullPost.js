import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const FullPost = ({ onLoad, ...props }) => {
  const [ post, setPost ] = useState([]);
  const [ deleted, setDeleted ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const url = `https://reactblog-82995.firebaseio.com/posts/${props.location
    .state.userId}/${props.match.params.id}.json`;
  const userUrl = props.location.state.userId;
  useEffect(
    () => {
      axios.get(url).then(res => {
        setLoading(false);
        setPost({ ...res.data, date: res.data.date.split(',')[0] });
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
      <h1 className="text-center" style={{ fontSize: '7em' }}>
        {post.title}
      </h1>
      <h6 className="card-subtitle text-muted" style={{ fontSize: '1.75em' }}>
        {post.date}
      </h6>
      <p style={{ fontSize: '1.5em' }}>{post.body}</p>
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
          <Link
            to={{
              pathname: `/posts/${props.match.params.id}/edit`,
              state: { userId: props.location.state.userId }
            }}
          >
            <button style={{ color: 'white' }} className="btn btn-warning">
              EDIT
            </button>
          </Link>
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
