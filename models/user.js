const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validateEmail = require('../utils/validate-email');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: 'Password is required',
      minlength: [6, 'Minimum password length is six characters'],
    },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, admin: this.admin },
    process.env.SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = mongoose.model('User', userSchema);
