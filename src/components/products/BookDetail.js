import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { cartAction } from '../../store/cart-context';
import CommentBox from '../comments/CommentBox';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './BookDetail.module.css';
import useHttp from '../../hooks/use-http';
import RatingStars from '../UI/RatingStars';
import environment from '../../environment';

const BookDetail = props => {
  const [quantity, setQuantity] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [loadedBookDetail, setLoadedBookDetail] = useState({
    _id: '',
    image: '',
    name: '',
    price: 0,
    description: '',
    category: [],
    authors: [],
  });

  const dispatch = useDispatch();

  const params = useParams();
  const { slug } = params;

  const { isLoading, sendRequest: getBookDetail } =
    useHttp(setLoadedBookDetail);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    getBookDetail({ url: `slug/books/${slug}` });
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
    dispatch(cartAction.addItem({ ...loadedBookDetail, quantity }));
  };

  const splitParagragh = description => {
    return description.split('/n');
  };

  const detailContent = (
    <>
      <div className={classes.image}>
        <img
          src={environment.DOMAIN + '/img/books/' + loadedBookDetail.imageCover}
          alt={loadedBookDetail.name}
        ></img>
      </div>
      <div className={classes.content}>
        <div className={classes.author}>
          {loadedBookDetail.authors.map(a => {
            return (
              <Link to={`/author/${a._id}`} key={a._id}>
                {a.name}
              </Link>
            );
          })}
        </div>
        <h2 className={classes.title}>{loadedBookDetail.name}</h2>
        <RatingStars
          ratingAverage={loadedBookDetail.ratingsAverage}
          ratingCount={loadedBookDetail.ratingsQuantity}
        />
        <p className={classes.price}>{`${loadedBookDetail.price.toLocaleString(
          'vi-VN'
        )}₫`}</p>
        <p className={classes.description}>
          {splitParagragh(loadedBookDetail.description).map((paragraph, i) => (
            <p className={classes.paragraph} key={i}>
              {paragraph}
            </p>
          ))}
        </p>
        <hr />
        <form className={classes['add-to-cart']} onSubmit={addToCartHandler}>
          <div className={classes.quantity}>
            <span
              className={`${classes.btn} ${classes['btn-quantity-left']}`}
              type="button"
              onClick={decreaseHandler}
              disabled={isInvalid}
            ></span>
            <input type="text" name="quantity" id="quantity" value={quantity} />
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
      </div>
    </>
  );

  return (
    <>
      <section className={classes.container}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && detailContent}
      </section>
      {!isLoading && <CommentBox productId={slug} />}
    </>
  );
};

export default BookDetail;
