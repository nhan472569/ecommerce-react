import { Link } from 'react-router-dom';
import classes from './BookItem.module.css';

import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';
import RatingStars from '../UI/RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import SkeletonLoading from '../UI/loading/SkeletonLoading';
import { AdvancedImage } from '@cloudinary/react';
import createUrl from '../../common/utils/cloudinary-utils';
import useHttp from '../../hooks/use-http';
import { useCallback, useEffect } from 'react';
import { notificationAction } from '../../store/notification-context';
import NotificationModel from '../../models/NotificationModel';

const BookItem = ({ book, isManaged, onClick, isOnWishlist }) => {
  const {
    _id,
    name,
    ratingsAverage,
    ratingsQuantity,
    price,
    imageCover,
    authors = [],
    slug,
  } = book;

  const dispatch = useDispatch();
  const setWishlistHandler = useCallback(() => {
    dispatch(
      notificationAction.push(
        isOnWishlist
          ? new NotificationModel(
              'success',
              'Xoá khỏi danh sách yêu thích thành công.'
            ).toJSON()
          : new NotificationModel(
              'success',
              'Thêm vào danh sách yêu thích thành công.'
            ).toJSON()
      )
    );
  }, [dispatch, isOnWishlist]);
  const { sendRequest: addToWishlist, error: addError } =
    useHttp(setWishlistHandler);
  const { sendRequest: removeFromWishlist, error: removeError } =
    useHttp(setWishlistHandler);

  const addToCart = e => {
    e.preventDefault();
    dispatch(cartAction.addItem({ ...book, quantity: 1 }));
  };

  useEffect(() => {
    const messages = [addError, removeError].filter(Boolean);
    if (messages.length)
      dispatch(
        notificationAction.push(
          messages.map(message =>
            new NotificationModel('error', message).toJSON()
          )
        )
      );
  }, [addError, removeError, dispatch]);

  return (
    <>
      <div className={classes.item}>
        <div className={classes.image}>
          <Link to={`/books/${slug}`} title={name}>
            <AdvancedImage
              cldImg={createUrl(imageCover, 300, 450)}
              alt={name}
            />
          </Link>
          {!isManaged && (
            <div
              className={`${classes['add-to-wishlist']} ${
                isOnWishlist ? classes.active : ''
              }`}
              title="Thêm vào danh sách yêu thích"
              onClick={() => {
                if (isOnWishlist) {
                  return removeFromWishlist({
                    url: `books/${_id}/favors/`,
                    method: 'delete',
                  });
                }
                return addToWishlist({
                  url: `books/${_id}/favors/`,
                  method: 'post',
                });
              }}
            >
              <FontAwesomeIcon
                icon={regular('heart')}
                className={classes.icon}
              ></FontAwesomeIcon>
            </div>
          )}
        </div>
        <div className={classes.content}>
          <div className={classes.author}>
            {authors.map(a => {
              return (
                <Link to={`/author/${a._id}`} key={a._id}>
                  {a.name}
                </Link>
              );
            })}
          </div>
          <h2 className={classes.title}>
            <Link to={`/books/${slug}`} title={name}>
              {name}
            </Link>
          </h2>
          <p className={classes.price}>{`${price.toLocaleString('vi-VN')}₫`}</p>
          <RatingStars
            ratingAverage={ratingsAverage}
            ratingCount={ratingsQuantity}
          />
          {!isManaged && (
            <button className={classes['add-to-cart']} onClick={addToCart}>
              Thêm vào giỏ
            </button>
          )}
        </div>
        {isManaged && (
          <div
            className={classes.backdrop}
            title="edit"
            onClick={onClick}
          ></div>
        )}
      </div>
    </>
  );
};

const Loading = () => {
  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <SkeletonLoading className="w-full h-full radius" />
      </div>
      <div className={classes.content}>
        <SkeletonLoading className="w-full h-17 mb-10 radius" />
        <SkeletonLoading className="w-full h-17 mb-10 radius" />
        <SkeletonLoading className="w-fourth h-15 mb-10 radius" />
        <SkeletonLoading className="w-third h-15 mb-10 radius" />
        <SkeletonLoading className="w-half h-30 radius" />
      </div>
    </div>
  );
};
BookItem.Loading = Loading;

export default BookItem;
