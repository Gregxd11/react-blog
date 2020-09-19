import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../store/actions';

const SignupContainer = props => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ submitted, setSubmitted ] = useState(false);

  const submitHandler = event => {
    event.preventDefault();
    props.onSubmit(email, password);
    setSubmitted(true);
  };

  let redirect = null;
  if (submitted) {
    redirect = <Redirect to="/" />;
  }
  // Style the form a bit more (border, margin, padding)
  return (
    <React.Fragment>
      {redirect}
      <main className="container">
        <h1 className="text-center mt-3">Login</h1>
        <form
          className="form-group offset-4 justify-content-center"
          onSubmit={submitHandler}
        >
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
            className="form-control col-6"
            id="title"
            placeholder="Email"
          />
          <div className="w-100" />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control col-6"
            id="password"
            type="password"
            required
            placeholder="Password"
          />
          <div className="w-100" />
          <button className="btn btn-primary col-6 my-3">SUBMIT</button>
          <div className="w-100" />
          <div className="offset-1">
            <span>Don't have an account? </span>
            <Link to="/signup">Signup</Link>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (email, password) => dispatch(actions.login(email, password))
  };
};

export default connect(null, mapDispatchToProps)(SignupContainer);
