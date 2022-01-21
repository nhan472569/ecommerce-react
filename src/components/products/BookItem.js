import { Link } from 'react-router-dom';
import classes from './BookItem.module.css';

const BookItem = props => {
  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <Link to={`/products/${props.id}`}>
          <img src={props.image} alt={props.name}></img>
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
