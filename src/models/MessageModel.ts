import { string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IMail extends mongoose.Document {
  sender: string;
  receiver: string;
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
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    status: { type: String, enum: ['sent', 'draft', 'retrated'] },
    subject: { type: String },
    body: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    retracted: { type: Boolean, default: false },
    opened: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

MailSchema.pre(/^find/, function (next) {
  this.find({ retracted: { $ne: true } });

  next();
});

MailSchema.post(/^findOne/, function (docs, next) {
  this.opened = true;
  next();
});

const Message = mongoose.model<IMail>('Message', MailSchema);
export default Message;
