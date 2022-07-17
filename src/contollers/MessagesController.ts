import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Message, { IMail } from './../models/MessageModel';

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newmail = new Message({
    sender: req.body.sender,
    receiver: req.body.receiver,
    status: req.body.status,
    heading: req.body.heading,
    body: req.body.body,
  });
  return newmail
    .save()
    .then((newmail) => res.status(200).json({ newmail }))
    .catch((error) => res.status(500).json({ error }));
};

export default { createMessage };
