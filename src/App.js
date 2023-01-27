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

import NavBar from './components/layout/NavBar';
import ScrollToTop from './components/UI/ScrollToTop';
import Footer from './components/layout/footer/Footer';

const Author = React.lazy(() => import('./components/author/Author'));
const Slider = React.lazy(() => import('./components/layout/slider/Slider'));
const Login = React.lazy(() => import('./components/auth/Login'));
const Signup = React.lazy(() => import('./components/auth/Signup'));
const Profile = React.lazy(() => import('./components/user/Profile'));
const Wishlist = React.lazy(() => import('./components/user/Wishlist'));
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

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleUserInfo = useCallback(
    data => {
      dispatch(authAction.login(data.data.data));
    },
    [dispatch]
  );
  // use http
  const loadBookHandler = useCallback(
    data => {
      const bookList = data.data.data;
      setLoadedBooks(bookList);
      dispatch(
        productAction.fillProduct({
          items: bookList,
        })
      );
    },
    [dispatch]
  );
  const { isLoading: isLoadingBooks, sendRequest: getBooks } =
    useHttp(loadBookHandler);

  const { sendRequest: getUserInfo } = useHttp(handleUserInfo);

  useEffect(() => {
    getUserInfo({ url: 'users/me', method: 'post' });
    getBooks({ url: 'books' });
  }, [dispatch, getBooks, getUserInfo]);

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

          <Route path="cart" element={<Cart />} />
          <Route path="author/:authorId" element={<Author />} />
          <Route
            path="home"
            element={
              <Fragment>
                <Slider />
                <BooksList books={loadedBooks} isLoading={isLoadingBooks} />
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
    (type === 'protect' && Object.keys(user).length === 0)
  ) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default App;
