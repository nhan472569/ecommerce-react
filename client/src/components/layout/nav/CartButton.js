import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './CartButton.module.css';

const CartButton = () => {
  const cart = useSelector(state => state.cart);
  const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={classes.cart} title="Xem giỏ hàng">
      <Link to="/cart">
        <FontAwesomeIcon
          icon={solid('cart-shopping')}
          className={classes.icon}
        />
        <span className={classes.quantity}>{quantity}</span>
      </Link>
    </div>
  );
};

export default CartButton;
