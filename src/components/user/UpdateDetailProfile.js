import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import environment from '../../environment';
import * as Yup from 'yup';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './UpdateDetailProfile.module.css';
import { authAction } from '../../store/auth-context';
import Button from '../UI/Button';
import FormControl from '../UI/FormControl';
import ImageEdit from '../UI/ImageEdit';

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
  outline: '4px solid #fff',
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
                src={`${process.env.PUBLIC_URL}/images/user-cover.jpg`}
                alt="user cover"
              />
              <ImageEdit
                alt={user.name}
                path={environment.DOMAIN + '/img/users/'}
                image={user.photo}
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

export default UpdateDetailProfile;
