import { useCallback, useEffect, useRef, useState } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './BookManage.module.css';
import BookItem from '../products/BookItem';
import Paginator from '../UI/Paginator';
import SearchFrom from '../UI/SearchForm';

const BookManage = () => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef();

  const { isLoading, sendRequest: getBooks } = useHttp(
    useCallback(
      data => {
        setBooks(data.data.data);
      },
      [setBooks]
    )
  );
  const { sendRequest: getTotals } = useHttp(
    useCallback(
      data => {
        setTotalBooks(data.data.data);
      },
      [setTotalBooks]
    )
  );

  useEffect(() => {
    getBooks({ url: 'books' });
    getTotals({ url: 'books/count' });
  }, [getBooks, getTotals]);

  const search = event => {
    event.preventDefault();
    let searchName = searchInputRef.current.value;
    if (searchName.trim()) {
      getBooks({ url: `books/?name=${searchName}` });
      return;
    }
    getBooks({ url: 'books' });
  };

  const paginate = page => {
    if (page === currentPage) return;
    setCurrentPage(page);
    getBooks({ url: `books/?page=${page}` });
  };

  return (
    <>
      <SearchFrom ref={searchInputRef} search={search} />
      <section className={classes['book-list']}>
        {isLoading
          ? Array(8)
              .fill(8)
              .map((_, i) => <BookItem.Loading key={i}></BookItem.Loading>)
          : books.map(book => (
              <BookItem key={book._id} book={book} isManaged={true}></BookItem>
            ))}
      </section>
      <Paginator
        totalItems={totalBooks}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default BookManage;
