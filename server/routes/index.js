import express from 'express'
import users from './users.js'
import auth from './auth.js'
import schedules from './schedules.js'
import manualFeedings from './manualFeeding.js'

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/schedules', schedules)
router.use('/manualFeedings', manualFeedings)

export default router
