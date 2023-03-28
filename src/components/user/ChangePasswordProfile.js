import { Field, Form, Formik } from 'formik';
import LoadingSpinner from '../UI/LoadingSpinner';
import * as Yup from 'yup';
import classes from './ChangePasswordProfile.module.css';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { useCallback, useEffect } from 'react';
import { authAction } from '../../store/auth-context';
import Button from '../UI/Button';
import { notificationAction } from '../../store/notification-context';
import NotificationModel from '../../models/NotificationModel';

const ChangePasswordSchema = Yup.object().shape({
  passwordCurrent: Yup.string().required('Vui lòng nhập mật khẩu hiện tại.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu mới.'),
  passwordConfirm: Yup.string().required('Vui lòng nhập lại mật khẩu mới.'),
});

const ChangePasswordProfile = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    sendRequest: changePassword,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
        dispatch(
          notificationAction.push(
            new NotificationModel(
              'success',
              'Thay đổi mật khầu thành công'
            ).toJSON()
          )
        );
      },
      [dispatch]
    )
  );

  const onSubmitHandler = async (values, { resetForm }) => {
    await changePassword({
      url: 'users/updateMyPassword',
      method: 'patch',
      body: values,
    });
    resetForm();
  };

  useEffect(() => {
    if (error)
      dispatch(
        notificationAction.push(new NotificationModel('error', error).toJSON())
      );
  }, [error, dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          passwordCurrent: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={onSubmitHandler}
      >
        {({ errors, touched, dirty, resetForm }) => (
          <Form className={classes['profile-form']}>
            <div className={classes['form-control']}>
              <label htmlFor="passwordCurrent" className={classes.label}>
                Mật khẩu hiện tại
              </label>
              <Field
                name="passwordCurrent"
                type="password"
                className={`${classes.input} ${
                  errors.passwordCurrent && touched.passwordCurrent
                    ? classes['input-error']
                    : ''
                }`}
              />
            </div>
            {errors.passwordCurrent && touched.passwordCurrent ? (
              <div className={classes.error}>{errors.passwordCurrent}</div>
            ) : null}
            <div className={classes['form-control']}>
              <label htmlFor="password" className={classes.label}>
                Mật khẩu mới
              </label>
              <Field
                name="password"
                type="password"
                className={`${classes.input} ${
                  errors.password && touched.password
                    ? classes['input-error']
                    : ''
                }`}
              />
            </div>
            {errors.password && touched.password ? (
              <div className={classes.error}>{errors.password}</div>
            ) : null}
            <div className={classes['form-control']}>
              <label htmlFor="email" className={classes.label}>
                Nhập lại mật khẩu mới
              </label>
              <Field
                name="passwordConfirm"
                type="password"
                className={`${classes.input} ${
                  errors.passwordConfirm && touched.passwordConfirm
                    ? classes['input-error']
                    : ''
                }`}
              />
            </div>
            {errors.passwordConfirm && touched.passwordConfirm ? (
              <div className={classes.error}>{errors.passwordConfirm}</div>
            ) : null}
            <div className={classes['form-actions'] + ' mt-20'}>
              <Button
                mode="secondary"
                type="button"
                onClick={resetForm}
                disabled={isLoading}
              >
                Huỷ
              </Button>
              <Button
                mode="primary"
                type="submit"
                disabled={!dirty || isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner color="#fff" borderSize="3px" size="20px" />
                ) : (
                  'Lưu'
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordProfile;
