import classes from './EditBook.module.css';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useParams } from 'react-router';
import useHttp from '../../hooks/use-http';
import FormControl from '../UI/FormControl';
import Button from '../UI/Button';

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên.'),
  email: Yup.string()
    .email('Email không hợp lệ.')
    .required('Vui lòng nhập email.'),
});
const EditBook = props => {
  const [book, setBook] = useState({
    _id: '',
    name: '',
    price: '',
    summary: '',
    description: '',
    imageCover: '',
    images: [],
    catagory: [],
    authors: [],
  });
  const photo1Ref = useRef();
  const photo2Ref = useRef();
  const photo3Ref = useRef();
  const photo4Ref = useRef();

  const params = useParams();
  const { slug } = params;

  const handleBookDetail = useCallback(data => {
    setBook(data.data.data);
  }, []);

  const { isLoading, sendRequest: getBook, error } = useHttp(handleBookDetail);
  useEffect(() => {
    getBook({ url: `slug/books/${slug}` });
    return () => {
      setBook({});
    };
  }, [getBook, slug]);

  const onSubmitHandler = e => {};
  return (
    <div className="container">
      <Formik
        initialValues={{
          name: book.name,
          price: book.price,
          summary: book.summary,
          description: book.description,
          imageCover: book.imageCover,
          images: book.images,
          catagory: book.catagory,
          authors: book.authors,
        }}
        validationSchema={UpdateInfoSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
      >
        {({ errors, touched, resetForm, setFieldValue }) => (
          <Form className={classes['profile-form']}>
            <FormControl
              type="text"
              name="name"
              errors={errors}
              touched={touched}
            >
              Tên sách
            </FormControl>
            <FormControl
              type="text"
              name="price"
              errors={errors}
              touched={touched}
            >
              Giá
            </FormControl>
            <FormControl
              as="textarea"
              name="summary"
              errors={errors}
              touched={touched}
            >
              Tóm tắt
            </FormControl>
            <FormControl
              as="textarea"
              name="description"
              errors={errors}
              touched={touched}
            >
              Mô tả
            </FormControl>
            {/* <div className={classes['form-control']}>
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
                ref={photo1Ref}
                className={`${classes.input} ${
                  errors.photo && touched.photo ? classes['input-error'] : ''
                }`}
              />
            </div> */}
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
            <div className="mt-20">
              <Button
                mode="secondary"
                type="button"
                onClick={resetForm}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button mode="primary" type="submit" disabled={isLoading}>
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
    </div>
  );
};

export default EditBook;
