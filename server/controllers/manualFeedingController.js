import db from '../db/connection.js'

export const getAllManualFeedings = async (_req, res) => {
  try {
    const collection = db.collection('manualFeedings')
    const feedings = await collection.find().toArray()
    res.status(200).json(feedings)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manual feedings' })
  }
}

export const getManualFeedingsByEmail = async (req, res) => {
  try {
    const { email } = req.params
    const collection = db.collection('manualFeedings')

    const userFeeding = await collection.findOne({ user: email })

    if (!userFeeding) {
      return res
        .status(404)
        .json({ message: 'No manual feeding record found for this user' })
    }

    res.status(200).json(userFeeding)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch user manual feeding amount' })
  }
}

export const createManualFeeding = async (req, res) => {
  try {
    const { user, manualFeedingAmount } = req.body

    if (!user || manualFeedingAmount == null) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const collection = db.collection('manualFeedings')
    const existingEntry = await collection.findOne({ user })

    if (existingEntry) {
      return res
        .status(400)
        .json({ error: 'Manual feeding entry already exists for this user' })
    }

    const result = await collection.insertOne({
      user,
      manualFeedingAmount,
    })

    res
      .status(201)
      .json({ message: 'Manual feeding created successfully', data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create manual feeding' })
  }
}

export const updateManualFeeding = async (req, res) => {
  try {
    const { user, manualFeedingAmount } = req.body

    if (!user || manualFeedingAmount == null) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const collection = db.collection('manualFeedings')
    const existingEntry = await collection.findOne({ user })

    if (!existingEntry) {
      return res
        .status(404)
        .json({ error: 'No manual feeding entry found for this user' })
    }

    const result = await collection.updateOne(
      { user },
      { $set: { manualFeedingAmount } }
    )

    res
      .status(200)
      .json({ message: 'Manual feeding updated successfully', data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update manual feeding' })
  }
}

export const deleteManualFeedingsByEmail = async (req, res) => {
  try {
    const { email } = req.params
    const collection = db.collection('manualFeedings')

    const result = await collection.deleteOne({ user: email })

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: 'No manual feeding record found for this user' })
    }

    res.status(200).json({ message: 'Manual feeding record deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete manual feeding' })
  }
}
