import classes from './Login.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/auth-context';
import { useCallback, useEffect, useState } from 'react';
import environment from '../../environment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu.'),
});

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    // error,
    sendRequest: login,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
      },
      [dispatch]
    )
  );
  useEffect(() => {
    document.title = `Đăng nhập | ${environment.HEAD_TITLE}`;
    return () => {
      setPasswordVisible(false);
    };
  }, []);

  const viewPasswordHandler = () => {
    setPasswordVisible(isVisible => !isVisible);
  };
  return (
    <div className={`${classes.container} container`}>
      <div className={classes['login-card']}>
        <h2 className={classes.title}>Đăng nhập</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async values => {
            const { email, password } = values;
            await login({
              url: 'users/login',
              method: 'post',
              body: { email, password },
            });
            navigate('/home');
          }}
        >
          {({ errors, touched }) => (
            <Form>
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
                  type={passwordVisible ? 'text' : 'password'}
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
                  onClick={viewPasswordHandler}
                >
                  {passwordVisible ? (
                    <FontAwesomeIcon icon={solid('eye')} />
                  ) : (
                    <FontAwesomeIcon icon={solid('eye-slash')} />
                  )}
                </span>
              </div>
              {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null}
              <Link
                to="forgotten"
                className={classes.forgotten}
                title="Quên mật khẩu"
              >
                Quên mật khẩu?
              </Link>
              <button
                type="submit"
                className={classes.submit}
                disabled={
                  touched.email || touched.password
                    ? errors.email || errors.password
                    : true
                }
              >
                {isLoading ? (
                  <LoadingSpinner color="#fff" borderSize="4px" size="30px" />
                ) : (
                  'Đăng nhập'
                )}
              </button>
            </Form>
          )}
        </Formik>
        <p className={classes.ps}>
          Chưa có tài khoản?{' '}
          <Link to="/signup" title="Đăng ký tài khoản">
            Đăng ký ngay
          </Link>
          .
        </p>
      </div>
      <div className={classes['thumbnail']}>
        <img
          src={process.env.PUBLIC_URL + '/images/login.jpeg'}
          alt="login-thumbnail"
        ></img>
      </div>
    </div>
  );
};
export default Login;
