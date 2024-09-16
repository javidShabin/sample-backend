const express = require('express')
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../../controllers/orderController')
const { userAuthentication } = require('../../middlewares/userAuth')
const { adminAuthentication } = require('../../middlewares/adminAuth')
const router = express.Router()

// Create order
router.post('/order',userAuthentication, createOrder)
// Get order
router.get('/orders',userAuthentication, getOrders)
// Get order by id
router.get('/order/:id',userAuthentication, getOrderById)
// Update order
router.put('/order/:id/status',adminAuthentication,  updateOrderStatus)

module.exports = {orderRouter: router}