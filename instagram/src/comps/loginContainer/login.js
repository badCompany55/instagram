import React from 'react';
import './login.css';
import PropTypes from 'prop-types';

export const Login = props => {
  return (
    <div className="loginContainer">
      <h1>Login </h1>
      <form onSubmit={props.submit} className="loginForm">
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input type="text" onChange={props.userChange} />
        </div>
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input type="password" onChange={props.passChange} />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  submit: PropTypes.func,
  userChange: PropTypes.func,
  passChange: PropTypes.func,
};
