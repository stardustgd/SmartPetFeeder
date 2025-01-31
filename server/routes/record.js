import express from 'express'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

import db from '../db/connection.js'

const router = express.Router()

// Get all users
router.get('/', async (_req, res) => {
  try {
    let collection = db.collection('users')
    let results = await collection.find({}).toArray()
    res.status(200).send(results)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching records')
  }
})

// Get a single user by ID
router.get('/:id', async (req, res) => {
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
})

// Create a new record
router.post('/', async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
      return res.status(400).send('Missing required fields')
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send('Passwords do not match')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    let newDocument = {
      email: req.body.email,
      password: hashedPassword,
    }
    let collection = db.collection('users')
    let result = await collection.insertOne(newDocument)
    res.send(result).status(201)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error adding record')
  }
})

router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body

    // Validate email
    if (!email) {
      console.error('Email is required')
      return res.status(400).json({ error: 'Email is required' })
    }

    // Check if the email exists in the database
    let collection = db.collection('users')

    let existingUser = await collection.findOne({ email: req.body.email })

    if (existingUser) {
      return res
        .status(400)
        .json({ exists: true, message: 'Email already exists' })
    } else {
      return res
        .status(200)
        .json({ exists: false, message: 'Email is available' })
    }
  } catch (err) {
    console.error('Error checking email: ', err)
    res
      .status(500)
      .json({ error: 'An error occurred while checking the email' })
  }
})

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required' })
    }

    // Find the user by email
    const collection = db.collection('users')
    const user = await collection.findOne({ email })

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' })
    }

    // Compare provided password with password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' })
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { email: user.email },
    })
  } catch (err) {
    console.error('Error during login:', err)
    res
      .status(500)
      .json({ success: false, message: 'An error occurred during login' })
  }
})

// Update a record by id
router.patch('/:id', async (req, res) => {
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
})

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) }

    const collection = db.collection('users')
    let result = await collection.deleteOne(query)

    res.send(result).status(200)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error deleting record')
  }
})

export default router
