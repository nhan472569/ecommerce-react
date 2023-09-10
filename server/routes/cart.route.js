const express = require('express');
const authController = require('./../controllers/auth.controller');
const cartItemController = require('./../controllers/cartItem.controller');

const router = express.Router();

router.use(authController.protect);
router
  .route('/')
  .get(cartItemController.getByUserId)
  .post(cartItemController.createCartItem);
router
  .route('/:id')
  .patch(cartItemController.updateCartItem)
  .delete(cartItemController.deleteCartItem);

module.exports = router;
