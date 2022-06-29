import mongoose, { Document, Mongoose, Schema, Types } from 'mongoose';
// import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import * as Group from './GroupModels';

export interface UserDocument extends Document {
  _id?: Types.ObjectId;
  name: string;
  phoneNumber: number;
  active: boolean;
  role: string;
  password: string;
  confirmPassword?: string;
  email: string;
  // userGroups: [string]
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema: Schema = new Schema<UserDocument>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      validate: [
        validator.isMobilePhone,
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
      required: true,
      minlength: 6,
      select: false,
      validate: [
        validator.isAlphanumeric,
        'kinly use a combination of number and letters for your passwors',
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'kindly provide a valid email address'],
    },
    // userGroups:{
    //     type: [Schema.Types.ObjectId],
    //     ref: Group
    // },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<UserDocument>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  // Hash the password with cost of 12
  user.password = await bcrypt.hash(user.password, 12);

  next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  let password = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
