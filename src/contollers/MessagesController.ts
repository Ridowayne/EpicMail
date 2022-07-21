import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ErrorResponse from '../utils/Erromessage';
import Message, { IMail } from './../models/MessageModel';

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newmail = new Message({
    sender: req.user.email,
    receiver: req.body.receiver,
    status: req.body.status,
    heading: req.body.heading,
    body: req.body.body,
  });
  return newmail
    .save()
    .then((newmail) => res.status(201).json({ newmail }))
    .catch((error) => res.status(500).json({ error }));
};

// inbox, sent message, draft, retract message, get a message

// for retracting a message(need to model it such that only sender can retarct the message)
const retractAMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
    });

    if (!message) {
      return res.status(404).json({
        status: 'fail',
        message: 'No message with such ID found',
      });
    }

    if (req.user.email !== message.sender) {
      return res.status(404).json({
        status: 'fail',
        message: 'Only the sender can retract this message',
      });
    }
    await message.updateOne({ status: req.body.staus, retracted: 'true' });
    return res.status(200).json({
      status: 'success',
      report: 'message retracted and no longer availabe to the receiver',
      content: message,
    });
  } catch (error) {
    return new ErrorResponse('could not get message at the moment', 404);
  }
};

const getMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.find({ _id: req.params.id });

    if (!message) {
      return res.status(404).json({
        status: 'fail',
        message: 'No message with such id was found',
      });
    }
    return res.status(200).json({
      status: 'success',
      count: message.length,
      content: message,
    });
  } catch (error) {
    return new ErrorResponse('could not get message at the moment', 404);
  }
};

const inboxMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.find({
      receiver: { toString: () => req.user.email },
      status: 'sent',
    });
    return res.status(200).json({
      status: 'success',
      count: message.length,
      content: message,
    });
  } catch (error) {
    return new ErrorResponse('could not get inbox message', 404);
  }
};
const sentMessages = async (req: Request, res: Response) => {
  try {
    const message = await Message.find({
      sender: { toString: () => req.user.email },
      status: 'sent',
    });

    if (!message) {
      return res.status(404).json({
        status: 'fail',
        message: 'Unable to get sent Messages at the moment',
      });
    }
    return res.status(200).json({
      status: 'success',
      count: message.length,
      content: message,
    });
  } catch (error) {
    return new ErrorResponse('could not get sent messages at the moment', 404);
  }
};
const retractedMessages = async (req: Request, res: Response) => {
  try {
    const message = await Message.find({
      sender: { toString: () => req.user.email },
      status: 'retracted',
    });

    if (!message) {
      return res.status(404).json({
        status: 'fail',
        message: 'Unable to get Retracted Messages at the moment',
      });
    }
    return res.status(200).json({
      status: 'success',
      count: message.length,
      content: message,
    });
  } catch (error) {
    return new ErrorResponse(
      'could not get Retracted messages at the moment',
      404
    );
  }
};

const draftMessages = async (req: Request, res: Response) => {
  try {
    const message = await Message.find({
      sender: { toString: () => req.user.email },
      status: 'draft',
    });

    if (!message) {
      return res.status(404).json({
        status: 'fail',
        message: 'Unable to get Draft Messages at the moment',
      });
    }
    return res.status(200).json({
      status: 'success',
      count: message.length,
      content: message,
    });
  } catch (error) {
    return new ErrorResponse('could not get Draft messages at the moment', 404);
  }
};

export default {
  createMessage,
  retractAMessage,
  getMessage,
  inboxMessage,
  sentMessages,
  retractedMessages,
  draftMessages,
};
