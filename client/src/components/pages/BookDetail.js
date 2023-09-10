import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import CommentBox from '../comments/CommentBox';
import classes from './BookDetail.module.css';
import useHttp from '../../hooks/use-http';
import RatingStars from '../UI/RatingStars';
import environment from '../../environment';
import SkeletonLoading from '../UI/loading/SkeletonLoading';
import { notificationAction } from '../../store/notification-context';
import NotificationModel from '../../models/NotificationModel';
import { AdvancedImage } from '@cloudinary/react';
import createUrl from '../../common/utils/cloudinary-utils';
import useCart from '../../hooks/use-cart';

const BookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [loadedBookDetail, setLoadedBookDetail] = useState({
    _id: '',
    imageCover: '',
    images: [],
    name: '',
    price: 0,
    description: '',
    category: [],
    authors: [],
  });
  const { role } = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { slug } = params;

  const handleBookDetail = useCallback(data => {
    setLoadedBookDetail(data.data.data);
  }, []);

  const {
    isLoading,
    sendRequest: getBookDetail,
    error,
  } = useHttp(handleBookDetail);

  const { createCartItem } = useCart();

  useEffect(() => {
    document.title = `${loadedBookDetail.name} | ${environment.HEAD_TITLE}`;
  }, [loadedBookDetail.name]);

  useEffect(() => {
    if (error) {
      dispatch(
        notificationAction.push(new NotificationModel('error', error).toJSON())
      );
      navigate('/not-found');
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    if (slug) {
      getBookDetail({ url: `slug/books/${slug}` });
    }
    return () => {
      setLoadedBookDetail({});
    };
  }, [getBookDetail, slug]);

  const decreaseHandler = () => {
    if (quantity === 1) {
      setIsInvalid(true);
      return;
    }

    setQuantity(prevQuantity => prevQuantity - 1);
  };

  const increaseHandler = () => {
    if (quantity === 1) {
      setIsInvalid(false);
    }
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const addToCartHandler = e => {
    e.preventDefault();
    createCartItem(loadedBookDetail._id, quantity);
  };

  const splitParagragh = description => {
    return description?.split('/n');
  };

  const detailContent = (
    <>
      <div className={classes.image}>
        <div className={classes.cover}>
          {loadedBookDetail.imageCover && (
            <AdvancedImage
              cldImg={createUrl(loadedBookDetail.imageCover, 400, 600)}
              alt={loadedBookDetail.name}
            />
          )}
        </div>
      </div>
      <div className={classes.content}>
        {/* <div className={classes.author}>
          {loadedBookDetail?.authors?.map(a => {
            return (
              <Link to={`/author/${a._id}`} key={a._id}>
                {a.name}
              </Link>
            );
          })}
        </div> */}
        <h2 className={classes.title}>{loadedBookDetail.name}</h2>
        <RatingStars
          ratingAverage={loadedBookDetail.ratingsAverage}
          ratingCount={loadedBookDetail.ratingsQuantity}
        />
        <p
          className={classes.price}
        >{`${loadedBookDetail?.price?.toLocaleString('vi-VN')}₫`}</p>
        <div className={classes.description}>
          {splitParagragh(loadedBookDetail.description).map((paragraph, i) => (
            <p className={classes.paragraph} key={i}>
              {paragraph}
            </p>
          ))}
        </div>
        {role !== 'admin' && (
          <>
            <hr />
            <form
              className={classes['add-to-cart']}
              onSubmit={addToCartHandler}
            >
              <div className={classes.quantity}>
                <span
                  className={`${classes.btn} ${classes['btn-quantity-left']}`}
                  type="button"
                  onClick={decreaseHandler}
                  disabled={isInvalid}
                ></span>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  readOnly
                />
                <span
                  className={`${classes.btn} ${classes['btn-quantity-right']}`}
                  type="button"
                  onClick={increaseHandler}
                ></span>
              </div>
              <button
                className={`${classes.btn} ${classes['btn-buy']}`}
                type="button"
              >
                Mua ngay
              </button>
              <button className={`${classes.btn} ${classes['btn-add']}`}>
                Thêm vào giỏ
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      <section className={classes.container}>
        {isLoading && <Loading />}
        {!isLoading && detailContent}
      </section>
      {isLoading ? (
        <CommentBox.Loading />
      ) : (
        <CommentBox
          productId={loadedBookDetail._id}
          ratingAverage={loadedBookDetail.ratingsAverage}
          ratingCount={loadedBookDetail.ratingsQuantity}
        />
      )}
    </>
  );
};

const Loading = () => {
  return (
    <>
      <div className={classes.image}>
        <SkeletonLoading className="w-full h-full radius" />
      </div>
      <div className={classes.content}>
        <div className={classes.author}>
          <SkeletonLoading className="w-half h-17 radius" />
        </div>
        <SkeletonLoading className="w-half h-17 mb-10 radius" />
        <SkeletonLoading className="w-third h-17 mb-10 radius" />
        <SkeletonLoading className="w-third h-17 mb-10 radius" />
        <SkeletonLoading className="w-full h-200 mb-10 radius" />
        <hr />
        <form className={classes['add-to-cart']}>
          <SkeletonLoading className="w-third h-30 mb-10 radius" />
          <SkeletonLoading className="w-third h-30 d-inline mr-20 radius" />
          <SkeletonLoading className="w-third h-30 d-inline radius" />
        </form>
      </div>
    </>
  );
};

export default BookDetail;
