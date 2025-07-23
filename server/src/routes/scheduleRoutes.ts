import { Router } from 'express'
import { getSchedules } from '../controllers/schedulesController'

const router = Router()

router.get('/:value', getSchedules)

export default router
