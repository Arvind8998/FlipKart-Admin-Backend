const express = require('express');
const router = express.Router();
const {addItemToCart,getCartItems} = require('../controllers/cart')
const {requireSignin,userMiddleware} = require('../common-middleware/index')

router.post('/user/cart/add-to-cart',requireSignin,userMiddleware,addItemToCart)
router.post('/user/getCartItems',requireSignin,userMiddleware,getCartItems)


module.exports = router