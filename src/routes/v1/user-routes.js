

const express = require('express');

const { UserController } = require('../../controllers');
const {AuthMiddleware} = require('../../middlewares')

const router = express.Router();

router.post('/registration',
    UserController.registration
)

router.post('/login',
    UserController.login
)

router.post('/profile-update',
    AuthMiddleware.isAuthenticated,
    UserController.profileUpdate
)

module.exports = router;