import { useSelector } from 'react-redux';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = () => {
  const cart = useSelector(state => state.cart);

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
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
      <CartSummary subtotal={subtotal} />
    </div>
  );
};

export default Cart;
