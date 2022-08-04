import { NextFunction, Request, Response } from 'express';
import People from '../models/peopleModel';
import ErrorResponse from '../utils/Erromessage';
import Message, { IMail } from './../models/MessageModel';
import services from '../services/message.services';

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receiverInfo = await People.findOne({ email: req.body.receiver });
  if (!receiverInfo) {
    return new ErrorResponse(
      'There is no user with such email, kindly confirm the email address',
      404
    );
  }
  const newmail = new Message({
    sender: req.user.email,
    senderID: req.user.id,
    receiver: req.body.receiver,
    receiverID: receiverInfo.id,
    status: req.body.status,
    heading: req.body.heading,
    body: req.body.body,
  });
  return await newmail
    .save()
    .then((newmail) => res.status(201).json({ newmail }))
    .catch((error) => res.status(500).json({ error }));
};

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

    if (req.user.id !== message.senderID.toString()) {
      return res.status(401).json({
        status: 'fail',
        message:
          'Only the sender can retract this message but you can delete if you do not wish to see it',
      });
    }
    await message.updateOne({ retracted: 'true' });
    return res.status(200).json({
      status: 'success',
      report:
        'message retracted and no longer availabe to be viewed by the receiver',
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
      content: message,
    });
  } catch (error) {
    return new ErrorResponse('could not get message at the moment', 404);
  }
};

const inboxMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.find({
      // receiver: { toString: () => req.user.email },
      receiverID: req.user.id,
      status: 'sent',
      retracted: false,
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
    const query = { senderID: req.user.id, status: 'sent' }.toString;
    const message = await Message.find({
      senderID: req.user.id,
      status: 'sent',
    });

    return res.status(200).json({
      status: 'success',

      content: message,
    });
  } catch (error) {
    return new ErrorResponse('could not get sent messages at the moment', 404);
  }
};

const retractedMessages = async (req: Request, res: Response) => {
  try {
    const message = await Message.find({
      senderID: req.user.id,
      retracted: true,
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
      senderID: req.user.id,
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

// const query = {
//   receiverID: req.user.id,
//   status: 'sent',
//   retracted: false,
// };

// const inbox = services.getMany(query);
