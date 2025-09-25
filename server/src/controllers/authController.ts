import { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/auth'
import { ObjectId } from 'mongodb'
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
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, config.secretKey, {
      expiresIn: '12h',
    })

    res
      .cookie('authorization', token, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .status(200)
      .json({ message: 'Successfully logged in' })
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
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const defaultPreferences = {
      manualFeedingAmount: 1,
      unit: 'grams',
    }

    await collection.insertOne({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      preferences: defaultPreferences,
    })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie('authorization', {
    httpOnly: true,
    sameSite: 'lax',
  })

  res.status(200).json({ message: 'Logged out successfully' })
}

export const currentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const db = await connectMongo()
    const collection = db.collection('users')

    const user = await collection.findOne({
      _id: ObjectId.createFromHexString(req.user.id.toString()),
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
    })
  } catch (error) {
    next(error)
  }
}
