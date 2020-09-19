import React from 'react';
import { NavLink } from 'react-router-dom';

const header = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <NavLink to="/" exact className="nav-link">
          Home
        </NavLink>
        <NavLink to="/posts" className="nav-link">
          Posts
        </NavLink>
        <NavLink to="/newpost" className="nav-link">
          New Post
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
      </div>
      <div className="navbar-nav ml-auto">
        <NavLink to="/login" className="btn btn-outline-light">
          Login
        </NavLink>
        <NavLink to="/signup" className="ml-2 btn btn-outline-info">
          Signup
        </NavLink>
      </div>
    </div>
  </nav>
);

export default header;
