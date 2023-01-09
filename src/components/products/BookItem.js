import { Link } from 'react-router-dom';
import classes from './BookItem.module.css';
import environment from '../../environment';

import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';
import RatingStars from '../UI/RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import SkeletonLoading from '../UI/loading/SkeletonLoading';

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
        <Link to={`/books/${slug}`} title={name}>
          <img
            src={environment.DOMAIN + '/img/books/' + imageCover}
            alt={name}
          ></img>
        </Link>
        <div
          className={classes['add-to-wishlist']}
          title="Thêm vào danh sách yêu thích"
        >
          <FontAwesomeIcon
            icon={regular('heart')}
            className={classes.icon}
          ></FontAwesomeIcon>
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
          <Link to={`/books/${slug}`} title={name}>
            {name}
          </Link>
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

const Loading = () => {
  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <SkeletonLoading className="w-full h-full" />
      </div>
      <div className={classes.content}>
        <SkeletonLoading className="w-full h-17 mb-10" />
        <SkeletonLoading className="w-full h-17 mb-10" />
        <SkeletonLoading className="w-fourth h-15 mb-10" />
        <SkeletonLoading className="w-third h-15 mb-10" />
        <SkeletonLoading className="w-half h-30" />
      </div>
    </div>
  );
};
BookItem.Loading = Loading;

export default BookItem;
