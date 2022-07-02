import { useLocation } from 'react-router-dom';
import BookItem from './BookItem';
import classes from './BooksList.module.css';

const BooksList = props => {
  const { search } = useLocation();
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
      {filteredBooks.map(book => {
        return (
          <BookItem
            key={book._id}
            id={book._id}
            image={book.image}
            name={book.name}
            price={book.price}
            object={book}
          />
        );
      })}
    </main>
  );
};

export default BooksList;
