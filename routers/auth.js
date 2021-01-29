const express = require('express')
const authController = require('../controllers/auth')
const router = express.Router()
const { authenticate } = require('../middleware');


router.post('/signup', authController.signup)
router.post('/insertFBCredentials',authenticate, authController.insertFBCredentials)

router.get('/fbCred',authenticate, authController.fbCred)

router.post('/login', authController.login)

module.exports = router;