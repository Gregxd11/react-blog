import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const FullPost = props => {
  const [ post, setPost ] = useState([]);
  const [ deleted, setDeleted ] = useState(false);
  useEffect(
    () => {
      axios.get(``).then(res => setPost(res.data));
      return () => {
        setDeleted(false);
      };
    },
    [ props.match.params.id ]
  );

  const deletePostHandler = async () => {
    const res = await axios.delete(``);
    if (res) {
      setDeleted(true);
    }
  };

  let redirect = null;
  if (deleted) {
    redirect = <Redirect to="/posts" />;
  }
  return (
    <main className="ui text container aligned center">
      {redirect}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={deletePostHandler}>YEET</button>
    </main>
  );
};

export default FullPost;
