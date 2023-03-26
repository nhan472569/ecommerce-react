import React, {
  Fragment,
  useEffect,
  useState,
  Suspense,
  useCallback,
} from 'react';
import { Outlet, Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import useHttp from './hooks/use-http';

import { authAction } from './store/auth-context';
import { productAction } from './store/product-context';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './components/layout/nav/NavBar';
import ScrollToTop from './components/UI/ScrollToTop';
import Footer from './components/layout/footer/Footer';
import Alert from './components/UI/Alert';

const Author = React.lazy(() => import('./components/pages/Author'));
const Slider = React.lazy(() => import('./components/layout/slider/Slider'));
const Login = React.lazy(() => import('./components/pages/Login'));
const Signup = React.lazy(() => import('./components/pages/Signup'));
const Profile = React.lazy(() => import('./components/pages/Profile'));
const Wishlist = React.lazy(() => import('./components/pages/Wishlist'));
const BookDetail = React.lazy(() => import('./components/pages/BookDetail'));
const BooksList = React.lazy(() => import('./components/products/BooksList'));
const SearchPage = React.lazy(() => import('./components/pages/SearchPage'));
const Cart = React.lazy(() => import('./components/pages/Cart'));
const NotFound = React.lazy(() => import('./components/pages/NotFound'));

function App() {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.auth.user);
  const itemsPerPage = useSelector(state => state.product.itemsPerPage);
  const dispatch = useDispatch();

  const handleUserInfo = useCallback(
    data => {
      dispatch(authAction.login(data.data.data));
    },
    [dispatch]
  );
  // use http
  const loadBookHandler = useCallback(data => {
    const bookList = data.data.data;
    setLoadedBooks(prev => [...prev, ...bookList]);
  }, []);
  const updateProductCount = useCallback(
    data => {
      const count = data.data.data;
      setCount(count);
      dispatch(productAction.setCount(count));
    },
    [dispatch]
  );
  const {
    isLoading: isLoadingBooks,
    sendRequest: getBooks,
    error: getBooksError,
  } = useHttp(loadBookHandler);
  const {
    isLoading: isGettingCount,
    sendRequest: getCount,
    error: getBookCountError,
  } = useHttp(updateProductCount);

  const { sendRequest: getUserInfo, error: getUserError } =
    useHttp(handleUserInfo);

  useEffect(() => {
    window.addEventListener('scroll', e => {
      const viewHeight = window.screen.height;
      if (!isShowScrollToTop && window.scrollY >= viewHeight / 2) {
        setIsShowScrollToTop(true);
      }

      if (isShowScrollToTop && window.scrollY < viewHeight / 2) {
        setIsShowScrollToTop(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', e => {
        const viewHeight = window.screen.height;
        if (!isShowScrollToTop && window.scrollY >= viewHeight / 2) {
          setIsShowScrollToTop(true);
        }

        if (isShowScrollToTop && window.scrollY < viewHeight / 2) {
          setIsShowScrollToTop(false);
        }
      });
    };
  });

  useEffect(() => {
    getUserInfo({ url: 'users/me', method: 'get' });
    getBooks({ url: 'books' });
    getCount({ url: 'books/count' });
  }, [getBooks, getUserInfo, getCount]);

  const getMoreBooks = useCallback(() => {
    setPage(page => {
      const nextPage = page + 1;
      if (page >= Math.ceil(count / itemsPerPage)) return page;
      getBooks({ url: `books?page=${nextPage}` });
      return nextPage;
    });
  }, [getBooks, count, itemsPerPage]);

  useEffect(() => {
    setErrors([getBooksError, getBookCountError, getUserError].filter(Boolean));
  }, [getBooksError, getBookCountError, getUserError]);

  const closeAlert = index => {
    setErrors(prev => {
      const errors = [...prev];
      errors.splice(index, 1);
      return errors;
    });
  };
  return (
    <React.Fragment>
      {!!errors.length &&
        errors.map((error, i) => (
          <Alert key={i} type="error" onClose={() => closeAlert(i)}>
            {error}
          </Alert>
        ))}
      <ScrollToTop active={isShowScrollToTop} />
      <NavBar />
      <Suspense fallback={<div className="container"></div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="books/:slug" element={<BookDetail />} />
          <Route path="search" element={<SearchPage />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute user={user} type="protect" />}>
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/wishlist" element={<Wishlist />} />
          </Route>
          <Route
            element={<ProtectedRoute user={user} type="protect" role="admin" />}
          >
            <Route path="admin/manage" element={<Profile manager={true} />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="author/:authorId" element={<Author />} />
          <Route
            path="home"
            element={
              <Fragment>
                <Slider />
                <BooksList
                  books={loadedBooks}
                  isLoading={isLoadingBooks || isGettingCount}
                  getMoreBooks={getMoreBooks}
                  currentPage={page}
                />
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

const ProtectedRoute = ({
  user,
  redirectPath = '/home',
  children,
  role = 'user',
  type,
}) => {
  if (
    (type !== 'protect' && Object.keys(user).length !== 0) ||
    (type === 'protect' && Object.keys(user).length === 0) ||
    (role === 'admin' && Object.keys(user).length !== 0 && user.role !== role)
  ) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default App;
