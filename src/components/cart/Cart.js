import { useSelector } from 'react-redux';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  const cart = useSelector(state => state.cart);
  const total = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="container">
      <h1 className={classes.title}>Giỏ hàng</h1>
      <table className={classes.table}>
        <thead>
          <tr className={classes.head}>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(item => (
            <CartItem
              key={item._id}
              productId={item._id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              imageCover={item.imageCover}
            />
          ))}
        </tbody>
      </table>
      <div className={classes.summary}>
        <div className={classes.total}>
          <span>Tổng thanh toán ({quantity} sản phẩm): </span>
          <span>{total.toLocaleString('vi-VN')} ₫</span>
        </div>
        <button className={classes.checkout}>Thanh toán</button>
      </div>
    </div>
  );
};

export default Cart;
