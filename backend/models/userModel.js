const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add name to the user'],
    },
    email: {
      type: String,
      required: [true, 'please add email to the user'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please add password to the user'],
    },

    // optinal in case
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // Tiimestamps
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
