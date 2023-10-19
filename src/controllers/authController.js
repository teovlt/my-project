import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

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
    const user = await User.create({ name: name, password: password })
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.cookie('__refresh__token', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })

    res.status(200).json({ accessToken, user })
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
    const user = await User.login(name, password)
    if (!user) {
      return res.status(404).json({ error: 'No such user' })
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
    //Supprimer le mdp de l'user
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
