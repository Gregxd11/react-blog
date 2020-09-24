import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/Header';
import HomeContainer from './containers/HomeContainer';
import PostsContainer from './containers/PostsContainer';
import FullPost from './containers/FullPost';
import NewPost from './containers/NewPost';
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import Logout from './containers/Logout';
import Contact from './containers/Contact';

import * as actions from './store/actions';

const App = ({ onLoad, ...props }) => {
  useEffect(
    () => {
      onLoad();
    },
    [ onLoad ]
  );
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/posts/:user/:id" component={FullPost} />
        <Route path="/posts" component={PostsContainer} />
        {props.isAuthenticated ? (
          <Route path="/newpost" component={NewPost} />
        ) : null}
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={HomeContainer} />
        <Route render={() => <h1 className="text-center">Error</h1>} />
      </Switch>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(actions.checkAuth())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
