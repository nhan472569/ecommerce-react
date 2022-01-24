import { useRef } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import classes from './Login.module.css';

import { useDispatch } from 'react-redux';
import { authAction } from '../../store';

const Login = props => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  const loginHandler = async e => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const emailIsValid = enteredEmail.includes('@') && enteredEmail !== '';
    const passwordIsValid = enteredPassword !== '';
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
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
    const data = await response.json();
    console.log(data);
    dispatch(authAction.login(data.user));
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose}>
      <h2 className={classes.title}>Đăng nhập</h2>
      <form className={classes.form} onSubmit={loginHandler}>
        <div className={classes.control}>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Địa chỉ email"
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Mật khẩu"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <Button className={classes.login}>Đăng nhập</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
