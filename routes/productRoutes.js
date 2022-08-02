const express = require("express")
const router = express.Router()
const { getProductById, getAllProduct, getProductBySlug, add, update, remove } = require("../controllers/productController")
const { isLogin, isAdmin } = require("../middlewares/auth");
const Upload = require("../middlewares/productUpload");

router.get('/id/:productId', getProductById)
router.get('/', getAllProduct)
router.get('/:slug', getProductBySlug)
router.post('/', isLogin, isAdmin, Upload, add)
router.patch('/:productId', isLogin, isAdmin, Upload, update)
router.delete('/:productId', isLogin, isAdmin, remove)


module.exports = router
