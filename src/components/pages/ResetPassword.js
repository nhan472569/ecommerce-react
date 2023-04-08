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
import { useNavigate, useParams } from 'react-router';
import { authAction } from '../../store/auth-context';

const newPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Vui lòng nhập mật khẩu mới.'),
  passwordConfirm: Yup.string().required('Vui lòng nhập mật khẩu lại mới.'),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;

  const {
    isLoading,
    error,
    sendRequest: sendEmail,
  } = useHttp(
    useCallback(
      data => {
        dispatch(
          notificationAction.push(
            new NotificationModel(
              'success',
              'Thay đổi mật khẩu thành công.'
            ).toJSON()
          )
        );
        dispatch(authAction.login(data.data.data));
        navigate('/login');
      },
      [dispatch, navigate]
    )
  );
  useEffect(() => {
    document.title = `Đặt lại mật khẩu | ${environment.HEAD_TITLE}`;
  }, []);

  useEffect(() => {
    if (error)
      dispatch(
        notificationAction.push(new NotificationModel('error', error).toJSON())
      );
  }, [error, dispatch]);

  const onSubmitHandler = async values => {
    const { password, passwordConfirm } = values;
    await sendEmail({
      url: `users/resetPassword/${token}`,
      method: 'post',
      body: { password, passwordConfirm },
    });
  };
  return (
    <div className={`${classes.container} container`}>
      <div className={classes['forgotten-card']}>
        <h2 className={classes.title}>Đặt lại mật khẩu</h2>
        <Formik
          initialValues={{
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={newPasswordSchema}
          onSubmit={onSubmitHandler}
        >
          {({ errors, touched, dirty }) => (
            <Form>
              <div className={classes['form-field']}>
                <Field
                  name="password"
                  type="password"
                  placeholder=" "
                  className={`${classes['form-input']} ${
                    errors.password && touched.password
                      ? classes['input-error']
                      : ''
                  }`}
                />
                <label htmlFor="password" className={classes['form-label']}>
                  Mật khẩu
                </label>
              </div>
              {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null}
              <div className={classes['form-field']}>
                <Field
                  name="passwordConfirm"
                  type="password"
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
                  Nhập lại mật khẩu mới
                </label>
              </div>
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div className={classes.error}>{errors.passwordConfirm}</div>
              ) : null}
              <button
                type="submit"
                className={classes.submit}
                disabled={
                  dirty ||
                  touched.password ||
                  touched.passwordConfirm ||
                  isLoading
                    ? errors.password || errors.passwordConfirm || isLoading
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
