import { Request, Response, NextFunction } from 'express'
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
