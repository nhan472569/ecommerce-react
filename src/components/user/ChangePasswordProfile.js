import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import LoadingSpinner from '../UI/LoadingSpinner';
import * as Yup from 'yup';
import classes from './ChangePasswordProfile.module.css';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { useCallback } from 'react';
import { authAction } from '../../store/auth-context';

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
        alert('Thay đổi mật khẩu thành công.');
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
  return (
    <Formik
      initialValues={{
        passwordCurrent: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={onSubmitHandler}
    >
      {({ errors, touched, resetForm }) => (
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
          {error && (
            <>
              <p className={classes.error}>
                <FontAwesomeIcon
                  icon={solid('circle-exclamation')}
                  className={classes['error-icon']}
                />
                {error}
              </p>
            </>
          )}
          <div className={classes['form-actions'] + ' mt-20'}>
            <button
              type="button"
              className={classes.cancel}
              onClick={resetForm}
            >
              Huỷ
            </button>
            <button type="submit" className={classes.save}>
              {isLoading ? (
                <LoadingSpinner color="#fff" borderSize="3px" size="20px" />
              ) : (
                'Lưu'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordProfile;
