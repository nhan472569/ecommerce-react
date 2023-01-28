import { useCallback, useEffect, useRef, useState } from 'react';
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
});

const ChangePasswordSchema = Yup.object().shape({
  passwordCurrent: Yup.string().required('Vui lòng nhập mật khẩu hiện tại.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu mới.'),
  passwordConfirm: Yup.string().required('Vui lòng nhập lại mật khẩu mới.'),
});

const Profile = () => {
  const [activeTab, setActiveTab] = useState('details');
  const user = useSelector(state => state.auth.user);
  const photoRef = useRef();
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    sendRequest: updateUser,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
      },
      [dispatch]
    )
  );
  useEffect(() => {
    document.title = `Trang thông tin cá nhân | ${environment.HEAD_TITLE}`;
  });
  const onSubmitHandler = async (values, { resetForm }) => {
    let formData = new FormData();
    console.log(Object.entries(values));
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'photo') {
        return;
      }
      formData.append(key, value);
    });
    if (values.photo) {
      formData.append('photo', values.photo, values.photo.name);
      photoRef.current.value = '';
    }

    await updateUser({
      url: `users/${activeTab === 'details' ? 'updateMe' : 'updateMyPassword'}`,
      method: 'patch',
      body: formData,
    });
    activeTab === 'password' && resetForm();
  };
  const renderTemplate = () => {
    switch (activeTab) {
      case 'details':
      default:
        return (
          <>
            <div className={classes.images}>
              <img
                className={classes.cover}
                src={`${process.env.PUBLIC_URL}/images/user-cover.jpg`}
                alt="user cover"
              />
              <img
                className={classes.photo}
                src={`${environment.DOMAIN}/img/users/${user.photo}`}
                alt={user.name}
              />
            </div>
            <Formik
              initialValues={{
                name: user.name,
                email: user.email,
                photo: '',
              }}
              validationSchema={UpdateInfoSchema}
              onSubmit={onSubmitHandler}
              enableReinitialize
            >
              {({ errors, touched, resetForm, setFieldValue }) => (
                <Form className={classes['profile-form']}>
                  <div className={classes['form-actions']}>
                    <button
                      type="button"
                      className={classes.cancel}
                      onClick={resetForm}
                      disabled={isLoading}
                    >
                      Huỷ
                    </button>
                    <button
                      type="submit"
                      className={classes.save}
                      disabled={isLoading}
                    >
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
                      Tên
                    </label>
                    <Field
                      name="name"
                      type="name"
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
                  <div className={classes['form-control']}>
                    <label htmlFor="photo" className={classes.label}>
                      Ảnh đại diện
                    </label>
                    <input
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={event => {
                        setFieldValue('photo', event.currentTarget.files[0]);
                      }}
                      ref={photoRef}
                      className={`${classes.input} ${
                        errors.photo && touched.photo
                          ? classes['input-error']
                          : ''
                      }`}
                    />
                  </div>
                  {errors.photo && touched.photo ? (
                    <div className={classes.error}>{errors.photo}</div>
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
                    Nhập lại mật khẩu
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
              </Form>
            )}
          </Formik>
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
        {/* <div
          className={`${classes['menu-item']} ${
            activeTab === 'orders' ? classes.active : ''
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Đơn hàng đã mua
        </div> */}
      </div>
      <div className={classes['main-section']}>{renderTemplate()}</div>
    </div>
  );
};

export default Profile;
