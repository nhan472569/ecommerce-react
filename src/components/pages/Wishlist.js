import { useCallback, useEffect, useState } from 'react';
import classes from './Wishlist.module.css';
import useHttp from '../../hooks/use-http';
import environment from '../../environment';
import { notificationAction } from '../../store/notification-context';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import NotificationModel from '../../models/NotificationModel';
import BookItem from '../products/BookItem';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const setWishlistHandler = useCallback(data => {
    setWishlist(data.data.data);
  }, []);
  const {
    isLoading,
    sendRequest: getList,
    error,
  } = useHttp(setWishlistHandler);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error)
      dispatch(
        notificationAction.push(new NotificationModel('error', error).toJSON())
      );
  }, [error, dispatch]);

  useEffect(() => {
    document.title = `Danh sách yêu thích | ${environment.HEAD_TITLE}`;
    getList({ url: 'favors' });
  }, [getList]);

  return (
    <div className="container">
      <h1 className={classes.title}>Danh sách yêu thích</h1>
      <div className={classes.wishlist}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          wishlist?.map((book, i) => (
            <BookItem key={i} book={book} isOnWishlist={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
