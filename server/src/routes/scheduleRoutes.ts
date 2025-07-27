import { Router } from 'express'
import {
  getSchedules,
  createSchedule,
  deleteSchedule,
} from '../controllers/schedulesController'
import { verifyToken } from '../middlewares/jwt'

const router = Router()

router.get('/', verifyToken, getSchedules)
router.post('/', verifyToken, createSchedule)
router.delete('/', verifyToken, deleteSchedule)

export default router
