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
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './components/layout/nav/NavBar';
import ScrollToTop from './components/UI/ScrollToTop';
import Footer from './components/layout/footer/Footer';
import Notification from './components/UI/Notification';

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
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleUserInfo = useCallback(
    data => {
      dispatch(authAction.login(data.data.data));
    },
    [dispatch]
  );
  //* API calls
  const { sendRequest: getUserInfo } = useHttp(handleUserInfo);

  useEffect(() => {
    getUserInfo({ url: 'users/me', method: 'get' });
  }, [getUserInfo]);

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
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      if (document.querySelector('#navbar:hover')) return;
      const currentScrollPos = window.pageYOffset;
      const noticationElList = document.querySelectorAll(
        '[data-type="notification"]'
      );

      if (prevScrollpos > currentScrollPos) {
        document.getElementById('navbar').style.top = '0';
        if (noticationElList.length) {
          noticationElList.forEach(el => {
            el.style.top = '10rem';
          });
        }
      } else {
        document.getElementById('navbar').style.top = '-8rem';
        if (noticationElList.length) {
          noticationElList.forEach(el => {
            el.style.top = '2rem';
          });
        }
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <React.Fragment>
      <Notification.Container />
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
                <BooksList />
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
