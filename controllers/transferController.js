import asyncHandler from 'express-async-handler'
import Transfer from '../models/Transfer.js'

// @desc    Fetch single transfer
// @route   GET /api/transfers/:id
// @access  Public
const getTransferById = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id)

  if (transfer) {
    res.json(transfer)
  } else {
    res.status(404)
    throw new Error('Transfer not found')
  }
})

// @desc    Create a transfer
// @route   POST /api/transfers
// @access  Public
const createTransfer = asyncHandler(async (req, res) => {
  const transfer = new Transfer({
    user: req.user._id,
    subject: 'Subject',
  })

  const createdTransfer = await transfer.save()
  res.status(201).json(createdTransfer)
})

// @desc    Update a transfer
// @route   PUT /api/transfers/:id
// @access  Public
const updateTransfer = asyncHandler(async (req, res) => {
  const { subject } = req.body

  const transfer = await Transfer.findById(req.params.id)

  if (transfer) {
    transfer.subject = subject

    const updatedTransfer = await transfer.save()
    res.json(updatedTransfer)
  } else {
    res.status(404)
    throw new Error('Transfer not found')
  }
})

export { getTransferById, createTransfer, updateTransfer }
