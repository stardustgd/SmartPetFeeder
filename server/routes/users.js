import express from 'express'
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  checkEmail,
  loginUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.get('/email/:email', getUserByEmail)
router.post('/email', checkEmail)
router.post('/login', loginUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
