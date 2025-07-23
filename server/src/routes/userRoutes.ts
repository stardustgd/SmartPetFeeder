import { Router } from 'express'
import { getUser } from '../controllers/userController'

const router = Router()

router.get('/:value', getUser)

export default router
