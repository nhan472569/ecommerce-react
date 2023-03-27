import classes from './Signup.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { authAction } from '../../store/auth-context';
import { notificationAction } from '../../store/notification-context';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import environment from '../../environment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import LoadingSpinner from '../UI/LoadingSpinner';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên người dùng.'),
  email: Yup.string()
    .email('Email không hợp lệ!')
    .required('Vui lòng nhập email.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu.'),
  passwordConfirm: Yup.string().required('Vui lòng nhập lại mật khẩu.'),
});

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    passwordConfirm: false,
  });

  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    sendRequest: signup,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
      },
      [dispatch]
    )
  );

  useEffect(() => {
    document.title = `Đăng ký | ${environment.HEAD_TITLE}`;
    return () => {
      setPasswordVisible({});
    };
  }, []);
  useEffect(() => {
    if (error)
      dispatch(notificationAction.push({ type: 'error', message: error }));
  }, [error, dispatch]);

  const viewPasswordHandler = field => {
    setPasswordVisible(isVisible => {
      return { ...isVisible, [field]: !isVisible[field] };
    });
  };
  const isSubmitButtonDisabled = (touched, errors) => {
    return touched.name ||
      touched.email ||
      touched.password ||
      touched.passwordConfirm ||
      isLoading
      ? errors.name ||
          errors.email ||
          errors.password ||
          errors.passwordConfirm ||
          isLoading
      : true;
  };

  return (
    <div className={`${classes.container} container`}>
      <div className={classes['thumbnail']}>
        <img
          src={process.env.PUBLIC_URL + '/images/signup.jpeg'}
          alt="login-thumbnail"
        ></img>
      </div>
      <div className={classes['signup-card']}>
        <h2 className={classes.title}>Đăng ký</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async values => {
            // same shape as initial values
            const { name, email, password, passwordConfirm } = values;
            await signup({
              url: 'users/signup',
              method: 'post',
              body: { name, email, password, passwordConfirm },
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={classes['form-field']}>
                <Field
                  name="name"
                  type="text"
                  placeholder=" "
                  className={`${classes['form-input']} ${
                    errors.name && touched.name ? classes['input-error'] : ''
                  }`}
                />
                <label htmlFor="name" className={classes['form-label']}>
                  Họ và tên
                </label>
              </div>
              {errors.name && touched.name ? (
                <div className={classes.error}>{errors.name}</div>
              ) : null}
              <div className={classes['form-field']}>
                <Field
                  name="email"
                  type="email"
                  placeholder=" "
                  className={`${classes['form-input']} ${
                    errors.email && touched.email ? classes['input-error'] : ''
                  }`}
                />
                <label htmlFor="email" className={classes['form-label']}>
                  Email
                </label>
              </div>
              {errors.email && touched.email ? (
                <div className={classes.error}>{errors.email}</div>
              ) : null}
              <div className={classes['form-field']}>
                <Field
                  name="password"
                  type={passwordVisible.password ? 'text' : 'password'}
                  placeholder=" "
                  className={`${classes['form-input']} ${
                    errors.password && touched.password
                      ? classes['input-error']
                      : ''
                  }`}
                />
                <label htmlFor="email" className={classes['form-label']}>
                  Mật khẩu
                </label>
                <span
                  className={classes['password-vision']}
                  onClick={() => viewPasswordHandler('password')}
                >
                  {passwordVisible.password ? (
                    <FontAwesomeIcon icon={solid('eye')} />
                  ) : (
                    <FontAwesomeIcon icon={solid('eye-slash')} />
                  )}
                </span>
              </div>
              {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null}
              <div className={classes['form-field']}>
                <Field
                  name="passwordConfirm"
                  type={passwordVisible.passwordConfirm ? 'text' : 'password'}
                  placeholder=" "
                  className={`${classes['form-input']} ${
                    errors.passwordConfirm && touched.passwordConfirm
                      ? classes['input-error']
                      : ''
                  }`}
                />
                <label
                  htmlFor="passwordConfirm"
                  className={classes['form-label']}
                >
                  Nhập lại mật khẩu
                </label>
                <span
                  className={classes['password-vision']}
                  onClick={() => viewPasswordHandler('passwordConfirm')}
                >
                  {passwordVisible.passwordConfirm ? (
                    <FontAwesomeIcon icon={solid('eye')} />
                  ) : (
                    <FontAwesomeIcon icon={solid('eye-slash')} />
                  )}
                </span>
              </div>
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div className={classes.error}>{errors.passwordConfirm}</div>
              ) : null}
              <button
                type="submit"
                className={classes.submit}
                disabled={isSubmitButtonDisabled(touched, errors)}
              >
                {isLoading ? (
                  <LoadingSpinner color="#fff" borderSize="4px" size="30px" />
                ) : (
                  'Đăng ký'
                )}
              </button>
            </Form>
          )}
        </Formik>
        <p className={classes.ps}>
          Đã có tài khoản?{' '}
          <Link to="/login" title="Đăng nhập">
            Đăng nhập
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
export default Signup;
