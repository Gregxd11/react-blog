import React, { useEffect } from 'react';
import Header from './components/header/Header';
import HomeContainer from './containers/HomeContainer';
import PostsContainer from './containers/PostsContainer';
import FullPost from './containers/FullPost';
import { Route, Switch, withRouter } from 'react-router-dom';
import NewPost from './components/NewPost';
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import Logout from './containers/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';

//add route guarding (new post)

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
        <Route path="/newpost" component={NewPost} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={HomeContainer} />
        <Route render={() => <h1>Error</h1>} />
      </Switch>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(actions.checkAuth())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
