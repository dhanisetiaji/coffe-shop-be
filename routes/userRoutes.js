const express = require("express")
const router = express.Router()
const { getUserById, getUser, getAllUser, update, updateByAdmin, updatePassword, remove } = require("../controllers/userController")
const { isAdmin } = require("../middlewares/auth");
const Upload = require("../middlewares/userUpload");

router.get('/:userId', isAdmin, getUserById)
router.post('/', getUser)
router.patch('/', Upload, update)
router.patch('/pass', updatePassword)

router.get('/', isAdmin, getAllUser)
router.patch('/update/:userId', isAdmin, Upload, updateByAdmin)
router.delete('/:userId', isAdmin, remove)


module.exports = router
