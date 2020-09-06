import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NewPost = () => {
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ post, setPost ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);

  useEffect(
    () => {
      setPost({ title, body });
    },
    [ body, title ]
  );
  const getDate = () => {
    return new Date().toLocaleString();
  };

  const submitHandler = async () => {
    await axios.post('', {
      ...post,
      date: getDate()
    });
    setSubmitted(true);
  };

  let redirect = null;
  if (submitted) {
    redirect = <Redirect to="/posts" />;
  }

  return (
    <React.Fragment>
      {redirect}
      <main className="ui container center aligned">
        <h1>New Post</h1>
        <div className="ui big form">
          <div className="ui labeled input">
            <label className="ui label">Title:</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="field" style={{ marginTop: '50px' }}>
            <textarea
              style={{ resize: 'none' }}
              type="text"
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>
          <button className="ui button primary" onClick={submitHandler}>
            SUBMIT
          </button>
        </div>
      </main>
    </React.Fragment>
  );
};

export default NewPost;