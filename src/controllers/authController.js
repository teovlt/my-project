import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

//Access token
function generateAccessToken({ userId }) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET)
}

// Register & generate an access token
const signUp = async (req, res) => {
  const { name, password } = req.body

  try {
    const user = await User.create({ name: name, password: password })
    const accessToken = generateAccessToken(user._id)
    res.status(200).json({ accessToken, user })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(404).json({ error: 'Username already taken' })
    }
    res.status(400).json({ error: err.message })
  }
}

// Login and generate an access token
const signIn = async (req, res) => {
  const { name, password } = req.body
  try {
    const user = await User.findOne({ name: name, password: password })
    if (!user) {
      return res.status(404).json({ error: 'No such user' })
    }
    const accessToken = generateAccessToken(user._id)
    return res.status(200).json({ accessToken })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export default {
  signUp,
  signIn,
}
