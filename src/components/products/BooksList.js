import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookItem from './BookItem';
import classes from './BooksList.module.css';

const BooksList = props => {
  const { search } = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, []);

  const query = new URLSearchParams(search);
  const searchValue = query.get('search');

  let filteredBooks = [];
  if (searchValue) {
    filteredBooks = props.books.filter(book =>
      book.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(filteredBooks);
  } else {
    filteredBooks = props.books;
  }

  return (
    <main className={classes.container}>
      <div className={classes.section}>
        {filteredBooks.map(book => {
          return (
            <BookItem
              key={book._id}
              id={book._id}
              imageCover={book.imageCover}
              name={book.name}
              price={book.price}
              category={book.category}
              authors={book.authors}
              object={book}
              slug={book.slug}
            />
          );
        })}
      </div>
    </main>
  );
};

export default BooksList;
