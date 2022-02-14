import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';

import classes from './CartItem.module.css';
import { Link } from 'react-router-dom';

const CartItem = props => {
  const { productId, name, price, quantity, imageUrl } = props;

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
    <tr className={classes.item}>
      <td className={classes.namebox}>
        <Link to={`/products/${productId}`}>
          <div className={classes.image}>
            <img src={imageUrl} alt={name} />
          </div>
          <div className={classes.name}>{name}</div>
        </Link>
      </td>
      <td>{price.toLocaleString('vi-VN')} ₫</td>
      <td>
        <span className={classes.decrease} onClick={decreaseQuantity}>
          -
        </span>
        <input type="text" value={quantity} className={classes.quantity} />
        <span className={classes.increase} onClick={increaseQuantity}>
          +
        </span>
      </td>
      <td>{Number(`${price * quantity}`).toLocaleString('vi-VN')} ₫</td>
      <td>
        <button className={classes.delete} onClick={deleteItem}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
