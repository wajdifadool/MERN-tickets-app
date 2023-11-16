const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

// aschema for all fields we want for the note
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
      required: [true, 'Please Enter Some text  '],
    },
    isStaff: {
      type: Boolean,
      required: false,
    },

    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
