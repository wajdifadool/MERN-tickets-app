const mongoose = require('mongoose')
/**
 * Each ticket is connected to user
 * therefor, there is a relation betwenn ticket and user
 */
const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
    },

    text: {
      type: String,
      required: [true, 'please Enter note text'],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    stafId: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('note', noteSchema)
