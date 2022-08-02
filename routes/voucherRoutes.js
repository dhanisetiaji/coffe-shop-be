const express = require("express")
const router = express.Router()
const { isLogin, isAdmin } = require("../middlewares/auth");
const { getVoucherById, getVoucherByCode, getAllVoucher, add, update, remove, home } = require("../controllers/voucherController")


router.get('/all', isLogin, isAdmin, getAllVoucher)
router.get('/all/:voucherId', isLogin, isAdmin, getVoucherById)
router.get('/', getVoucherByCode)
router.patch('/:voucherId', isLogin, isAdmin, update)
router.delete('/:voucherId', isLogin, isAdmin, remove)
router.post('/', isLogin, isAdmin, add)

module.exports = router