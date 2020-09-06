import React from 'react';

const post = props => (
  <div className="content">
    <div className="header">{props.title}</div>
    <div className="description">{props.body}</div>
  </div>
);

export default post;
