import { Field, Form, Formik } from 'formik';
import LoadingSpinner from '../UI/LoadingSpinner';
import * as Yup from 'yup';
import classes from './ChangePasswordProfile.module.css';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { useCallback, useEffect, useState } from 'react';
import { authAction } from '../../store/auth-context';
import Notification from '../UI/Notification';
import Button from '../UI/Button';

const ChangePasswordSchema = Yup.object().shape({
  passwordCurrent: Yup.string().required('Vui lòng nhập mật khẩu hiện tại.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu mới.'),
  passwordConfirm: Yup.string().required('Vui lòng nhập lại mật khẩu mới.'),
});

const ChangePasswordProfile = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [updateSuccessfully, setUpdateSuccessfully] = useState(false);

  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    sendRequest: changePassword,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
        setUpdateSuccessfully(true);
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
    if (error || updateSuccessfully) setShowNotification(true);
  }, [error, updateSuccessfully]);

  const closeNotification = () => {
    setShowNotification(false);
    if (updateSuccessfully) {
      setUpdateSuccessfully(false);
    }
  };

  return (
    <>
      {error && showNotification && (
        <Notification type="error" onClose={closeNotification}>
          {error}
        </Notification>
      )}
      {updateSuccessfully && showNotification && (
        <Notification type="success" onClose={closeNotification}>
          Thay đổi thông tin thành công
        </Notification>
      )}
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
