const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

// aschema for all fields we want for user
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add aname '],
    },

    email: {
      type: String,
      required: [true, 'Please add Email '],
    },

    password: {
      type: String,
      required: [true, 'Please add password '],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
