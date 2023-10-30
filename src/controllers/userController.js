import User from '../models/userModel.js'
import mongoose from 'mongoose'

// get all users
const getUsers = async (req, res) => {
  //Find all users and sort them by creation date
  const users = await User.find({}).sort({ createdAt: -1 })
  res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'The ID user is invalid' })
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }
  return res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
  const { name, password } = req.body

  try {
    const user = await User.create({ name, password })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'The ID user is invalid' })
  }
  const user = await User.findOneAndDelete({ _id: id })
  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }
  res.status(200).json(user)
}

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'The ID user is invalid' })
  }
  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body })
  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }
  res.status(200).json(user)
}

/**
 * Retreives details of the authenticated team based on the `teamId` passed in the request
 * @route GET /api/user/me
 * @group Users
 * @access Private
 */
const me = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select('-password')

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json(user)
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message })
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  me,
}
