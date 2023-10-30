import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//Access token
function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `5m` })
}

function generateRefreshToken(userId) {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `30d` })
}

const signUp = async (req, res) => {
  const { name, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name: name.toLowerCase(), password: hashedPassword })
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.cookie('__refresh__token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    return res.status(200).json({ accessToken, user })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(404).json({ error: 'Username already taken' })
    }
    res.status(500).json({ error: err.message })
  }
}

const signIn = async (req, res) => {
  const { name, password } = req.body
  try {
    const user = await User.findOne({ name: name.toLowerCase() })
    if (!user) {
      return res.status(404).json({ error: 'No such user' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Username or password is incorrect' })
    }
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.cookie('__refresh__token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    return res.status(200).json({ accessToken, user })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const signOut = async (req, res) => {
  try {
    res.clearCookie('__refresh__token')
    res.status(200).json({ message: 'Signed out successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const refreshToken = async (req, res) => {
  try {
    const accessToken = generateAccessToken(req.userId)
    res.cookie('__refresh__token', req.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    const user = await User.findById(req.userId)
    res.status(200).json({ accessToken, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export default {
  signUp,
  signIn,
  signOut,
  refreshToken,
}
