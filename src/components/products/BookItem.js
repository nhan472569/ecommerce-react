import { Link } from 'react-router-dom';
import classes from './BookItem.module.css';

import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';

const BookItem = props => {
  const bookItem = props.object;

  const dispatch = useDispatch();

  const addToCart = e => {
    e.preventDefault();
    console.log(bookItem);
    dispatch(cartAction.addItem({ ...bookItem, quantity: 1 }));
    console.log({ ...bookItem, quantity: 1 });
  };
  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <Link to={`/products/${props.id}`}>
          <img src={props.image} alt={props.name}></img>
          <div className={classes.overlay}>
            <span className={classes['overlay-action']} onClick={addToCart}>
              Thêm vào giỏ
            </span>
          </div>
        </Link>
      </div>
      <div className={classes.content}>
        <h2 className={classes.title}>
          <Link to={`/products/${props.id}`}>{props.name}</Link>
        </h2>
        <p className={classes.price}>{`${props.price.toLocaleString(
          'vi-VN'
        )}₫`}</p>
      </div>
    </div>
  );
};

export default BookItem;
