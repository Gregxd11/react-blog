import React, { useState, useEffect } from 'react';

const EditPost = props => {
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ post, setPost ] = useState({});

  useEffect(
    () => {
      setPost({ title, body });
    },
    [ body, title ]
  );

  // make this form into it's own dumb component as it's used in NewPost as well.
  // edit route needs to only be visible to owner

  return (
    <React.Fragment>
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
        <button className="btn btn-primary">SUBMIT</button>
      </main>
    </React.Fragment>
  );
};

export default EditPost;
