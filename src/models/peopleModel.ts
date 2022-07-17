import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import IUser from '../interfaces/authInterface';
import crypto from 'crypto';

const peopleSchema: Schema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, 'kindly provide your name'],
      validate: [
        /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
        'Kindly provide a valid name',
      ],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'kindl provide your phone number'],
      unique: true,
      validate: [
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
        'kindly provide a valid mobile number',
      ],
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'owner'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Kindly create a password'],
      minlength: [6, 'select a password with 6 or more characters']
    },
    email: {
      type: String,
      required: [true, 'kindly provide an email address'],
      unique: true,
      validate: [validator.isEmail, 'kindly provide a valid email address'],
    },
    userGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);



export default mongoose.model<IUser>('PEOPLE', peopleSchema);
