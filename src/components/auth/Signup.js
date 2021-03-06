import { useRef, useState } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Signup.module.css';
import useHttp from '../../hooks/use-http';

const Signup = props => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const password2InputRef = useRef();

  const {
    isLoading: isSigningup,
    error,
    sendRequest: sendSignupRequest,
  } = useHttp();

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

  const password2BlurHandler = () => {
    const enteredPassword = passwordInputRef.current.value;
    const enteredPassword2 = password2InputRef.current.value;
    const password2IsValid =
      enteredPassword2.trim() !== '' && enteredPassword === enteredPassword2;

    if (!password2IsValid) {
      setPassword2Error(true);
    }
  };
  const password2ChangeHandler = () => {
    setPassword2Error(false);
  };

  const signupHandler = async e => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPassword2 = password2InputRef.current.value;

    const emailIsValid =
      enteredEmail.trim().includes('@') && enteredEmail.trim() !== '';
    const passwordIsValid = enteredPassword.trim() !== '';
    const password2IsValid =
      enteredPassword2.trim() !== '' && enteredPassword === enteredPassword2;

    if (!emailIsValid) {
      setEmailError(true);
    }

    if (!passwordIsValid) {
      setPasswordError(true);
    }

    if (!password2IsValid) {
      setPassword2Error(true);
    }

    if (!emailIsValid || !passwordIsValid || !password2IsValid) {
      return;
    }

    sendSignupRequest({
      url: 'auth/register',
      method: 'post',
      body: {
        email: enteredEmail,
        password: enteredPassword,
        retypePassword: enteredPassword2,
      },
    });

    if (!error) {
      props.onClose();
    }
  };

  return (
    <Modal onClose={props.onClose}>
      {isSigningup && <LoadingSpinner />}
      <h2 className={classes.title}>????ng k??</h2>
      <form className={classes.form} onSubmit={signupHandler}>
        <div className={classes.control}>
          <Input
            hasError={emailError}
            type="email"
            name="email"
            id="email"
            placeholder="?????a ch??? email"
            ref={emailInputRef}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailError && <p className={classes.error}>Email kh??ng h???p l???.</p>}
        </div>
        <div className={classes.control}>
          <Input
            hasError={passwordError}
            type="password"
            name="password"
            id="password"
            placeholder="M???t kh???u"
            ref={passwordInputRef}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
          {passwordError && (
            <p className={classes.error}>M???t kh???u kh??ng h???p l???.</p>
          )}
        </div>
        <div className={classes.control}>
          <Input
            hasError={password2Error}
            type="password"
            name="password2"
            id="password2"
            placeholder="Nh???p l???i m???t kh???u"
            ref={password2InputRef}
            onBlur={password2BlurHandler}
            onChange={password2ChangeHandler}
          />
          {password2Error && (
            <p className={classes.error}>M???t kh???u nh???p l???i kh??ng ch??nh x??c.</p>
          )}
        </div>
        <div className={classes.actions}>
          <Button className={classes.login}>????ng k??</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Signup;
