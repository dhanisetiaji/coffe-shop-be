const express = require("express");
const app = express()
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const { isLogin } = require("../middlewares/auth");

app.use('/auth', authRoutes)
app.use('/user', isLogin, userRoutes)


module.exports = app