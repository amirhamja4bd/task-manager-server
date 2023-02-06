const express =require('express');
const { createTask, updateTaskStatus, listTaskByStatus, taskStatusCount, deleteTask } = require('../controllers/taskController');
const { registration, login, profileUpdate } = require('../controllers/userController');
const authVerifyMiddleware = require('../middleware/authVerifyMiddleware');


const router =express.Router();

router.post('/registration', registration)
router.post('/login', login)
router.put('/profile-update', authVerifyMiddleware, profileUpdate)

// Task
router.post('/create-task', authVerifyMiddleware, createTask)
router.post('/delete-task/:id', authVerifyMiddleware, deleteTask)
router.put('/update-task-status/:id/:status', authVerifyMiddleware, updateTaskStatus)
router.get('/list-task-status/:status', authVerifyMiddleware, listTaskByStatus)
router.get('/task-status-count', authVerifyMiddleware, taskStatusCount)




module.exports=router;