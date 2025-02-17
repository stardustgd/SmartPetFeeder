import express from 'express'
import {
  getManualFeedingsByEmail,
  createManualFeeding,
  updateManualFeeding,
  deleteManualFeedingsByEmail,
} from '../controllers/manualFeedingController.js'

const router = express.Router()

router.get('/user/:email', getManualFeedingsByEmail)
router.post('/', createManualFeeding)
router.put('/user/:email', updateManualFeeding)
router.delete('/user/:email', deleteManualFeedingsByEmail)

export default router
