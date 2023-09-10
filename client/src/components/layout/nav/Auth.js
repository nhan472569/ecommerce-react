import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileButton from '../nav/ProfileButton';

import classes from './Auth.module.css';

const Auth = ({ onClickAction }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const loginHandler = () => {
    onClickAction?.();
    navigate('/login');
  };
  const signupHandler = () => {
    onClickAction?.();
    navigate('/signup');
  };

  const authContent = !isLoggedIn ? (
    <>
      <button className={classes.login} onClick={loginHandler}>
        Đăng Nhập
      </button>
      <button className={classes.signup} onClick={signupHandler}>
        Đăng ký
      </button>
    </>
  ) : (
    <ProfileButton onClickAction={onClickAction} />
  );
  return <div className={classes.auth}>{authContent}</div>;
};

export default Auth;
