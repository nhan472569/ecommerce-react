import { useSelector } from 'react-redux';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  const cart = useSelector(state => state.cart);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(Date.now());
  const total = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="container flex-between">
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
      <div className={classes.bill}>
        <p className={classes['bill-title']}>Giao hàng</p>
        <span className={classes['delivery-select']}>
          <span>Miễn phí</span>
          <span>Giao nhanh: {(29000).toLocaleString('vi-VN')} ₫</span>
        </span>
        <p className={classes['text-gray']}>
          Ngày giao hàng: {date.toLocaleString('vi-VN', options)}
        </p>
        <hr></hr>
        <form className={classes['discount-form']}>
          <input
            typeof="text"
            placeholder="Mã khuyến mãi"
            name="discount"
            id="discount"
            required
          ></input>
          <button type="submit">Áp dụng</button>
        </form>
        <hr></hr>
        <div className="row flex-between mb-05">
          <span className={classes['text-gray']}>Tạm tính</span>
          <span className={classes['text-gray']}>
            {total.toLocaleString('vi-VN')} ₫
          </span>
        </div>
        <div className="row flex-between mb-05">
          <span className={classes['text-light-gray']}>Giảm giá</span>
          <span className={classes['text-light-gray']}>-0 ₫</span>
        </div>
        <div className="row flex-between mb-05">
          <span className={classes['text-light-gray']}>Phí giao hàng</span>
          <span className={classes['text-light-gray']}>0 ₫</span>
        </div>
        <div className="row flex-between mb-05">
          <span className={classes['text-light-gray']}>Thuế</span>
          <span className={classes['text-light-gray']}>+0 ₫</span>
        </div>
        <hr></hr>
        <div className="row flex-between mb-05">
          <span className={classes['text-gray']}>Tổng cộng</span>
          <span className={classes['text-black']}>
            {total.toLocaleString('vi-VN')} ₫
          </span>
        </div>
        <button className={classes.checkout}>Thanh toán</button>
        <button className={classes.continue}>Tiếp tục mua sắm</button>
      </div>
    </div>
  );
};

export default Cart;
