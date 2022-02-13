import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';

import classes from './CartItem.module.css';
import { Link } from 'react-router-dom';

const CartItem = props => {
  const { productId, name, price, quantity, imageUrl } = props;

  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(cartAction.deleteItem({ _id: productId }));
  };

  return (
    <tr className={classes.item}>
      <td className={classes.namebox}>
        <Link to={`/products/${props.productId}`}>
          <div className={classes.image}>
            <img src={props.imageUrl} alt={props.name} />
          </div>
          <div className={classes.name}>{props.name}</div>
        </Link>
      </td>
      <td>{props.price.toLocaleString('vi-VN')} ₫</td>
      <td>{props.quantity}</td>
      <td>
        {Number(`${props.price * props.quantity}`).toLocaleString('vi-VN')} ₫
      </td>
      <td>
        <button className={classes.delete} onClick={deleteItem}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
