import bcrypt from 'bcrypt'
import db from '../db/connection.js'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const refreshTokens = new Set()

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, REFRESH_SECRET, {
    expiresIn: '7d',
  })
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Credentials are not provided' })

    const collection = db.collection('users')
    const user = await collection.findOne({ email: email })

    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' })

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword)
      return res.status(401).json({ message: 'Invalid email or password' })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    refreshTokens.add(refreshToken)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000,
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000 * 7 * 24,
    })

    res.status(200).json({
      message: 'Login successful',
      user: { email: user.email },
      accessToken: accessToken,
    })
  } catch (err) {
    res.status(500).json({ message: 'An error occurred during login' })
  }
}

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ messages: 'Credentials are not provided' })

    const collection = db.collection('users')
    const existingUser = await collection.findOne({ email: email })

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const newUser = await collection.insertOne({
      email: email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'User registered',
      userId: newUser.insertedId,
    })
  } catch (err) {
    res.status(500).json({ message: 'An error occurred during register' })
  }
}

export const currentUser = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.json({ loggedIn: false })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ loggedIn: true, user: decoded })
  } catch (err) {
    console.error('Token verification failed:', err.message)
    res.json({ loggedIn: false })
  }
}

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    const newAccessToken = jwt.sign(
      { email: decoded.email, id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )

    res.json({ accessToken: newAccessToken })
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' })
  }
}

export const logout = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  })
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  })
  res.json({ message: 'Logged out successfully' })
}
