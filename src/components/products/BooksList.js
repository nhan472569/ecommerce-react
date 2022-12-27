import { useEffect } from 'react';
import BookItem from './BookItem';
import classes from './BooksList.module.css';

const BooksList = ({ books }) => {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className={classes.container}>
      <div className={classes.section}>
        {books.map(book => {
          return <BookItem key={book._id} book={book} />;
        })}
      </div>
    </main>
  );
};

export default BooksList;
