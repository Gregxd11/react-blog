import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import Post from '../components/Post';
import Spinner from '../components/Spinner';

const PostContainer = ({ fetchPosts, ...props }) => {
  useEffect(
    () => {
      fetchPosts();
    },
    [ fetchPosts ]
  );

  let allPosts = props.posts.map(post => {
    return (
      <Link
        key={post.id}
        to={{
          pathname: `/posts/${post.id}`,
          state: { userId: post.user }
        }}
        className="card mt-3"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Post title={post.title} body={post.body} date={post.date} />
      </Link>
    );
  });

  if (props.loading) {
    allPosts = <Spinner />;
  }
  let messageClass = 'alert alert-danger alert-dismissible fade'; // this needs to be changed to bootstrap

  if (props.error) {
    messageClass =
      'alert alert-danger alert-dismissible show text-center mt-3 justify-content-center';
  }

  return (
    <main className="container">
      <div className={messageClass} role="alert">
        {props.error}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <section>{allPosts}</section>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    error: state.posts.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(actions.fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
