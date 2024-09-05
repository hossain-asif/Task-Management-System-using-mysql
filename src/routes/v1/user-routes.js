

const express = require('express');

const { UserController, TaskController } = require('../../controllers');
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


router.post('/create-task',
    AuthMiddleware.isAuthenticated,
    TaskController.createTask
)

router.post('/update-task/:id',
    AuthMiddleware.isAuthenticated,
    TaskController.updateTask
)

router.post('/get-task-by-id/:id',
    AuthMiddleware.isAuthenticated,
    TaskController.getTaskById
)

router.post('/get-task',
    AuthMiddleware.isAuthenticated,
    TaskController.getTask
)


router.post('/list-task-by-status/:status',
    AuthMiddleware.isAuthenticated,
    TaskController.listTaskByStatus
)

router.post('/delete-task/:id',
    AuthMiddleware.isAuthenticated,
    TaskController.deleteTask
)

router.post('/status-summary',
    AuthMiddleware.isAuthenticated,
    TaskController.statusSummary
)


module.exports = router;