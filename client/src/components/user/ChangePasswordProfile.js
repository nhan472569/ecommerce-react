import { Form, Formik } from 'formik';
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
import FormControl from '../UI/FormControl';

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
            <FormControl
              type="password"
              name="passwordCurrent"
              errors={errors}
              touched={touched}
            >
              Mật khẩu hiện tại
            </FormControl>
            <FormControl
              type="password"
              name="password"
              errors={errors}
              touched={touched}
            >
              Mật khẩu mới
            </FormControl>
            <FormControl
              type="password"
              name="passwordConfirm"
              errors={errors}
              touched={touched}
            >
              Nhập lại mật khẩu mới
            </FormControl>
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
                  <LoadingSpinner
                    color="var(--color-white)"
                    borderSize="3px"
                    size="20px"
                  />
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
