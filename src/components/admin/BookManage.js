import { useCallback, useEffect, useRef, useState } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './BookManage.module.css';
import BookItem from '../products/BookItem';
import Paginator from '../UI/Paginator';
import SearchFrom from '../UI/SearchForm';
import EditBook from './EditBook';

const BookManage = () => {
  const [books, setBooks] = useState([]);
  const [currentBookId, setCurrentBookId] = useState('');
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const searchInputRef = useRef();

  let content = null;

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
    if (!books.length) getBooks({ url: 'books' });
  }, [getBooks, books]);
  useEffect(() => {
    if (!totalBooks) getTotals({ url: 'books/count' });
  }, [getTotals, totalBooks]);

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

  if (isEdit) {
    content = (
      <EditBook
        id={currentBookId}
        onClick={() => {
          setIsEdit(false);
          setCurrentBookId('');
        }}
      />
    );
  } else {
    content = (
      <>
        <section className={classes['book-list']}>
          {isLoading
            ? Array(8)
                .fill(8)
                .map((_, i) => <BookItem.Loading key={i}></BookItem.Loading>)
            : books.map(book => (
                <BookItem
                  key={book._id}
                  book={book}
                  isManaged={'Y'}
                  onClick={() => {
                    setIsEdit(true);
                    setCurrentBookId(book._id);
                  }}
                ></BookItem>
              ))}
        </section>
        <Paginator
          totalItems={totalBooks}
          currentPage={currentPage}
          paginate={paginate}
        />
      </>
    );
  }

  return (
    <>
      <SearchFrom ref={searchInputRef} search={search} />
      {content}
    </>
  );
};

export default BookManage;
