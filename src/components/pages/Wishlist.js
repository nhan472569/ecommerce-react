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
  const dispatch = useDispatch();

  const setWishlistHandler = useCallback(data => {
    setWishlist(data.data.data?.[0]?.books);
  }, []);

  const removeWishlistHandler = useCallback(() => {
    dispatch(
      notificationAction.push(
        new NotificationModel(
          'success',
          'Xoá khỏi danh sách yêu thích thành công.'
        ).toJSON()
      )
    );
  }, [dispatch]);

  const {
    isLoading,
    sendRequest: getList,
    error,
  } = useHttp(setWishlistHandler);

  const { sendRequest: removeFromWishlist, error: removeError } = useHttp(
    removeWishlistHandler
  );

  useEffect(() => {
    const messages = [error, removeError].filter(Boolean);
    if (messages.length) {
      dispatch(
        notificationAction.push(
          messages.map(message =>
            new NotificationModel('error', message).toJSON()
          )
        )
      );
    }
  }, [error, removeError, dispatch]);

  useEffect(() => {
    document.title = `Danh sách yêu thích | ${environment.HEAD_TITLE}`;
    getList({ url: 'favors' });
  }, [getList]);

  const removeFromWishlistHandler = async bookId => {
    await removeFromWishlist({
      url: `books/${bookId}/favors/`,
      method: 'delete',
    });
    setWishlist(prev => {
      return prev.filter(item => item._id !== bookId);
    });
  };

  return (
    <div className="container">
      <h1 className={classes.title}>Danh sách yêu thích</h1>
      <div className={classes.wishlist}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          wishlist?.map((book, i) => (
            <BookItem
              key={book._id}
              book={book}
              isOnWishlist={true}
              removeFromWishlist={() => {
                removeFromWishlistHandler(book._id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
