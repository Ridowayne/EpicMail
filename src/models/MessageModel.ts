import { string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

// senderID, receiverID

export interface IMail extends mongoose.Document {
  sender: string;
  senderID: string | mongoose.Types.ObjectId;
  receiver: string;
  receiverID: string | mongoose.Types.ObjectId;
  groupID: string | mongoose.Types.ObjectId;
  subject: string;
  status: string;
  body: string | number;
  date: Date;
  retracted: boolean;
  opened: boolean;
  createdAt: Date;
}

const MailSchema: Schema = new Schema<IMail>(
  {
    sender: {
      type: String,
      required: true,
    },
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    groupID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    receiver: {
      type: String,
      required: [true, 'Kindly provide a recipient for this message'],
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    status: {
      required: true,
      type: String,
      enum: ['sent', 'draft'],
      default: 'draft',
    },
    subject: {
      type: String,
    },
    body: {
      type: String,
      required: [true, 'Please provide a message to be sent'],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    retracted: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

MailSchema.post(/^findOne/, function (docs, next) {
  this.opened = true;
  next();
});

const Message = mongoose.model<IMail>('Message', MailSchema);
export default Message;
