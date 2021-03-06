import React from 'react';
import { connect } from 'react-redux';
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
        {props.isAuthenticated ? (
          <NavLink to="/newpost" className="nav-link">
            New Post
          </NavLink>
        ) : null}
        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
      </div>
      <div className="navbar-nav ml-auto">
        {props.isAuthenticated ? (
          <NavLink to="/logout" className="btn btn-outline-danger">
            Logout
          </NavLink>
        ) : (
          <React.Fragment>
            <NavLink to="/login" className="btn btn-outline-light">
              Login
            </NavLink>
            <NavLink to="/signup" className="ml-2 btn btn-outline-info">
              Signup
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </div>
  </nav>
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(header);
