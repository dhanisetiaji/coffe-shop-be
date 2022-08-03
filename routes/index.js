const express = require("express");
const app = express()
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const voucherRoutes = require("./voucherRoutes");
const transRoutes = require("./transRoutes");
const { isLogin } = require("../middlewares/auth");

app.use('/auth', authRoutes)
app.use('/user', isLogin, userRoutes)
app.use('/product', productRoutes)
app.use('/voucher', voucherRoutes)
app.use('/transaction', transRoutes)


module.exports = app