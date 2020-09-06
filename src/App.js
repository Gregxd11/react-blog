import React from 'react';
import Header from './components/header/Header';
import HomeContainer from './containers/HomeContainer';
import PostsContainer from './containers/PostsContainer';
import FullPost from './components/FullPost';
import { Route, Switch } from 'react-router-dom';
import NewPost from './components/NewPost';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/posts/:id" component={FullPost} />
        <Route path="/posts" component={PostsContainer} />
        <Route path="/newpost" component={NewPost} />
        <Route path="/" exact component={HomeContainer} />
        <Route render={() => <h1>Error</h1>} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
