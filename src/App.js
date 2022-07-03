import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import { authAction } from './store/auth-context';
import { useDispatch } from 'react-redux';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NavBar from './components/layout/NavBar';
import BookDetail from './components/products/BookDetail';
import BooksList from './components/products/BooksList';
import Cart from './components/cart/Cart';
import LoadingSpinner from './components/UI/LoadingSpinner';
import environment from './environment';
import NotFound from './components/layout/NotFound';
import ScrollToTop from './components/UI/ScrollToTop';

function App() {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getBooksData = async () => {
      const response = await fetch(`${environment.DOMAIN}/api/products`);
      const data = await response.json();

      setLoadedBooks(data);
      setIsLoading(false);
    };
    getBooksData();

    const getUserData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${environment.DOMAIN}/api/user/info?userID=${localStorage.getItem(
          'userID'
        )}`
      );
      const data = await response.json();

      dispatch(authAction.login(data));
      setIsLoading(false);
    };
    if (localStorage.getItem('userID')) {
      getUserData();
    }
  }, [dispatch]);

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

  window.addEventListener('scroll', e => {
    const viewHeight = window.screen.height;
    if (!isShowScrollToTop && window.scrollY >= viewHeight / 2) {
      setIsShowScrollToTop(true);
    }

    if (isShowScrollToTop && window.scrollY < viewHeight / 2) {
      setIsShowScrollToTop(false);
    }
  });

  return (
    <React.Fragment>
      <ScrollToTop active={isShowScrollToTop} />
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
