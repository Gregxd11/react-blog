import React from 'react';
import { NavLink } from 'react-router-dom';

const header = props => (
  <header className="ui secondary pointing menu">
    <div className="ui container stackable">
      <nav style={{ display: 'flex' }}>
        <NavLink to="/" exact className="item">
          Home
        </NavLink>
        <NavLink to="/posts" className="item">
          Posts
        </NavLink>
        <NavLink to="/newpost" className="item">
          New Post
        </NavLink>
        <NavLink to="/contact" className="item">
          Contact
        </NavLink>
      </nav>
    </div>
  </header>
);

export default header;
