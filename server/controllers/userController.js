import { ObjectId } from 'mongodb'
import db from '../db/connection.js'

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    let collection = db.collection('users')
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query)

    if (!result) {
      res.status(404).send('User not found')
    } else {
      res.status(200).send(result)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching record')
  }
}

// Get a user by email
export const getUserByEmail = async (req, res) => {
  try {
    let collection = db.collection('users')
    let user = await collection.findOne({ email: req.params.email })

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    } else {
      return res.status(200).send({ uid: user._id })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching record by email')
  }
}

// Update a record by id
export const updateUser = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) }
    const updates = {
      $set: {
        email: req.body.email,
        password: req.body.password,
      },
    }

    let collection = db.collection('users')
    let result = await collection.updateOne(query, updates)
    res.send(result).status(200)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error updating record')
  }
}

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) }

    const collection = db.collection('users')
    let result = await collection.deleteOne(query)

    res.send(result).status(200)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error deleting record')
  }
}
