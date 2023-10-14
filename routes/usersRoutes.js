import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

// GET all users
router.get('/list', userController.getUsers)

// GET a specific user
router.get('/:id', userController.getUser)

// POST a new user
router.post('/new', userController.createUser)

// UPDATE a user
router.put('/:id', userController.updateUser)

// DELETE a user
router.delete('/:id', userController.deleteUser)

export default router
