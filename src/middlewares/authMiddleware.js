import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const authenticateAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ error: 'Access token not found' })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid access token' })
    req.userId = decoded.id
    next()
  })
}

const authenticateRefreshToken = (req, res, next) => {
  const token = req.cookies['__refresh__token']

  if (token == null) return res.status(401).json({ error: 'Refresh token not found' })

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid refresh token' })

    // Véfifier si l'utilisateur existe toujours
    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ error: 'User not found' })

    req.refreshToken = token
    req.userId = decoded.id
    next()
  })
}

export default {
  authenticateAccessToken,
  authenticateRefreshToken,
}
