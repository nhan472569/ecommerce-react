import classes from './SearchPage.module.css';
import useHttp from '../../hooks/use-http';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useLocation } from 'react-router';
import BookItem from '../products/BookItem';
import environment from '../../environment';
import Notification from '../UI/Notification';

const SearchPage = () => {
  const { search } = useLocation();
  const [books, setBooks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const query = new URLSearchParams(search);
  const searchValue = query.get('name');

  const {
    isLoading,
    sendRequest: getBooks,
    error,
  } = useHttp(
    useCallback(data => {
      setBooks(data.data.data);
    }, [])
  );
  useEffect(() => {
    document.title = `${searchValue} - Kết quả tìm kiếm | ${environment.HEAD_TITLE}`;
    return () => {
      setBooks([]);
    };
  }, [searchValue]);
  useEffect(() => {
    getBooks({ url: `books/?name=${searchValue}` });
  }, [getBooks, searchValue]);

  const fallback = (
    <div className={classes.fallback}>
      <img
        src={process.env.PUBLIC_URL + '/images/no-results.jpg'}
        alt="no search result"
        className={classes['no-result-img']}
      />
    </div>
  );
  const result =
    books.length > 0 ? (
      <div className="d-flex flex-wrap">
        {books.map(book => (
          <BookItem key={book._id} book={book} />
        ))}
      </div>
    ) : (
      fallback
    );

  useEffect(() => {
    if (error) setShowNotification(true);
  }, [error]);

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="container">
      {error && showNotification && (
        <Notification type="error" onClose={closeNotification}>
          {error}
        </Notification>
      )}
      <h2 className={classes.header}>
        {`${
          books.length === 0
            ? 'Không tìm thấy kết quả cho'
            : 'Kết quả tìm kiếm cho'
        }: "${searchValue}"`}
      </h2>
      <div style={{ minHeight: '30rem' }}>
        {isLoading ? <LoadingSpinner /> : result}
      </div>
    </div>
  );
};

export default SearchPage;
