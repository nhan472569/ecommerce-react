import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { cartAction } from '../../store/cart-context';
import CommentBox from '../comments/CommentBox';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './BookDetail.module.css';

const BookDetail = props => {
  const [quantity, setQuantity] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [loadedBookDetail, setLoadedBookDetail] = useState({
    _id: '',
    image: '',
    name: '',
    price: 0,
    description: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    const getBookDetail = async () => {
      const response = await fetch(
        `https://do-an-nganh-nodejs.herokuapp.com/api/products/detail/${productId}`
      );
      const data = await response.json();
      setLoadedBookDetail(data);
      setIsLoading(false);
    };
    getBookDetail();
  }, [productId]);

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

  const detailContent = (
    <>
      <div className={classes.image}>
        <img src={loadedBookDetail.image} alt={loadedBookDetail.name}></img>
      </div>
      <div className={classes.content}>
        <h1 className={classes.title}>{loadedBookDetail.name}</h1>
        <p className={classes.price}>{`${loadedBookDetail.price.toLocaleString(
          'vi-VN'
        )}₫`}</p>
        <p className={classes.description}>{loadedBookDetail.description}</p>
        <form className={classes['add-to-cart']} onSubmit={addToCartHandler}>
          <div className={classes.control}>
            <label htmlFor="quantity">Nhập số lượng:</label>
            <button
              className={`${classes.btn} ${classes['btn-quantity']}`}
              type="button"
              onClick={decreaseHandler}
              disabled={isInvalid}
            >
              -
            </button>
            <input type="text" name="quantity" id="quantity" value={quantity} />
            <button
              className={`${classes.btn} ${classes['btn-quantity']}`}
              type="button"
              onClick={increaseHandler}
            >
              +
            </button>
          </div>
          <div className={classes.actions}>
            <button className={`${classes.btn} ${classes['btn-submit']}`}>
              Thêm vào giỏ hàng
            </button>
          </div>
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
      {!isLoading && <CommentBox productId={productId} />}
    </>
  );
};

export default BookDetail;
