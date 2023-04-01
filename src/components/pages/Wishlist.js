import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import environment from '../../environment';
import { notificationAction } from '../../store/notification-context';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import NotificationModel from '../../models/NotificationModel';

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
    dispatch(notificationAction.push(new NotificationModel('error', error)));
  }, [error, dispatch]);

  useEffect(() => {
    document.title = `Danh sách yêu thích | ${environment.HEAD_TITLE}`;
    getList({ url: 'wishlist' });
  }, [getList]);

  return (
    <div className="container">
      {isLoading ? <LoadingSpinner /> : <p>wishlist</p>}
    </div>
  );
};

export default Wishlist;
