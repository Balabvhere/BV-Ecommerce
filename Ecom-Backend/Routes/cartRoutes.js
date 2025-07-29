const express = require('express');
const router = express.Router();
const authController=require("../Controllers/authController")
const productController=require("../Controllers/productController")
const uploads=require("../Middleware/upload");
const cartController = require('../Controllers/cartController');

router.post('/add', cartController.addToCart);
router.get('/:userId', cartController.getCartByUser);
router.patch('/update/:id', cartController.updateCartItem);
router.delete('/delete/:id', cartController.deleteCartItem);
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
