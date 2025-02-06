import express from 'express'
import {
  login,
  register,
  currentUser,
  refreshToken,
  logout,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/refresh', refreshToken)
router.post('/logout', logout)
router.get('/current-user', currentUser)

export default router
