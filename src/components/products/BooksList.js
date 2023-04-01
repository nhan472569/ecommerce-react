import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import environment from '../../environment';
import useHttp from '../../hooks/use-http';
import { notificationAction } from '../../store/notification-context';
import { productAction } from '../../store/product-context';
import BookItem from './BookItem';
import classes from './BooksList.module.css';
import NotificationModel from '../../models/NotificationModel';

const BooksList = () => {
  const currentPage = useSelector(state => state.product.currentPage);
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
    if (!books.length) getBooks({ url: 'books' });
  }, [getBooks, books]);
  useEffect(() => {
    if (!countStore) getCount({ url: 'books/count' });
  }, [getCount, countStore]);

  useEffect(() => {
    const messages = [getBooksError, getBookCountError].filter(Boolean);
    if (messages.length > 0) {
      dispatch(
        notificationAction.push(
          messages.map(message =>
            new NotificationModel('error', message).toJSON()
          )
        )
      );
    }
  }, [getBooksError, getBookCountError, dispatch]);

  const getMoreBooks = useCallback(() => {
    if (currentPage >= Math.ceil(countStore / itemsPerPage)) return;
    const nextPage = currentPage + 1;
    getBooks({ url: `books?page=${nextPage}` });
    dispatch(productAction.setPage(nextPage));
  }, [getBooks, countStore, itemsPerPage, currentPage, dispatch]);

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
            currentPage < Math.ceil(countStore / itemsPerPage)
              ? itemsPerPage
              : countStore % itemsPerPage || itemsPerPage
          )
            .fill(0)
            .map((_, i) => <BookItem.Loading key={i}></BookItem.Loading>)}
      </div>
      {currentPage < Math.ceil(countStore / itemsPerPage) && (
        <button
          className={classes.load}
          disabled={isLoadingBooks || isGettingCount}
          onClick={getMoreBooks}
        >
          Xem thêm
          <FontAwesomeIcon icon={solid('angles-down')}></FontAwesomeIcon>
        </button>
      )}
    </main>
  );
};

export default BooksList;
