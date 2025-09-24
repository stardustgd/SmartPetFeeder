import { Router } from 'express'
import { getUser, updatePreferences } from '../controllers/userController'
import { verifyToken } from '../middlewares/jwt'

const router = Router()

router.get('/:value', getUser)
router.patch('/preferences', verifyToken, updatePreferences)

export default router
