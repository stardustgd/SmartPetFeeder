import { Request, Response, NextFunction } from 'express'
import connectMongo from '../middlewares/db'

export const getSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value } = req.params

  try {
    const db = await connectMongo()
    const collection = db.collection('schedules')

    const schedules = await collection.find({ userId: value }).toArray()

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

// createSchedule
// updateSchedule
// deleteSchedule
