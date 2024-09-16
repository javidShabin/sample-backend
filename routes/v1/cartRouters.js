const express = require('express')
const { addItemToCart, getCart, removeFromCart } = require('../../controllers/cartController')
const { userAuthentication } = require('../../middlewares/userAuth')
const router = express.Router()

// Add item to cart
router.post('/addCart',userAuthentication, addItemToCart)
// Get cart
router.get('/getCart',userAuthentication, getCart)
// Remove cart
router.delete('/remove', userAuthentication, removeFromCart)

module.exports = {cartRouter: router}