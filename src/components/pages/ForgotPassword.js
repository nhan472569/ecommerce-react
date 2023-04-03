import { Field, Form, Formik } from 'formik';
import classes from './ForgotPassword.module.css';
import * as Yup from 'yup';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { useCallback, useEffect } from 'react';
import environment from '../../environment';
import { notificationAction } from '../../store/notification-context';
import NotificationModel from '../../models/NotificationModel';
import { useNavigate } from 'react-router';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email.'),
  token: Yup.string().required('Vui lòng nhập mã xác thực.'),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    sendRequest: sendEmail,
  } = useHttp(
    useCallback(
      data => {
        const token = data.data.token;
        dispatch(
          notificationAction.push(
            new NotificationModel(
              'success',
              'Mã xác nhận đã được gửi vào email của bạn.'
            ).toJSON()
          )
        );
        navigate(`/user/forgotten/${token}`);
      },
      [dispatch, navigate]
    )
  );
  useEffect(() => {
    document.title = `Quên mật khẩu | ${environment.HEAD_TITLE}`;
  }, []);

  useEffect(() => {
    if (error)
      dispatch(
        notificationAction.push(new NotificationModel('error', error).toJSON())
      );
  }, [error, dispatch]);

  const onSubmitHandler = async values => {
    const { email } = values;
    await sendEmail({
      url: 'users/forgotPassword',
      method: 'post',
      body: { email },
    });
  };
  return (
    <div className={`${classes.container} container`}>
      <div className={classes['forgotten-card']}>
        <h2 className={classes.title}>Quên mật khẩu</h2>
        <Formik
          initialValues={{
            email: '',
            token: '',
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={onSubmitHandler}
        >
          {({ errors, touched, dirty }) => (
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
                  name="token"
                  type="text"
                  placeholder=" "
                  className={`${classes['form-input']} ${
                    errors.token && touched.token ? classes['input-error'] : ''
                  }`}
                />
                <label htmlFor="token" className={classes['form-label']}>
                  Mã xác thực
                </label>
              </div>
              {errors.token && touched.token ? (
                <div className={classes.error}>{errors.token}</div>
              ) : null}
              <button
                type="submit"
                className={classes.submit}
                disabled={
                  dirty || touched.email || isLoading
                    ? errors.email || isLoading
                    : true
                }
              >
                {isLoading ? (
                  <LoadingSpinner color="#fff" borderSize="4px" size="30px" />
                ) : (
                  'Lấy mã xác thực'
                )}
              </button>
              <button
                type="submit"
                className={classes.submit}
                disabled={
                  dirty || touched.email || isLoading
                    ? errors.email || isLoading
                    : true
                }
              >
                {isLoading ? (
                  <LoadingSpinner color="#fff" borderSize="4px" size="30px" />
                ) : (
                  'Xác nhận'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
