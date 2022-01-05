import classes from './CartButton.module.css';

const CartButton = () => {
  return (
    <div className={classes.cart}>
      <i class="fas fa-shopping-cart"></i>
      <span className={classes.quantity}>0</span>
      <span className={classes.total}>$0</span>
    </div>
  );
};

export default CartButton;
