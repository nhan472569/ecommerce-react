import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../../store/auth-context';
import ProfileButton from '../profile/ProfileButton';

import classes from './Auth.module.css';

const Auth = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const loginHandler = () => {
    navigate('/login');
  };
  const signupHandler = () => {
    navigate('/signup');
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
  ) : // <ProfileButton onLogout={logoutHandler} />
  null;
  return <div className={classes.auth}>{authContent}</div>;
};

export default Auth;
