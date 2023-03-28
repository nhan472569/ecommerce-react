import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import environment from '../../environment';
import useHttp from '../../hooks/use-http';
import { notificationAction } from '../../store/notification-context';
import { productAction } from '../../store/product-context';
import BookItem from './BookItem';
import classes from './BooksList.module.css';
import NotificationModel from '../../models/NotificationModel';

const BooksList = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const itemsPerPage = useSelector(state => state.product.itemsPerPage);
  const books = useSelector(state => state.product.books);
  const countStore = useSelector(state => state.product.count);

  const dispatch = useDispatch();

  const loadBookHandler = useCallback(
    data => {
      const bookList = data.data.data;
      dispatch(productAction.fill([...books, ...bookList]));
    },
    [dispatch, books]
  );
  const updateProductCount = useCallback(
    data => {
      const count = data.data.data;
      setCount(count);
      dispatch(productAction.setCount(count));
    },
    [dispatch]
  );

  const {
    isLoading: isLoadingBooks,
    sendRequest: getBooks,
    error: getBooksError,
  } = useHttp(loadBookHandler);
  const {
    isLoading: isGettingCount,
    sendRequest: getCount,
    error: getBookCountError,
  } = useHttp(updateProductCount);

  useEffect(() => {
    if (!countStore) getBooks({ url: 'books' });
    if (!books.length) getCount({ url: 'books/count' });
  }, [getBooks, getCount, countStore, books]);

  useEffect(() => {
    const messages = [getBooksError, getBookCountError].filter(Boolean);
    dispatch(
      notificationAction.push(
        messages.map(message =>
          new NotificationModel('error', message).toJSON()
        )
      )
    );
  }, [getBooksError, getBookCountError, dispatch]);

  const getMoreBooks = useCallback(() => {
    setPage(page => {
      const nextPage = page + 1;
      if (page >= Math.ceil(count / itemsPerPage)) return page;
      getBooks({ url: `books?page=${nextPage}` });
      return nextPage;
    });
  }, [getBooks, count, itemsPerPage]);

  useEffect(() => {
    document.title = environment.HEAD_TITLE;
  }, []);

  return (
    <main className={classes.container}>
      <div className={classes.section}>
        {(!isLoadingBooks || !isGettingCount) &&
          !!books.length &&
          books.map(book => {
            return <BookItem key={book._id} book={book} />;
          })}
        {(isLoadingBooks || isGettingCount) &&
          Array(
            page < Math.ceil(countStore / itemsPerPage)
              ? itemsPerPage
              : countStore % itemsPerPage || itemsPerPage
          )
            .fill(0)
            .map((_, i) => <BookItem.Loading key={i}></BookItem.Loading>)}
      </div>
      {page < Math.ceil(countStore / itemsPerPage) && (
        <button
          className={classes.load}
          disabled={isLoadingBooks || isGettingCount}
          onClick={getMoreBooks}
        >
          Tải thêm
          <FontAwesomeIcon icon={solid('angles-down')}></FontAwesomeIcon>
        </button>
      )}
    </main>
  );
};

export default BooksList;
