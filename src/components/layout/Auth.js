import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../../store/auth-context';
import ProfileButton from '../profile/ProfileButton';

import classes from './Auth.module.css';

const Auth = props => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const loginHandler = () => {
    props.onLogin();
  };
  const signupHandler = () => {
    props.onSignup();
  };
  const logoutHandler = () => {
    dispatch(authAction.logout());
  };

  const authContent = !isLoggedIn ? (
    <>
      <button className={classes.login} onClick={loginHandler}>
        Đăng nhập
      </button>
      <button className={classes.signup} onClick={signupHandler}>
        Đăng ký
      </button>
    </>
  ) : (
    <ProfileButton onLogout={logoutHandler} />
  );
  return <div className={classes.auth}>{authContent}</div>;
};

export default Auth;
