import { useRef, useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Login.module.css';

import { useDispatch } from 'react-redux';
import { authAction } from '../../store/auth-context';

const Login = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  const emailBlurHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    const emailIsValid =
      enteredEmail.trim().includes('@') && enteredEmail.trim() !== '';

    if (!emailIsValid) {
      setEmailError(true);
    }
  };

  const emailChangeHandler = () => {
    setEmailError(false);
  };

  const passwordBlurHandler = () => {
    const enteredPassword = passwordInputRef.current.value;
    const passwordIsValid = enteredPassword.trim() !== '';

    if (!passwordIsValid) {
      setPasswordError(true);
    }
  };

  const passwordChangeHandler = () => {
    setPasswordError(false);
  };

  const loginHandler = async e => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const emailIsValid =
      enteredEmail.trim().includes('@') && enteredEmail.trim() !== '';
    const passwordIsValid = enteredPassword.trim() !== '';

    if (!emailIsValid) {
      setEmailError(true);
    }

    if (!passwordIsValid) {
      setPasswordError(true);
    }

    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://do-an-nganh-nodejs.herokuapp.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      if (!data.status) {
        setIsLoading(false);
        throw new Error(data.message);
      }

      dispatch(authAction.login(data.user));
      setIsLoading(false);
      props.onClose();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Modal onClose={props.onClose}>
      {isLoading && <LoadingSpinner />}
      <h2 className={classes.title}>Đăng nhập</h2>
      <form className={classes.form} onSubmit={loginHandler}>
        <div className={classes.control}>
          <Input
            hasError={emailError}
            type="email"
            name="email"
            id="email"
            placeholder="Địa chỉ email"
            ref={emailInputRef}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailError && <p className={classes.error}>Email không hợp lệ.</p>}
        </div>
        <div className={classes.control}>
          <Input
            hasError={passwordError}
            type="password"
            name="password"
            id="password"
            placeholder="Mật khẩu"
            ref={passwordInputRef}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
          {passwordError && (
            <p className={classes.error}>Mật khẩu không hợp lệ.</p>
          )}
        </div>
        <div className={classes.actions}>
          <Button className={classes.login}>Đăng nhập</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
