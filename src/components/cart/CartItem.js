import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';

import classes from './CartItem.module.css';
import { Link } from 'react-router-dom';

const CartItem = props => {
  const { productId, name, price, quantity, imageCover, slug } = props;

  const dispatch = useDispatch();
  const deleteItem = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      dispatch(cartAction.deleteItem({ _id: productId }));
    } else {
      return;
    }
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        dispatch(cartAction.decreaseQuantity({ _id: productId }));
      } else {
        return;
      }
    }
    dispatch(cartAction.decreaseQuantity({ _id: productId }));
  };

  const increaseQuantity = () => {
    dispatch(cartAction.increaseQuantity({ _id: productId }));
  };

  return (
    <div className={classes.item}>
      <hr></hr>
      <div className={classes.detail}>
        <div className={classes['product-img']}>
          <Link to={`/books/${slug}`}>
            <img
              src={process.env.PUBLIC_URL + '/images/' + imageCover}
              alt={name}
            ></img>
          </Link>
        </div>
        <div className={classes.info}>
          <Link to={`/books/${slug}`}>
            <h3 className={classes.name}>{name}</h3>
          </Link>
          <p className={classes.price}>
            {Number(`${price * quantity}`).toLocaleString('vi-VN')} ₫
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
