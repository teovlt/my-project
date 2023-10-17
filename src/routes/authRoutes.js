import express from 'express'
import authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// POST register a new user
router.post('/register', authController.signUp)

// POST login a user
router.post('/login', authController.signIn)

// GET logout a user
router.get('/logout', authController.signOut)

router.get('/refresh-token', authMiddleware.authenticateRefreshToken, authController.refreshToken)

export default router
