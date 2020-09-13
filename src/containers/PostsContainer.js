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
      <Link key={post.id} to={`/posts/${post.id}`} className="ui card">
        <Post title={post.title} body={post.body} />
      </Link>
    );
  });

  if (props.loading) {
    allPosts = <Spinner />;
  }
  let messageClass = 'ui floating message hidden';

  if (props.error) {
    messageClass = 'ui floating message';
  }
  const hideMessage = () => {
    console.log('clicked');
    messageClass = 'ui floating message hidden';
  };

  //add a transition to close error message

  return (
    <main>
      <div className={messageClass} onClick={hideMessage}>
        <p>{props.error}</p>
      </div>
      <section className="ui cards">{allPosts}</section>
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
