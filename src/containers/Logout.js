import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions';

const Logout = props => {
  useEffect(() => {
    props.onLoad();
  });

  return <Redirect to="/" />;
};

const mapStateToDispatch = dispatch => {
  return {
    onLoad: () => dispatch(actions.logout())
  };
};

export default connect(null, mapStateToDispatch)(Logout);
