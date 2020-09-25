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

  let url;
  let userUrl;

  //This handles error in case url is typed wrong, it prevents crashing the app...there's probably a much cleaner way to do this
  if (props.location.state === undefined) {
    url = '#';
    userUrl = undefined;
    props.history.push('/posts');
  }
  else {
    url = `https://reactblog-82995.firebaseio.com/posts/${props.location.state
      .userId}/${props.match.params.id}.json`;
    userUrl = props.location.state.userId;
  }

  useEffect(
    () => {
      axios
        .get(url)
        .then(res => {
          setLoading(false);
          setPost({ ...res.data, date: res.data.date.split(',')[0] });
        })
        .catch(err => console.log(err));
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

  let redirect = null;
  if (deleted) {
    redirect = <Redirect to="/posts" />;
  }

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

  let ownerButtons = props.isOwner ? (
    <React.Fragment>
      <Link
        to={{
          pathname: `/posts/${props.match.params.id}/edit`,
          state: { userId: userUrl }
        }}
      >
        <button className="btn btn-secondary">EDIT</button>
      </Link>
      <button className="btn btn-danger ml-3" onClick={deletePostHandler}>
        DELETE
      </button>
    </React.Fragment>
  ) : null;

  return (
    <React.Fragment>
      {redirect}
      <main className="container mt-5">
        <div className="row justify-content-between mb-5">
          <button className="btn btn-primary" onClick={goBackHandler}>
            Go back
          </button>
          <div className="row">{ownerButtons}</div>
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
