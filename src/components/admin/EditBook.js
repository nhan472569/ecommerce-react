import classes from './EditBook.module.css';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import useHttp from '../../hooks/use-http';
import FormControl from '../UI/FormControl';
import Button from '../UI/Button';
import environment from '../../environment';
import ImageEdit from '../UI/ImageEdit';

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().trim().required('Vui lòng nhập tên.'),
  price: Yup.number().required('Vui lòng nhập giá'),
  summary: Yup.string().trim(),
  description: Yup.string().trim().required('Vui lòng nhập mô tả'),
});

const EditBook = ({ id, onClick }) => {
  const [book, setBook] = useState({
    _id: '',
    name: '',
    price: '',
    summary: '',
    description: '',
    imageCover: '',
    images: [],
    category: [],
    authors: [],
  });
  const imageCoverRef = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();

  const handleBookDetail = useCallback(data => {
    setBook(data.data.data);
  }, []);

  const { sendRequest: getBook } = useHttp(handleBookDetail);
  const {
    isLoading,
    sendRequest: updateBook,
    error,
  } = useHttp(handleBookDetail);

  useEffect(() => {
    getBook({ url: `books/${id}` });
    return () => {
      setBook({});
    };
  }, [getBook, id]);

  const onSubmitHandler = async values => {
    let formData = new FormData();
    console.log(Object.entries(values));
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'imageCover') {
        return;
      }
      if (JSON.stringify(values[key]) === JSON.stringify(book[key])) return;
      formData.append(key, value);
    });
    if (values.imageCover) {
      formData.append('imageCover', values.imageCover, values.imageCover.name);
      imageCoverRef.current.value = '';
    }

    await updateBook({
      url: 'books/' + book._id,
      method: 'patch',
      body: formData,
    });
  };
  return (
    <div className={classes.containter}>
      <Formik
        initialValues={{
          _id: book._id,
          name: book.name,
          price: book.price,
          summary: book.summary,
          description: book.description,
          imageCover: book.imageCover,
          images: book.images,
          category: book.category,
          authors: book.authors,
        }}
        validationSchema={UpdateInfoSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={classes['profile-form']}>
            <ImageEdit
              alt={book.name}
              path={environment.DOMAIN + '/img/books/'}
              image={book.imageCover}
              for="imageCover"
              onChange={event => {
                setFieldValue('imageCover', event.currentTarget.files[0]);
              }}
              ref={imageCoverRef}
            />
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
            <div className={classes.actions}>
              <Button mode="secondary" type="button" onClick={onClick}>
                Quay về
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
