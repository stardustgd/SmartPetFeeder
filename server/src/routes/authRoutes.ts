import { Router } from 'express'
import { currentUser, login, register } from '../controllers/authController'
import { verifyToken } from '../middlewares/jwt'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/currentUser', verifyToken, currentUser)

export default router
