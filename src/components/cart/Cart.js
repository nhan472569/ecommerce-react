import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const [deliveryType, setDeliveryType] = useState({
    free: true,
    express: false,
  });
  const [discountRate, setDiscountRate] = useState(0);
  const couponRef = useRef();
  const deliveryCost = {
    free: 0,
    express: 29000,
  };
  const deliveryDay = {
    free: 3,
    express: 1,
  };
  const coupon = {
    NHANDEPTRAI: 0.1,
  };
  const cart = useSelector(state => state.cart);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const calcDeliveryDate =
    Date.now() +
    deliveryDay[`${deliveryType.free ? 'free' : 'express'}`] *
      24 *
      60 *
      60 *
      1000;
  const date = new Date(calcDeliveryDate);

  const selectDeliveryType = type => {
    const origin = { free: false, express: false };
    setDeliveryType({ ...origin, [type]: true });
  };

  const applyCoupon = e => {
    e.preventDefault();
    const enteredCoupon = couponRef.current.value;
    if (coupon[enteredCoupon]) {
      setDiscountRate(coupon[enteredCoupon]);
      couponRef.current.value = '';
    }
  };
  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const calcTax = subtotal * 0.02;
  const calcDiscount = subtotal * discountRate;
  const total =
    subtotal +
    deliveryCost[`${deliveryType.free ? 'free' : 'express'}`] +
    calcTax -
    calcDiscount;
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
          <span
            className={deliveryType.free ? classes.active : undefined}
            onClick={() => selectDeliveryType('free')}
          >
            Miễn phí
          </span>
          <span
            className={deliveryType.express ? classes.active : undefined}
            onClick={() => selectDeliveryType('express')}
          >
            Giao nhanh: {deliveryCost.express.toLocaleString('vi-VN')} ₫
          </span>
        </span>
        <p className={classes['text-light-gray']}>
          Ngày giao hàng: {date.toLocaleString('vi-VN', options)}
        </p>
        <hr></hr>
        <form className={classes['discount-form']} onSubmit={applyCoupon}>
          <input
            typeof="text"
            placeholder="Mã khuyến mãi"
            name="discount"
            id="discount"
            required
            ref={couponRef}
          ></input>
          <button type="submit">Áp dụng</button>
        </form>
        <hr></hr>
        <div className="row flex-between mb-05">
          <span className={classes['text-gray']}>Tạm tính</span>
          <span className={classes['text-gray']}>
            {subtotal.toLocaleString('vi-VN')} ₫
          </span>
        </div>
        <div className="row flex-between mb-05">
          <span className={classes['text-light-gray']}>Giảm giá</span>
          <span className={classes['text-light-gray']}>
            - {calcDiscount.toLocaleString('vi-VN')} ₫
          </span>
        </div>
        <div className="row flex-between mb-05">
          <span className={classes['text-light-gray']}>Phí giao hàng</span>
          <span className={classes['text-light-gray']}>
            {deliveryCost[
              `${deliveryType.free ? 'free' : 'express'}`
            ].toLocaleString('vi-VN')}{' '}
            ₫
          </span>
        </div>
        <div className="row flex-between mb-05">
          <span className={classes['text-light-gray']}>Thuế</span>
          <span className={classes['text-light-gray']}>
            {calcTax.toLocaleString('vi-VN')} ₫
          </span>
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
