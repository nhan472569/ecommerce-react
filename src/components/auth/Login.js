import classes from './Login.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/auth-context';
import { useCallback, useEffect } from 'react';
import environment from '../../environment';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu.'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    // isLoading,
    // error,
    sendRequest: login,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
        navigate('/home');
      },
      [dispatch, navigate]
    )
  );
  useEffect(() => {
    document.title = `Đăng nhập | ${environment.HEAD_TITLE}`;
  }, []);

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
          onSubmit={values => {
            const { email, password } = values;
            login({
              url: 'users/login',
              method: 'post',
              body: { email, password },
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={classes['form-field']}>
                <Field
                  name="email"
                  type="email"
                  placeholder=" "
                  className={classes['form-input']}
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
                  type="password"
                  placeholder=" "
                  className={classes['form-input']}
                />
                <label htmlFor="email" className={classes['form-label']}>
                  Mật khẩu
                </label>
              </div>
              {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null}
              <Link to="forgotten" className={classes.forgotten}>
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
                Đăng nhập
              </button>
            </Form>
          )}
        </Formik>
        <p className={classes.ps}>
          Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>.
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
