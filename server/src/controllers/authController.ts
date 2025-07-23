import { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import connectMongo from '../middlewares/db'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await connectMongo()
    const collection = db.collection('users')

    const user = await collection.findOne({ email: req.body.email })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const passwordMatch = 'Test' === req.body.password

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, config.secretKey)

    res.status(200).json({ token })
  } catch (error) {
    next(error)
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await connectMongo()
    const collection = db.collection('users')

    const existingUser = await collection.findOne({ email: req.body.email })

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await collection.insertOne({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    next(error)
  }
}

export const currentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const db = await connectMongo()
    const collection = db.collection('users')

    const user = await collection.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    console.log(user)

    // TODO: Check that the userId's match

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}
