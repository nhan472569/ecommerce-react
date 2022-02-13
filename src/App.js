import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NavBar from './components/layout/NavBar';
import BookDetail from './components/products/BookDetail';
import BooksList from './components/products/BooksList';
import Cart from './components/cart/Cart';
import LoadingSpinner from './components/UI/LoadingSpinner';
import NotFound from './components/layout/NotFound';

function App() {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

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

  const onLoginHandler = () => {
    setIsLogin(true);
  };

  const onSignupHandler = () => {
    setIsSignup(true);
  };

  const onCloseHandler = () => {
    isLogin && setIsLogin(false);
    isSignup && setIsSignup(false);
  };

  return (
    <React.Fragment>
      <NavBar onLogin={onLoginHandler} onSignup={onSignupHandler} />
      {isLogin && <Login onClose={onCloseHandler} />}
      {isSignup && <Signup onClose={onCloseHandler} />}
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
        />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
