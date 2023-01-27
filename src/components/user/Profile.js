import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import environment from '../../environment';
import useHttp from '../../hooks/use-http';
import { authAction } from '../../store/auth-context';
import classes from './Profile.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import LoadingSpinner from '../UI/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên.'),
  email: Yup.string()
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email.'),
  // password: Yup.string().required('Vui lòng nhập mật khẩu.'),
  // passwordConfirm: Yup.string().required('Vui lòng nhập lại mật khẩu.'),
});

const Profile = () => {
  const [activeTab, setActiveTab] = useState('details');
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    sendRequest: updateInfo,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.user));
      },
      [dispatch]
    )
  );
  useEffect(() => {
    document.title = `Trang thông tin cá nhân | ${environment.HEAD_TITLE}`;
  });
  const onSubmitHandler = async values => {
    console.log('submitted');
    await updateInfo({
      url: 'users/updateMe',
      method: 'patch',
      body: values,
    });
  };
  const renderTemplate = () => {
    switch (activeTab) {
      case 'details':
      default:
        return (
          <>
            <img
              className={classes.photo}
              src={`${environment.DOMAIN}/img/users/${user.photo}`}
              alt={user.name}
            ></img>
            <Formik
              initialValues={{
                name: user.name,
                email: user.email,
              }}
              validationSchema={UpdateInfoSchema}
              onSubmit={onSubmitHandler}
              enableReinitialize
            >
              {({ errors, touched, resetForm }) => (
                <Form className={classes['profile-form']}>
                  <div className={classes['form-actions']}>
                    <button
                      type="button"
                      className={classes.cancel}
                      onClick={resetForm}
                    >
                      Huỷ
                    </button>
                    <button type="submit" className={classes.save}>
                      {isLoading ? (
                        <LoadingSpinner
                          color="#fff"
                          borderSize="3px"
                          size="20px"
                        />
                      ) : (
                        'Lưu'
                      )}
                    </button>
                  </div>
                  <div className={classes['form-control']}>
                    <label htmlFor="name" className={classes.label}>
                      Name
                    </label>
                    <Field
                      name="name"
                      type="name"
                      placeholder=" "
                      className={`${classes.input} ${
                        errors.name && touched.name
                          ? classes['input-error']
                          : ''
                      }`}
                    />
                  </div>
                  {errors.name && touched.name ? (
                    <div className={classes.error}>{errors.name}</div>
                  ) : null}
                  <div className={classes['form-control']}>
                    <label htmlFor="email" className={classes.label}>
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder=" "
                      className={`${classes.input} ${
                        errors.email && touched.email
                          ? classes['input-error']
                          : ''
                      }`}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div className={classes.error}>{errors.email}</div>
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
                </Form>
              )}
            </Formik>
          </>
        );
      case 'password':
        return (
          <form className={classes['profile-form']} onSubmit={onSubmitHandler}>
            <div className={classes['form-control']}>
              <label htmlFor="password" className={classes.label}>
                Mật khẩu hiện tại
              </label>
              <input
                className={classes.input}
                id="password"
                name="password"
              ></input>
            </div>
            <div className={classes['form-control']}>
              <label htmlFor="newPassword" className={classes.label}>
                Đặt lại mật khẩu
              </label>
              <input
                className={classes.input}
                id="newPassword"
                name="newPassword"
              ></input>
            </div>
            <div className={classes['form-actions']}>
              <button type="button" className={classes.cancel}>
                Huỷ
              </button>
              <button type="submit" className={classes.save}>
                Lưu
              </button>
            </div>
          </form>
        );
      case 'orders':
        return;
    }
  };
  return (
    <div className={classes.profile + ' container'}>
      <div className={classes['right-menu']}>
        <div
          className={`${classes['menu-item']} ${
            activeTab === 'details' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('details')}
        >
          Thông tin tài khoản
        </div>
        <div
          className={`${classes['menu-item']} ${
            activeTab === 'password' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('password')}
        >
          Thay đổi mật khẩu
        </div>
        <div
          className={`${classes['menu-item']} ${
            activeTab === 'orders' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Đơn hàng đã mua
        </div>
      </div>
      <div className={classes['main-section']}>{renderTemplate()}</div>
    </div>
  );
};

export default Profile;
