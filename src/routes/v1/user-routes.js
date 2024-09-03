

const express = require('express');

const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/registration',
    UserController.registration
)

module.exports = router;