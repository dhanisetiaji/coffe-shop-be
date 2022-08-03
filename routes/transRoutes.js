const express = require("express")
const router = express.Router()
const { add } = require("../controllers/transController")

router.post('/', add)

module.exports = router
