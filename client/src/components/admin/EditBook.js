import classes from './EditBook.module.css';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import FormControl from '../UI/FormControl';
import Button from '../UI/Button';
import ImageEdit from '../UI/ImageEdit';
import SkeletonLoading from '../UI/loading/SkeletonLoading';
import { notificationAction } from '../../store/notification-context';
import { useDispatch } from 'react-redux';
import NotificationModel from '../../models/NotificationModel';

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().trim().required('Vui lòng nhập tên.'),
  price: Yup.number().required('Vui lòng nhập giá'),
  summary: Yup.string().trim(),
  description: Yup.string().trim().required('Vui lòng nhập mô tả'),
});

const imageKeys = ['image1', 'image2', 'image3'];

const EditBook = ({ id, addNew, onClose }) => {
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

  const dispatch = useDispatch();

  const setBookDetail = useCallback(data => {
    setBook(data.data.data);
  }, []);
  const updateBookDetail = useCallback(
    data => {
      setBook(data.data.data);
      dispatch(
        notificationAction.push(
          new NotificationModel(
            'success',
            'Cập nhật thông tin sách thành công'
          ).toJSON()
        )
      );
    },
    [dispatch]
  );
  const handleCreateBookRequest = useCallback(
    data => {
      dispatch(
        notificationAction.push(
          new NotificationModel('success', 'Thêm sách mới thành công').toJSON()
        )
      );
      onClose();
    },
    [dispatch, onClose]
  );
  const handleDeleteBookRequest = useCallback(
    data => {
      dispatch(
        notificationAction.push(
          new NotificationModel('success', 'Xoá sách thành công').toJSON()
        )
      );
      onClose();
    },
    [dispatch, onClose]
  );

  const {
    isLoading: isGettingBook,
    sendRequest: getBook,
    error: getBookError,
  } = useHttp(setBookDetail);

  const {
    isLoading,
    sendRequest: updateBook,
    error: updateBookError,
  } = useHttp(updateBookDetail);

  const {
    isLoading: isCreating,
    sendRequest: createBook,
    error: createBookError,
  } = useHttp(handleCreateBookRequest);

  const {
    isLoading: isDeleting,
    sendRequest: deleteBook,
    error: deleteBookError,
  } = useHttp(handleDeleteBookRequest);

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
    if (values.imageCover) {
      formData.append('imageCover', values.imageCover, values.imageCover.name);
    }
    if (values.image1 || values.image2 || values.image3) {
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

    if (addNew) {
      await createBook({
        url: 'books',
        method: 'post',
        body: formData,
      });
      return;
    }
    await updateBook({
      url: 'books/' + book._id,
      method: 'patch',
      body: formData,
    });
  };

  useEffect(() => {
    const messages = [
      getBookError,
      updateBookError,
      createBookError,
      deleteBookError,
    ].filter(Boolean);

    if (messages.length > 0) {
      dispatch(
        notificationAction.push(
          messages.map(message =>
            new NotificationModel('error', message).toJSON()
          )
        )
      );
    }
  }, [
    getBookError,
    updateBookError,
    createBookError,
    deleteBookError,
    dispatch,
  ]);

  const deleteBookHandler = () => {
    const wannaDeleteBook = window.confirm(
      'Are you sure you want to delete this book?'
    );
    wannaDeleteBook &&
      deleteBook({
        url: 'books/' + book._id,
        method: 'delete',
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
            imageCover: '',
            image1: '',
            image2: '',
            image3: '',
            category: book.category,
            authors: book.authors,
          }}
          validationSchema={UpdateInfoSchema}
          onSubmit={onSubmitHandler}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue, dirty }) => (
            <Form>
              <ImageEdit
                alt={book.name}
                filename={book.imageCover}
                for="imageCover"
                width={400}
                height={600}
                onChange={event => {
                  setFieldValue('imageCover', event.currentTarget.files[0]);
                }}
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
              <div className={classes.actions}>
                {!addNew && (
                  <Button
                    mode="secondary"
                    type="button"
                    onClick={deleteBookHandler}
                  >
                    Xoá sách
                  </Button>
                )}
                <Button mode="secondary" type="button" onClick={onClose}>
                  Quay về
                </Button>
                <Button
                  mode="primary"
                  type="submit"
                  disabled={!dirty || isLoading || isCreating || isDeleting}
                >
                  {isLoading || isCreating || isDeleting ? (
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
