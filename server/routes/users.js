import express from 'express'
import {
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/:id', getUserById)
router.get('/email/:email', getUserByEmail)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
