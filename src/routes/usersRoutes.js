import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// GET all users
router.get('/list', authMiddleware.authenticateAccessToken, userController.getUsers)

// GET a specific user
router.get('/:id', authMiddleware.authenticateAccessToken, userController.getUser)

// POST a new user
router.post('/new', authMiddleware.authenticateAccessToken, userController.createUser)

// UPDATE a user
router.put('/:id', authMiddleware.authenticateAccessToken, userController.updateUser)

// DELETE a user
router.delete('/:id', authMiddleware.authenticateAccessToken, userController.deleteUser)

router.get('/me', authMiddleware.authenticateAccessToken, userController.me)

export default router
