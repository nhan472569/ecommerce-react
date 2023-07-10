import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import environment from '../../environment';
import classes from './Cart.module.css';
import CartItem from '../cart/CartItem';
import CartSummary from '../cart/CartSummary';

const Cart = () => {
  const cart = useSelector(state => state.cart);

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  useEffect(
    () => (document.title = `Giỏ hàng | ${environment.HEAD_TITLE} `),
    []
  );
  const emptyCart = (
    <div className="container">
      <h2 className={classes['title-empty']}>Giỏ hàng của bạn đang trống.</h2>
      <div className={classes['empty-img']}>
        <img
          src={process.env.PUBLIC_URL + '/images/empty-state-cart.jpg'}
          alt="empty cart icon"
        ></img>
      </div>
      <div className={classes['btn-group']}>
        <Link className={`${classes.btn} ${classes.wishlist}`} to="/wishlist">
          Danh sách yêu thích
        </Link>
        <Link className={`${classes.btn} ${classes.home}`} to="/home">
          Trang chủ
        </Link>
      </div>
    </div>
  );
  return (
    <>
      {cart.items.length === 0 ? (
        emptyCart
      ) : (
        <div className={`container flex-between ${classes.container}`}>
          <div className={classes.cart}>
            <h2 className={classes.title}>Giỏ hàng</h2>
            {cart.items.map(item => (
              <CartItem
                key={item._id}
                productId={item._id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                imageCover={item.imageCover}
                slug={item.slug}
              />
            ))}
          </div>
          <CartSummary subtotal={subtotal} />
        </div>
      )}
    </>
  );
};

export default Cart;
