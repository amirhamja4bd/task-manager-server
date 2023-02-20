const express =require('express');
const { createTask, updateTaskStatus, listTaskByStatus, taskStatusCount, deleteTask } = require('../controllers/taskController');
const { registration, login, profileUpdate, profileDetails, recoverVerifyEmail, recoverVerifyOTP, recoverResetPass } = require('../controllers/userController');
const authVerifyMiddleware = require('../middleware/authVerifyMiddleware');


const router =express.Router();

router.post('/registration', registration)
router.post('/login', login)
router.put('/profile-update', authVerifyMiddleware, profileUpdate)
router.get('/profile-details', authVerifyMiddleware, profileDetails)
router.get('/a', authVerifyMiddleware, profileDetails)

// Password Forgot
router.get('/recover-verify-email/:email', recoverVerifyEmail)
router.get('/recover-verify-otp/:email/:otp', recoverVerifyOTP)
router.post('/recover-reset-password', recoverResetPass)

// Task
router.post('/create-task', authVerifyMiddleware, createTask)
router.delete('/delete-task/:id', authVerifyMiddleware, deleteTask)
router.get('/update-task-status/:id/:status', authVerifyMiddleware, updateTaskStatus)
router.get('/list-task-status/:status', authVerifyMiddleware, listTaskByStatus)
router.get('/task-status-count', authVerifyMiddleware, taskStatusCount)




module.exports=router;