import { Router } from 'express'
import authRoutes from './authRoutes'
import scheduleRoutes from './scheduleRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/schedules', scheduleRoutes)
router.use('/users', userRoutes)

export default router
