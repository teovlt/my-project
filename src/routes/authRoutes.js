import express from 'express'
import authController from '../controllers/authController.js'

const router = express.Router()

// POST register a new user
router.post('/register', authController.signUp)

// POST login a user
router.post('/login', authController.signIn)

export default router
