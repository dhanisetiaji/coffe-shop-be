const express = require("express");
const app = express()
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const voucherRoutes = require("./voucherRoutes");
const { isLogin } = require("../middlewares/auth");

app.use('/auth', authRoutes)
app.use('/user', isLogin, userRoutes)
app.use('/product', productRoutes)
app.use('/voucher', voucherRoutes)


module.exports = app