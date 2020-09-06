import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import Post from '../components/Post';
import FullPost from '../components/FullPost';

const PostContainer = props => {
  const [ posts, setPosts ] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('');
      let fetched = [];
      for (let key in res.data) {
        fetched.push({ id: key, ...res.data[key] });
      }
      setPosts(fetched);
    };
    fetchData();
  }, []);

  console.log(posts);
  //add spinner
  let allPosts = posts.map(post => {
    return (
      <Link key={post.id} to={`/posts/${post.id}`} className="ui card">
        <Post title={post.title} body={post.body} />
      </Link>
    );
  });

  return (
    <main>
      <section className="ui cards">{allPosts}</section>
      <Route path={'/posts/:id'} component={FullPost} />
    </main>
  );
};

export default PostContainer;
