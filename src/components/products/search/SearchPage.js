import classes from './SearchPage.module.css';
import useHttp from '../../../hooks/use-http';
import { useEffect, useState } from 'react';
import BooksList from '../BooksList';
import { useLocation } from 'react-router';

const SearchPage = () => {
  const { search } = useLocation();
  const [books, setBooks] = useState([]);

  const query = new URLSearchParams(search);
  const searchValue = query.get('name');
  console.log(search, query, searchValue);

  const { isLoading, sendRequest: getBooks } = useHttp(setBooks);
  useEffect(() => {
    getBooks({ url: `books/?name=${searchValue}` });
  }, [getBooks, searchValue]);
  return (
    <div className="container">
      <h2 className={classes.header}>Kết quả tìm kiếm cho: {searchValue}</h2>
      {isLoading ? null : <BooksList books={books} />}
    </div>
  );
};

export default SearchPage;
