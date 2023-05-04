import mongoose from 'mongoose'

const transferSchema = mongoose.Schema({
  subject: { type: String },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

const Transfer = mongoose.model('Transfer', transferSchema)

export default Transfer
