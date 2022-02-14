import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './CartButton.module.css';

const CartButton = () => {
  const cart = useSelector(state => state.cart);
  const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={classes.cart}>
      <Link to="/cart">
        <i class="fas fa-shopping-cart"></i>

        <span className={classes.quantity}>{quantity}</span>
        {/* <span className={classes.total}>
          {cart.total.toLocaleString('vi-VN')}₫
        </span> */}
      </Link>
    </div>
  );
};

export default CartButton;
