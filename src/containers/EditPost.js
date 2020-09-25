import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const EditPost = props => {
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ post, setPost ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);
  let url;
  if (props.location.state === undefined) {
    url = '#';
    props.history.push('/posts');
  }
  else {
    url = `https://reactblog-82995.firebaseio.com/posts/${props.location.state
      .userId}/${props.match.params.id}.json`;
  }

  useEffect(
    () => {
      axios.get(url).then(res => {
        setPost(res.data);
        setTitle(res.data.title);
        setBody(res.data.body);
      });
    },
    [ url ]
  );

  const submitHandler = () => {
    axios
      .put(`${url}?auth=${props.token}`, {
        ...post,
        title,
        body
      })
      .then(() => setSubmitted(true));
  };

  let redirect = null;

  if (submitted) {
    redirect = <Redirect to="/posts" />;
  }

  // make this form into it's own dumb component as it's used in NewPost as well.
  // edit route needs to only be visible to owner

  return (
    <React.Fragment>
      {redirect}
      <main className="container">
        <h1 className="text-center mt-3">Edit Post</h1>
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

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(EditPost);
