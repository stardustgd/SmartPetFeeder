import express from 'express'
import {
  getAllSchedules,
  getSchedulesByEmail,
  createSchedule,
  updateScheduleByEmail,
  deleteScheduleByEmail,
} from '../controllers/schedulesController.js'

const router = express.Router()

router.get('/', getAllSchedules)
router.get('/user/:email', getSchedulesByEmail)
router.post('/', createSchedule)
router.put('/user/:email', updateScheduleByEmail)
router.delete('/user/:email', deleteScheduleByEmail)

export default router
