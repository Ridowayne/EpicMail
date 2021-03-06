import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import * as User from './peopleModel';

export interface IGroup extends Document {
  groupName: string;
  createdAt: Date;
  groupAdmin: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId;
}

const groupSchema = new Schema({
  groupName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  menbers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Group = mongoose.model<IGroup>('Group', groupSchema);

export default Group;
