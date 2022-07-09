import React, {
  Fragment,
  useEffect,
  useState,
  Suspense,
  useCallback,
} from 'react';
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import useHttp from './hooks/use-http';

import { authAction } from './store/auth-context';
import { useDispatch } from 'react-redux';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NavBar from './components/layout/NavBar';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ScrollToTop from './components/UI/ScrollToTop';
import CategoryList from './components/products/CategoryList';

const BookDetail = React.lazy(() => import('./components/products/BookDetail'));
const BooksList = React.lazy(() => import('./components/products/BooksList'));
const Cart = React.lazy(() => import('./components/cart/Cart'));
const NotFound = React.lazy(() => import('./components/layout/NotFound'));

function App() {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const handleUserInfo = useCallback(
    data => {
      dispatch(authAction.login(data));
    },
    [dispatch]
  );
  // use http
  const {
    isLoading: isLoadingBooks,
    error: booksError,
    sendRequest: getBooks,
  } = useHttp(setLoadedBooks);

  const {
    isLoading: isLoadingUserInfo,
    error: userError,
    sendRequest: getUserInfo,
  } = useHttp(handleUserInfo);
  const {
    isLoading: isLoadingBooksByCategory,
    error: errorBooksByCategory,
    sendRequest: getBooksByCategory,
  } = useHttp(setLoadedBooks);

  useEffect(() => {
    getBooks({ url: 'products' });
    if (localStorage.getItem('userID')) {
      getUserInfo({
        url: `user/info?userID=${localStorage.getItem('userID')}`,
      });
    }
  }, [dispatch, getBooks, getUserInfo]);

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

  const scrollToTopBtn = document.querySelector('#scroll-to-top');
  const category = document.querySelector('#category');

  scrollToTopBtn?.addEventListener('click', e => {
    category.scrollIntoView({
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', e => {
    const viewHeight = window.screen.height;
    if (!isShowScrollToTop && window.scrollY >= viewHeight / 2) {
      setIsShowScrollToTop(true);
    }

    if (isShowScrollToTop && window.scrollY < viewHeight / 2) {
      setIsShowScrollToTop(false);
    }
  });

  const getProductsByCategory = category => {
    if (category === 'all') {
      getBooks({ url: 'products' });
    } else {
      getBooksByCategory({ url: `products/category/?category=${category}` });
    }
  };

  return (
    <React.Fragment>
      <ScrollToTop active={isShowScrollToTop} />
      <NavBar onLogin={onLoginHandler} onSignup={onSignupHandler} />
      {isLogin && <Login onClose={onCloseHandler} />}
      {isSignup && <Signup onClose={onCloseHandler} />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="products/:productId" element={<BookDetail />} />
          <Route
            path="products"
            element={
              <Fragment>
                <CategoryList
                  getProductsByCategory={getProductsByCategory}
                ></CategoryList>
                {isLoadingBooks ||
                isLoadingUserInfo ||
                isLoadingBooksByCategory ? (
                  <LoadingSpinner />
                ) : (
                  <BooksList
                    books={loadedBooks}
                    getProductsByCategory={getProductsByCategory}
                  />
                )}
              </Fragment>
            }
          />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
