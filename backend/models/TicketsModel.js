const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

// aschema for all fields we want for user
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a product '],
      enum: ['iPhone', 'MacBook Air', 'MacBook Pro', 'iPad'],
    },

    description: {
      type: String,
      required: [true, 'Please enter a description of the issue '],
    },

    stats: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
