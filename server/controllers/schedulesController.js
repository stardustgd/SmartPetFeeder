import db from '../db/connection.js'

export const getAllSchedules = async (_req, res) => {
  try {
    const collection = db.collection('schedules')
    const results = await collection.find({}).toArray()
    res.status(200).send(results)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching schedules')
  }
}

export const getSchedulesByEmail = async (req, res) => {
  try {
    const collection = db.collection('schedules')
    const schedules = await collection
      .find({ user: req.params.email })
      .toArray()

    if (!schedules.length) {
      return res
        .status(404)
        .send({ message: 'No schedules found for this email' })
    }

    res.status(200).send(schedules)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching schedules')
  }
}

export const createSchedule = async (req, res) => {
  try {
    const newSchedule = {
      user: req.body.user,
      schedule: req.body.schedule,
    }

    let collection = db.collection('schedules')
    let result = await collection.insertOne(newSchedule)

    res
      .status(201)
      .send({ message: 'Schedule added', scheduleId: result.insertedId })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error adding schedule')
  }
}

export const updateScheduleByEmail = async (req, res) => {
  try {
    const query = { user: req.params.email }
    const updates = {
      $set: {
        schedule: req.body.schedule,
      },
    }

    let collection = db.collection('schedules')
    let result = await collection.updateOne(query, updates)

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .send({ message: 'No schedule found for this email' })
    }

    res.status(200).send({ message: 'Schedule updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error updating schedule')
  }
}

export const deleteScheduleByEmail = async (req, res) => {
  try {
    const query = { user: req.params.email }

    let collection = db.collection('schedules')
    let result = await collection.deleteOne(query)

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send({ message: 'No schedule found for this email' })
    }

    res.status(200).send({ message: 'Schedule deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error deleting schedule')
  }
}
