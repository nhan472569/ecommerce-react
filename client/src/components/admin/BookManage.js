import { useCallback, useEffect, useRef, useState } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './BookManage.module.css';
import BookItem from '../products/BookItem';
import Paginator from '../UI/Paginator';
import SearchFrom from '../UI/SearchForm';
import EditBook from './EditBook';
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const BookManage = () => {
  const [books, setBooks] = useState([]);
  const [currentBookId, setCurrentBookId] = useState('');
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
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
    getBooks({ url: 'books' });
    getTotals({ url: 'books/count' });
    return () => {
      setBooks([]);
      setCurrentBookId('');
    };
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

  const resetBookStates = () => {
    setIsEdit(false);
    setCurrentBookId('');
    setCurrentPage(1);
    setAddNew(false);
    getBooks({ url: 'books' });
    getTotals({ url: 'books/count' });
  };

  if (isEdit) {
    content = (
      <EditBook id={currentBookId} onClose={resetBookStates} addNew={addNew} />
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
          itemPerPage={8}
          paginate={paginate}
        />
      </>
    );
  }

  return (
    <>
      <div className="d-flex flex-between">
        <SearchFrom ref={searchInputRef} search={search} />
        {!isEdit && (
          <Button
            mode="secondary"
            onClick={() => {
              setIsEdit(true);
              setAddNew(true);
            }}
          >
            Thêm sách
            <FontAwesomeIcon icon={solid('plus')} className={classes.icon} />
          </Button>
        )}
      </div>
      {content}
    </>
  );
};

export default BookManage;
