import { Response, NextFunction } from 'express'
import connectMongo from '../middlewares/db'
import { ObjectId } from 'mongodb'
import { AuthenticatedRequest } from '../models/auth'

export const getSchedules = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  try {
    const user = ObjectId.createFromHexString(req.user.id.toString())
    const db = await connectMongo()
    const collection = db.collection('schedules')

    const schedules = await collection.find({ userId: user }).toArray()

    if (!schedules.length) {
      return res
        .status(404)
        .send({ message: 'No schedules found for this userId' })
    }

    res.status(200).send(schedules)
  } catch (error) {
    next(error)
  }
}

export const createSchedule = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  try {
    const db = await connectMongo()
    const collection = db.collection('schedules')

    const user = ObjectId.createFromHexString(req.user.id.toString())
    const { days, time, amount } = req.body

    const existing = await collection.findOne({
      userId: user,
      days: days,
      time: time,
    })

    if (existing) {
      return res.status(409).json({ message: 'Schedule already exists' })
    }

    const newSchedule = {
      userId: user,
      days: days,
      time: time,
      amount: amount,
    }

    await collection.insertOne(newSchedule)

    res.status(201).send({ message: 'Schedule successfully added' })
  } catch (error) {
    next(error)
  }
}

export const deleteSchedule = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  if (!req.body.scheduleId) {
    return res.status(400).json({ message: 'No scheduleId provided' })
  }

  try {
    const userId = ObjectId.createFromHexString(req.user.id.toString())
    const db = await connectMongo()
    const collection = db.collection('schedules')

    const scheduleId = ObjectId.createFromHexString(req.body.scheduleId)

    await collection.deleteOne({
      _id: scheduleId,
      userId: userId,
    })

    res.status(200).send({ message: 'Schedule successfully deleted' })
  } catch (error) {
    next(error)
  }
}
