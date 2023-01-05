import classes from './Signup.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { authAction } from '../../store/auth-context';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import environment from '../../environment';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Vui lòng nhập tên người dùng.'),
  email: Yup.string()
    .email('Email không hợp lệ!')
    .required('Vui lòng nhập email.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu.'),
  passwordConfirm: Yup.string().required('Vui lòng nhập lại mật khẩu.'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const {
    // isLoading,
    // error,
    sendRequest: signup,
  } = useHttp(data => {
    dispatch(authAction.login(data));
  });

  useEffect(() => (document.title = `Đăng ký | ${environment.HEAD_TITLE}`), []);

  const isSubmitButtonDisabled = (touched, errors) => {
    return touched.username ||
      touched.email ||
      touched.password ||
      touched.passwordConfirm
      ? errors.username ||
          errors.email ||
          errors.password ||
          errors.passwordConfirm
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
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            const { username, email, password, passwordConfirm } = values;
            signup({
              url: 'users/signup',
              method: 'post',
              body: { username, email, password, passwordConfirm },
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={classes['form-field']}>
                <Field
                  name="username"
                  type="username"
                  placeholder=" "
                  className={classes['form-input']}
                />
                <label htmlFor="username" className={classes['form-label']}>
                  Tên người dùng
                </label>
              </div>
              {errors.username && touched.username ? (
                <div className={classes.error}>{errors.username}</div>
              ) : null}
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
              <div className={classes['form-field']}>
                <Field
                  name="passwordConfirm"
                  type="passwordConfirm"
                  placeholder=" "
                  className={classes['form-input']}
                />
                <label
                  htmlFor="passwordConfirm"
                  className={classes['form-label']}
                >
                  Nhập lại mật khẩu
                </label>
              </div>
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div className={classes.error}>{errors.passwordConfirm}</div>
              ) : null}
              <button
                type="submit"
                className={classes.submit}
                disabled={isSubmitButtonDisabled(touched, errors)}
              >
                Đăng ký
              </button>
            </Form>
          )}
        </Formik>
        <p className={classes.ps}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>.
        </p>
      </div>
    </div>
  );
};
export default Signup;
