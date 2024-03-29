import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-context';

import classes from './CartItem.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { AdvancedImage } from '@cloudinary/react';
import createUrl from '../../common/utils/cloudinary-utils';

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
      deleteItem();
      return;
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
            <AdvancedImage
              cldImg={createUrl(imageCover, 200, 300)}
              alt={name}
            />
          </Link>
        </div>
        <div className={classes.info}>
          <div className={classes.row1}>
            <Link to={`/books/${slug}`}>
              <h3 className={classes.name}>{name}</h3>
            </Link>
            <span className={classes['item-total']}>
              {Number(`${price * quantity}`).toLocaleString('vi-VN')} ₫
            </span>
          </div>
          <p className={classes.price}>
            {Number(`${price}`).toLocaleString('vi-VN')} ₫
          </p>
          <div className={classes.row3}>
            <form className={classes['set-quantity']}>
              <div className={classes.quantity}>
                <span
                  className={`${classes.btn} ${classes['btn-quantity-left']}`}
                  type="button"
                  onClick={decreaseQuantity}
                ></span>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                />
                <span
                  className={`${classes.btn} ${classes['btn-quantity-right']}`}
                  type="button"
                  onClick={increaseQuantity}
                ></span>
              </div>
            </form>
            <div className={classes.function}>
              <span>
                <FontAwesomeIcon
                  icon={solid('heart')}
                  className={classes.icon}
                ></FontAwesomeIcon>
                <span>Lưu</span>
              </span>
              |
              <span onClick={deleteItem}>
                <FontAwesomeIcon
                  icon={solid('trash')}
                  className={classes.icon}
                ></FontAwesomeIcon>
                <span>Xóa</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
