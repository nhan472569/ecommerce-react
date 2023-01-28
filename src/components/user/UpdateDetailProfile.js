import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import environment from '../../environment';
import * as Yup from 'yup';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './UpdateDetailProfile.module.css';
import { authAction } from '../../store/auth-context';

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên.'),
  email: Yup.string()
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email.'),
});

const UpdateDetailProfile = () => {
  const user = useSelector(state => state.auth.user);
  const photoRef = useRef();
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    sendRequest: updateInfo,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
        alert('Thay đổi thông tin thành công.');
      },
      [dispatch]
    )
  );

  const onSubmitHandler = async values => {
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

    await updateInfo({
      url: 'users/updateMe',
      method: 'patch',
      body: formData,
    });
  };
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
                  <LoadingSpinner color="#fff" borderSize="3px" size="20px" />
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
                  errors.name && touched.name ? classes['input-error'] : ''
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
                  errors.email && touched.email ? classes['input-error'] : ''
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
                  errors.photo && touched.photo ? classes['input-error'] : ''
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
};

export default UpdateDetailProfile;
