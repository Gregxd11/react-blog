import React from 'react';

const post = props => (
  <div className="card-body">
    <h1 className="card-title text-center">{props.title}</h1>
    <p className="card-text">{props.body}</p>
  </div>
);

export default post;
