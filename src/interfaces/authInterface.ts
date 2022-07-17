import { Document, Types } from 'mongoose';

export default interface IUser extends Document {
  _id?: Types.ObjectId;
  name: string;
  phoneNumber: number;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
}
