import classes from './Signup.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Signup = () => {
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
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
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
                  Username
                </label>
                {/* {errors.email && touched.email ? (
                <div className={classes.error}>{errors.email}</div>
              ) : null} */}
              </div>
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
                  Password Confirm
                </label>
                {/* {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null} */}
              </div>
              <button
                type="submit"
                className={classes.submit}
                disabled={errors.email || errors.password}
              >
                Đăng ký
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Signup;
