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
import { productAction } from './store/product-context';
import { useDispatch, useSelector } from 'react-redux';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NavBar from './components/layout/NavBar';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ScrollToTop from './components/UI/ScrollToTop';
import CategoryList from './components/products/CategoryList';
import Author from './components/author/Author';
import Slider from './components/layout/slider/Slider';
import Footer from './components/layout/footer/Footer';

const BookDetail = React.lazy(() => import('./components/products/BookDetail'));
const BooksList = React.lazy(() => import('./components/products/BooksList'));
const SearchPage = React.lazy(() =>
  import('./components/products/search/SearchPage')
);
const Cart = React.lazy(() => import('./components/cart/Cart'));
const NotFound = React.lazy(() => import('./components/layout/NotFound'));

function App() {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const products = useSelector(state => state.product);

  const dispatch = useDispatch();

  const handleUserInfo = useCallback(
    data => {
      dispatch(authAction.login(data));
    },
    [dispatch]
  );
  // use http
  const loadBookHandler = useCallback(
    data => {
      setLoadedBooks(data);
      dispatch(
        productAction.fillProduct({
          items: data,
        })
      );
    },
    [dispatch]
  );
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
  } = useHttp(loadBookHandler);

  useEffect(() => {
    getBooks({ url: 'books' });
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
    if (products.items?.[category]) {
      setLoadedBooks(products.items?.[category]);
    } else {
      if (category === 'all') {
        dispatch(productAction.setCategory('all'));
        getBooksByCategory({ url: 'books' });
      } else {
        dispatch(productAction.setCategory(category));
        getBooksByCategory({ url: `books?category=${category}` });
      }
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
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="books/:slug" element={<BookDetail />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="author/:authorId" element={<Author />} />
          <Route
            path="home"
            element={
              <Fragment>
                <Slider />
                {/* <CategoryList
                  getProductsByCategory={getProductsByCategory}
                ></CategoryList> */}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default App;
