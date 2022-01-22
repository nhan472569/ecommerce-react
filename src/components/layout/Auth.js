import React from 'react';
import classes from './Auth.module.css';

const Auth = props => {
  const loginHandler = () => {
    props.onLogin();
  };
  const signupHandler = () => {
    props.onSignup();
  };
  return (
    <div className={classes.auth}>
      <button className={classes.login} onClick={loginHandler}>
        Log in
      </button>
      <button className={classes.signup} onClick={signupHandler}>
        Sign up
      </button>
    </div>
  );
};

export default Auth;
