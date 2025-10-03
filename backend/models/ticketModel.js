const mongoose = require('mongoose')
/**
 * Each ticket is connected to user
 * therefor, there is a relation betwenn ticket and user
 */
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'please Select Product'],
      enum: ['iPhone', 'MacBook', 'iPad', 'iMac'],
    },
    description: {
      type: String,
      required: [true, 'please Enter description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
