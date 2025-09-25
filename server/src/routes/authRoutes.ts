import { Router } from 'express'
import {
  currentUser,
  login,
  logout,
  register,
} from '../controllers/authController'
import { verifyToken } from '../middlewares/jwt'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/currentUser', verifyToken, currentUser)
router.post('/logout', logout)

export default router
