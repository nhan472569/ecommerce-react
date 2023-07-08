import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './CartSummary.module.css';

const CartSummary = props => {
  const { subtotal } = props;
  const [deliveryType, setDeliveryType] = useState({
    free: true,
    express: false,
  });
  const [appliedCoupon, setAppliedCoupon] = useState('');
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
      setAppliedCoupon(enteredCoupon);
      couponRef.current.value = '';
    }
  };
  const removeCoupon = () => {
    setAppliedCoupon('');
  };
  const calcTax = subtotal * 0.1;
  const calcDiscount = subtotal * (coupon[appliedCoupon] || 0);
  const total =
    subtotal +
    deliveryCost[`${deliveryType.free ? 'free' : 'express'}`] +
    calcTax -
    calcDiscount;

  return (
    <div className={classes.bill}>
      <p className={classes['bill-title']}>Đơn hàng</p>
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
      {appliedCoupon && (
        <div className={classes.coupon}>
          Áp dụng thành công mã {appliedCoupon} cho đơn hàng
          <span onClick={removeCoupon}>X</span>
        </div>
      )}
      <hr></hr>
      <div className="row flex-between mb-05">
        <span className={classes['text-gray']}>Tạm tính</span>
        <span className={classes['text-gray']}>
          {subtotal.toLocaleString('vi-VN')} ₫
        </span>
      </div>
      {appliedCoupon && (
        <div className="row flex-between mb-05">
          <span className={classes['text-light-gray']}>Giảm giá</span>
          <span className={classes['text-light-gray']}>
            - {calcDiscount.toLocaleString('vi-VN')} ₫
          </span>
        </div>
      )}
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
        <span className={classes['text-light-gray']}>VAT(10%)</span>
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
      <Link className={classes.continue} to="/home">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
};

export default CartSummary;
