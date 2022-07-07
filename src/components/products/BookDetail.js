import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { cartAction } from '../../store/cart-context';
import CommentBox from '../comments/CommentBox';
import LoadingSpinner from '../UI/LoadingSpinner';
import environment from '../../environment';
import classes from './BookDetail.module.css';
import axios from 'axios';

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
    author: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    const getBookDetail = async () => {
      const response = await axios.get(
        `${environment.DOMAIN}/api/products/detail/${productId}`
      );
      const data = await response.data;
      console.log('data nè', data);
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
        <div className={classes.author}>
          <Link to={'/products'}>{loadedBookDetail.author.join(', ')}</Link>
        </div>
        <h2 className={classes.title}>{loadedBookDetail.name}</h2>
        <p className={classes.price}>{`${loadedBookDetail.price.toLocaleString(
          'vi-VN'
        )}₫`}</p>
        <p className={classes.description}>{loadedBookDetail.description}</p>
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
          <button className={`${classes.btn} ${classes['btn-submit']}`}>
            Thêm vào giỏ hàng
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
      {!isLoading && <CommentBox productId={productId} />}
    </>
  );
};

export default BookDetail;
