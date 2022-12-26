import classes from './Login.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  return (
    <div className={`${classes.container} container`}>
      <div className={classes['login-card']}>
        <h2 className={classes.title}>Đăng nhập vào BookShop</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
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
                {/* {errors.email && touched.email ? (
                <div className={classes.error}>{errors.email}</div>
              ) : null} */}
              </div>
              <div className={classes['form-field']}>
                <Field
                  name="password"
                  type="password"
                  placeholder=" "
                  className={classes['form-input']}
                />
                <label htmlFor="email" className={classes['form-label']}>
                  Password
                </label>
                {/* {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null} */}
              </div>
              <Link to="forgotten" className={classes.forgotten}>
                Quên mật khẩu?
              </Link>
              <button
                type="submit"
                className={classes.submit}
                disabled={errors.email || errors.password}
              >
                Đăng nhập
              </button>
            </Form>
          )}
        </Formik>
        <p className={classes.ps}>
          Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
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
