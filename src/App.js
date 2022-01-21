import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import BookDetail from './components/products/BookDetail';
import BooksList from './components/products/BooksList';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBooksData = async () => {
      const response = await fetch(
        'https://do-an-nganh-nodejs.herokuapp.com/api/products'
      );
      const data = await response.json();

      setLoadedBooks(data);
      setIsLoading(false);
    };
    getBooksData();
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="products/:productId" element={<BookDetail />} />
        <Route
          path="products"
          element={
            <Fragment>
              {isLoading && <LoadingSpinner />}
              <BooksList books={loadedBooks} />
            </Fragment>
          }
        ></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
