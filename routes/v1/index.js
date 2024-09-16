const express = require("express");
const { userRouter } = require("./userRouters");
const { restRouter } = require("./restRouters");
const { adminRouter } = require("./adminRouters");
const { menusRouter } = require("./menuRouters");
const { orderRouter } = require("./orderRouters");
const { cartRouter } = require("./cartRouters");
const { reviewRouter } = require("./reviewRouters");
const { addressRouter } = require("./addressRouter");
const { sellerRouter } = require("./sellerRouter");
const v1Router = express.Router();

// User router
v1Router.use('/user', userRouter)
// Seller router
v1Router.use('/seller', sellerRouter)
// Resturant router
v1Router.use('/restaurant', restRouter)
// Admin router
v1Router.use('/admin', adminRouter)
// Menu router
v1Router.use('/menus', menusRouter)
// Order router
v1Router.use('/orders', orderRouter)
// Cart router
v1Router.use('/cart', cartRouter)
// reviwe router
v1Router.use('/review', reviewRouter)
// Address router
v1Router.use('/addresses', addressRouter)

module.exports = { v1Router };