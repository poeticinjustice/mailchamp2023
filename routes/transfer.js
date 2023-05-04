import express from 'express'
const router = express.Router({ mergeParams: true })
import {
  getTransferById,
  createTransfer,
  updateTransfer,
} from '../controllers/transferController.js'

router.route('/').post(createTransfer)
router.route('/:id').get(getTransferById).put(updateTransfer)

export default router
