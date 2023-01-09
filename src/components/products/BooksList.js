import { useEffect } from 'react';
import environment from '../../environment';
import BookItem from './BookItem';
import classes from './BooksList.module.css';

const BooksList = ({ books, isLoading }) => {
  useEffect(() => {
    document.title = environment.HEAD_TITLE;
  }, []);

  return (
    <main className={classes.container}>
      <div className={classes.section}>
        {isLoading
          ? Array(8)
              .fill(0)
              .map((item, i) => <BookItem.Loading key={i}></BookItem.Loading>)
          : books.map(book => {
              return <BookItem key={book._id} book={book} />;
            })}
      </div>
    </main>
  );
};

export default BooksList;
