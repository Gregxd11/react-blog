import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const NewPost = props => {
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

  const submitHandler = () => {
    props.onSubmit(post);
    setSubmitted(true);
  };

  let redirect = null;
  if (submitted) {
    redirect = <Redirect to="/posts" />;
  }
  // change border radius to label and input
  return (
    <React.Fragment>
      {redirect}
      <main className="container">
        <h1 className="text-center mt-3">New Post</h1>
        <div className="form-group">
          <div className="row">
            <label
              htmlFor="title"
              className="badge badge-primary col-2 py-2"
              style={{ fontSize: '1.25em' }}
            >
              Title
            </label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              className="form-control col-10"
              id="title"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="textarea" style={{ fontSize: '1.25em' }}>
            Content:
          </label>
          <textarea
            style={{ resize: 'none' }}
            value={body}
            onChange={e => setBody(e.target.value)}
            className="form-control"
            id="textarea"
            rows="5"
          />
        </div>
        <button className="btn btn-primary" onClick={submitHandler}>
          SUBMIT
        </button>
      </main>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: post => dispatch(actions.newPost(post))
  };
};

export default connect(null, mapDispatchToProps)(NewPost);
