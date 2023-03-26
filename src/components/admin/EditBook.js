import classes from './EditBook.module.css';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import useHttp from '../../hooks/use-http';
import FormControl from '../UI/FormControl';
import Button from '../UI/Button';
import environment from '../../environment';
import ImageEdit from '../UI/ImageEdit';
import SkeletonLoading from '../UI/loading/SkeletonLoading';

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().trim().required('Vui lòng nhập tên.'),
  price: Yup.number().required('Vui lòng nhập giá'),
  summary: Yup.string().trim(),
  description: Yup.string().trim().required('Vui lòng nhập mô tả'),
});

const imageKeys = ['image1', 'image2', 'image3'];

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

  const handleBookDetail = useCallback(data => {
    setBook(data.data.data);
  }, []);

  const { isLoading: isGettingBook, sendRequest: getBook } =
    useHttp(handleBookDetail);
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
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'imageCover' || imageKeys.includes(key)) {
        return;
      }
      if (JSON.stringify(values[key]) === JSON.stringify(book[key])) return;
      formData.append(key, value);
    });

    //* Images processing
    if (values.imageCover && values.imageCover !== book.imageCover) {
      formData.append('imageCover', values.imageCover, values.imageCover.name);
    }
    if (JSON.stringify(values.images) !== JSON.stringify(book.images)) {
      imageKeys.forEach((imgKey, i) => {
        if (values[imgKey] === book.images[i]) return;

        formData.append(
          'images',
          values[imgKey],
          values[imgKey].name + `-${values[imgKey].order}`
        );
      });
    }
    //* End images process

    await updateBook({
      url: 'books/' + book._id,
      method: 'patch',
      body: formData,
    });
  };

  return (
    <div className={classes.containter}>
      {isGettingBook ? (
        <LoadingSpinner />
      ) : (
        <Formik
          initialValues={{
            _id: book._id,
            name: book.name,
            price: book.price,
            summary: book.summary,
            description: book.description,
            imageCover: book.imageCover,
            image1: book.images[0],
            image2: book.images[1],
            image3: book.images[2],
            category: book.category,
            authors: book.authors,
          }}
          validationSchema={UpdateInfoSchema}
          onSubmit={onSubmitHandler}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <ImageEdit
                alt={book.name}
                path={environment.DOMAIN + '/img/books/'}
                image={book.imageCover}
                for="imageCover"
                onChange={event => {
                  setFieldValue('imageCover', event.currentTarget.files[0]);
                }}
              />
              <div className={classes.images}>
                <ImageEdit
                  alt={book.name}
                  path={environment.DOMAIN + '/img/books/'}
                  image={book.images[0]}
                  for="images"
                  onChange={event => {
                    event.currentTarget.files[0].order = 1;
                    setFieldValue('image1', event.currentTarget.files[0]);
                  }}
                  size="small"
                />
                <ImageEdit
                  alt={book.name}
                  path={environment.DOMAIN + '/img/books/'}
                  image={book.images[1]}
                  for="images"
                  onChange={event => {
                    event.currentTarget.files[0].order = 2;
                    setFieldValue('image2', event.currentTarget.files[0]);
                  }}
                  size="small"
                />
                <ImageEdit
                  alt={book.name}
                  path={environment.DOMAIN + '/img/books/'}
                  image={book.images[2]}
                  for="images"
                  onChange={event => {
                    event.currentTarget.files[0].order = 3;
                    setFieldValue('image3', event.currentTarget.files[0]);
                  }}
                  size="small"
                />
              </div>
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
      )}
    </div>
  );
};

const Loading = () => {
  return (
    <div className={classes.containter}>
      <div>
        <Form>
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <div className={classes.actions}>
            <SkeletonLoading />
            <SkeletonLoading />
          </div>
        </Form>
      </div>
    </div>
  );
};
EditBook.Loading = Loading;

export default EditBook;
