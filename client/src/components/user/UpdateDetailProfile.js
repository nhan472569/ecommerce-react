import { Form, Formik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './UpdateDetailProfile.module.css';
import { authAction } from '../../store/auth-context';
import Button from '../UI/Button';
import FormControl from '../UI/FormControl';
import ImageEdit from '../UI/ImageEdit';
import { notificationAction } from '../../store/notification-context';
import NotificationModel from '../../models/NotificationModel';

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên.'),
  email: Yup.string()
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email.'),
});

const photoStyle = {
  position: 'absolute',
  width: '10rem',
  height: '10rem',
  borderRadius: '100rem',
  outline: '4px solid var(--color-white)',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  marginBottom: '4rem',
  left: '5rem',
  bottom: '-4rem',
};

const UpdateDetailProfile = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    sendRequest: updateInfo,
  } = useHttp(
    useCallback(
      data => {
        dispatch(authAction.login(data.data.data));
        dispatch(
          notificationAction.push(
            new NotificationModel(
              'success',
              'Thay đổi thông tin thành công'
            ).toJSON()
          )
        );
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
      if (
        JSON.stringify(values[key]).trim() === JSON.stringify(user[key]).trim()
      )
        return;
      formData.append(key, value);
    });
    if (values.photo) {
      formData.append('photo', values.photo, values.photo.name);
    }

    await updateInfo({
      url: 'users/updateMe',
      method: 'patch',
      body: formData,
    });
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
          name: user.name,
          email: user.email,
          photo: '',
        }}
        validationSchema={UpdateInfoSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
      >
        {({ errors, touched, resetForm, setFieldValue, dirty }) => (
          <Form className={classes['profile-form']}>
            <div className={classes.images}>
              <img
                className={classes.cover}
                srcSet={`
                  ${process.env.PUBLIC_URL}/images/user-cover-small.jpg 1x,
                  ${process.env.PUBLIC_URL}/images/user-cover-large.jpg 2x
                 `}
                src={`${process.env.PUBLIC_URL}/images/user-cover-large.jpg`}
                alt="user cover"
              />
              <ImageEdit
                alt={user.name}
                filename={user.photo}
                width={200}
                height={200}
                for="photo"
                style={photoStyle}
                onChange={event => {
                  setFieldValue('photo', event.currentTarget.files[0]);
                }}
              />
            </div>
            <FormControl
              type="text"
              name="name"
              errors={errors}
              touched={touched}
            >
              Tên
            </FormControl>
            <FormControl
              type="text"
              name="email"
              errors={errors}
              touched={touched}
            >
              Email
            </FormControl>
            <div className={classes['form-actions']}>
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

export default UpdateDetailProfile;
