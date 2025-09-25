import { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/auth'
import connectMongo from '../middlewares/db'
import { ObjectId } from 'mongodb'

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value } = req.params
  const { by } = req.query

  try {
    const user =
      by === 'email'
        ? await findUserByEmail(value)
        : await findUserById(new ObjectId(value))

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

const findUserByEmail = async (email: string) => {
  const db = await connectMongo()
  const collection = db.collection('users')
  const user = await collection.findOne({ email: email })

  return user
}

const findUserById = async (id: ObjectId) => {
  const db = await connectMongo()
  const collection = db.collection('users')
  const user = await collection.findOne({ _id: id })

  return user
}

export const updatePreferences = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const { manualFeedingAmount, unit } = req.body

    const db = await connectMongo()
    const collection = db.collection('users')

    const user = await collection.findOne({
      _id: ObjectId.createFromHexString(req.user.id.toString()),
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (manualFeedingAmount !== undefined) {
      await collection.updateOne(
        { _id: user._id },
        { $set: { 'preferences.manualFeedingAmount': manualFeedingAmount } }
      )
    }

    if (unit !== undefined) {
      await collection.updateOne(
        { _id: user._id },
        { $set: { 'preferences.unit': unit } }
      )
    }

    return res
      .status(200)
      .json({ message: 'User preferences updated successfully' })
  } catch (error) {
    next(error)
  }
}
