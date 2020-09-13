import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const FullPost = props => {
  const [ post, setPost ] = useState([]);
  const [ deleted, setDeleted ] = useState(false);
  useEffect(
    () => {
      axios
        .get(
          `https://reactblog-82995.firebaseio.com/posts/${props.match.params
            .id}.json`
        )
        .then(res => setPost(res.data));
      return () => {
        setDeleted(false);
      };
    },
    [ props.match.params.id ]
  );

  const deletePostHandler = async () => {
    const res = await axios.delete(
      `https://reactblog-82995.firebaseio.com/posts/${props.match.params
        .id}.json`
    );
    if (res) {
      setDeleted(true);
    }
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  let redirect = null;
  if (deleted) {
    redirect = <Redirect to="/posts" />;
  }
  return (
    <main className="ui text container aligned center">
      {redirect}
      <button onClick={goBackHandler}>Go back</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={deletePostHandler}>YEET</button>
    </main>
  );
};

export default FullPost;
