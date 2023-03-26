import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import environment from '../../environment';
import Alert from '../UI/Alert';
import BookItem from './BookItem';
import classes from './BooksList.module.css';

const BooksList = ({ books, isLoading, getMoreBooks, currentPage }) => {
  const itemsPerPage = useSelector(state => state.product.itemsPerPage);
  const count = useSelector(state => state.product.count);

  useEffect(() => {
    document.title = environment.HEAD_TITLE;
  }, []);

  return (
    <main className={classes.container}>
      {/* <Alert type="error">Noi dung</Alert> */}
      <div className={classes.section}>
        {isLoading &&
          books.length &&
          Array(
            currentPage < Math.ceil(count / itemsPerPage)
              ? itemsPerPage
              : count % itemsPerPage || itemsPerPage
          )
            .fill(0)
            .map((item, i) => <BookItem.Loading key={i}></BookItem.Loading>)}
        {(!isLoading &&
          books.length &&
          books.map(book => {
            return <BookItem key={book._id} book={book} />;
          })) ||
          ''}
      </div>
      {currentPage < Math.ceil(count / itemsPerPage) && (
        <button
          className={classes.load}
          disabled={isLoading}
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
