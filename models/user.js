import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import validateEmail from '../utils/validate-email.js';

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

export default mongoose.model('User', userSchema);
