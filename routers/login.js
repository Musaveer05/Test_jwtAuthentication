const express = require('express')
const router = express.Router()
const controller = require('../controllers/login')

router.post('/', controller.postLoginForm)

module.exports = router