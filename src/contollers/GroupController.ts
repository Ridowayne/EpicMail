import { NextFunction, Request, Response } from 'express';
import Message from '../models/MessageModel';
import Group from '../models/GroupModels';
import ErrorResponse from '../utils/Erromessage';

const newGroup = async (req: Request, res: Response, next: NextFunction) => {
  const group = new Group({
    groupAdmin: req.user.id,
    groupName: req.body.name,
  });
};

const addMembers = async (req: Request, res: Response, next: NextFunction) => {
  const group = await Group.findById({ _id: req.params.id });

  if (!group) {
    return new ErrorResponse('No such group', 404);
  }

  if (req.user.id !== group.groupAdmin.toString()) {
    return new ErrorResponse('Only admin can add new members', 403);
  }
  await group.updateOne({ menbers: req.body.members });

  return res.status(201).json({
    status: 'success',
    content: group,
  });
};

const sendGroupMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const group = await Group.findOne({ _id: req.params.id });

  if (!group) {
    return new ErrorResponse('No such group', 404);
  }

  const message = await Message.create({
    sender: req.user.email,
    senderID: req.user.id,
    receiver: req.body.receiver,
    groupID: group.id,
    status: req.body.status,
    heading: req.body.heading,
    body: req.body.body,
  });
  await group.updateOne({ messages: message.id });

  res.status(201).json({
    status: 'success',
    group: group,
    message,
  });
};

const getGroupMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
