import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import Post from '../components/Post';
import FullPost from '../components/FullPost';
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
        to={`/posts/${post.id}`}
        className="card mt-3"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Post title={post.title} body={post.body} />
      </Link>
    );
  });

  if (props.loading) {
    allPosts = <Spinner />;
  }
  let messageClass = 'ui floating message hidden'; // this needs to be changed to bootstrap

  if (props.error) {
    messageClass = 'alert alert-danger text-center mt-3 justify-content-center';
  }
  const hideMessage = () => {
    console.log('clicked');
    messageClass = 'ui floating message hidden'; //this needs to be changed to bootstrap
  };

  //add a transition to close error message

  return (
    <main className="container">
      <div className={messageClass} onClick={hideMessage}>
        {props.error}
      </div>
      <section>{allPosts}</section>
      <Route path={'/posts/:id'} component={FullPost} />
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
