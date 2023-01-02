import classes from './SearchPage.module.css';
import useHttp from '../../../hooks/use-http';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { useLocation } from 'react-router';
import BookItem from '../BookItem';
import environment from '../../../environment';

const SearchPage = () => {
  const { search } = useLocation();
  const [books, setBooks] = useState([]);

  const query = new URLSearchParams(search);
  const searchValue = query.get('name');

  const { isLoading, sendRequest: getBooks } = useHttp(setBooks);
  useEffect(
    () =>
      (document.title = `${searchValue} - Kết quả tìm kiếm | ${environment.HEAD_TITLE}`),
    [searchValue]
  );
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

  return (
    <div className="container">
      <h2 className={classes.header}>
        {`${
          books.length === 0
            ? 'Không tìm thấy kết quả cho'
            : 'Kết quả tìm kiếm cho'
        }: "${searchValue}"`}
      </h2>
      {isLoading ? <LoadingSpinner /> : result}
    </div>
  );
};

export default SearchPage;
