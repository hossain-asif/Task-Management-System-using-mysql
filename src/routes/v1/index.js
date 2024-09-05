const express = require('express');

const { InfoController } = require('../../controllers');
const userRoutes = require('./user-routes');
const taskRoutes = require('./task-routes');

const router = express.Router();

router.use('/user', userRoutes);



router.get('/info',InfoController.info);


module.exports = router;

