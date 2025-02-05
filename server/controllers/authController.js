import bcrypt from 'bcrypt'
import db from '../db/connection.js'

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

    res.status(200).json({
      message: 'Login successful',
      user: { email: user.email },
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
