import React from 'react';

const post = props => (
  <div className="card-body">
    <h1 className="card-title text-center" style={{ fontSize: '7rem' }}>
      {props.title}
    </h1>
    <h6 className="card-subtitle text-muted" style={{ fontSize: '1.75em' }}>
      {props.date.split(',')[0]}
    </h6>
    <p className="card-text" style={{ fontSize: '1.5rem' }}>
      {props.body}
    </p>
  </div>
);

export default post;
