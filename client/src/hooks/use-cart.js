const { useCallback } = require('react');
const { default: useHttp } = require('./use-http');
const { useDispatch, useSelector } = require('react-redux');
const { cartAction } = require('../store/cart-context');

const useCart = () => {
  const { _id: userId } = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  //* Callbacks
  const putCartHandler = useCallback(
    data => {
      dispatch(cartAction.putItems(data.data));
    },
    [dispatch]
  );

  const addToCartHandler = useCallback(
    (data, statusCode) => {
      if (statusCode === 201) {
        dispatch(cartAction.addItem(data.data.data));
        return;
      }
      dispatch(cartAction.updateQuantity(data.data.data));
    },
    [dispatch]
  );

  const updateCartItemHanlder = useCallback(
    data => {
      dispatch(cartAction.updateQuantity(data.data.data));
    },
    [dispatch]
  );

  const { sendRequest: get } = useHttp(putCartHandler);
  const { sendRequest: create } = useHttp(addToCartHandler);
  const { sendRequest: update } = useHttp(updateCartItemHanlder);
  const { sendRequest: deleteItem } = useHttp();

  const getCartItems = useCallback(() => {
    get({
      url: 'cart',
    });
  }, [get]);
  const createCartItem = useCallback(
    (bookId, quantity = null) => {
      create({
        url: 'cart',
        method: 'post',
        body: {
          book: bookId,
          userId,
          quantity,
        },
      });
    },
    [create, userId]
  );
  const updateCartItem = useCallback(
    (cartItemId, quantity) => {
      update({
        url: `cart/${cartItemId}`,
        method: 'patch',
        body: {
          quantity,
        },
      });
    },
    [update]
  );
  const deleleCartItem = useCallback(
    cartItemId => {
      if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        deleteItem({
          url: `cart/${cartItemId}`,
          method: 'delete',
        });
        dispatch(cartAction.deleteItem(cartItemId));
      }
    },
    [dispatch, deleteItem]
  );
  return { getCartItems, createCartItem, updateCartItem, deleleCartItem };
};

export default useCart;
