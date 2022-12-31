import { Link } from 'react-router-dom';
import classes from './BookItem.module.css';
import environment from '../../environment';

import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';
import RatingStars from '../UI/RatingStars';

const BookItem = ({ book }) => {
  const {
    name,
    ratingsAverage,
    ratingsQuantity,
    price,
    imageCover,
    authors,
    slug,
  } = book;

  const dispatch = useDispatch();

  const addToCart = e => {
    e.preventDefault();
    dispatch(cartAction.addItem({ ...book, quantity: 1 }));
  };
  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <Link to={`/books/${slug}`}>
          <img
            src={environment.DOMAIN + '/img/books/' + imageCover}
            alt={name}
          ></img>
        </Link>
        <div className={classes['add-to-wishlist']}>
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.author}>
          {authors.map(a => {
            return (
              <Link to={`/author/${a._id}`} key={a._id}>
                {a.name}
              </Link>
            );
          })}
        </div>
        <h2 className={classes.title}>
          <Link to={`/books/${slug}`}>{name}</Link>
        </h2>
        <p className={classes.price}>{`${price.toLocaleString('vi-VN')}₫`}</p>
        <RatingStars
          ratingAverage={ratingsAverage}
          ratingCount={ratingsQuantity}
        />
        <button className={classes['add-to-cart']} onClick={addToCart}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default BookItem;
