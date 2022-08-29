import { NextFunction, Request, Response } from 'express';
import Message from '../models/MessageModel';
import Group from '../models/GroupModels';
import ErrorResponse from '../utils/Erromessage';
import People from '../models/peopleModel';

const newGroup = async (req: Request, res: Response, next: NextFunction) => {
  const group = new Group({
    groupAdmin: req.user.id,
    groupName: req.body.groupName,
    members: req.user.id,
  });
  await group.save();
  return res.status(201).json({
    status: 'sucess',
    group,
  });
};

const addMembers = async (req: Request, res: Response, next: NextFunction) => {
  const groupCheck = await Group.findOne({
    _id: req.params.id,
    members: req.body.member,
  });

  if (groupCheck) {
    return next(new ErrorResponse('already a member of the group', 403));
  }

  const newmember = await People.findOne({ email: req.body.member });

  const group = await Group.findOne({ _id: req.params.id });

  if (!group) {
    return new ErrorResponse('No such group', 404);
  }

  if (req.user.id !== group.groupAdmin.toString()) {
    return new ErrorResponse('Only admin can add new members', 403);
  }

  await group.updateOne({ $push: { menbers: newmember?.id } });

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
  const group = await Group.findOne({
    _id: req.params.id,
    members: req.user.id,
  });

  if (!group) {
    return new ErrorResponse(
      'You either do not belong to this group or there is No such group',
      404
    );
  }

  const message = await Message.create({
    sender: req.user.email,
    senderID: req.user.id,
    receiver: group.members,
    receiverID: group.members,
    groupID: group.id,
    status: req.body.status,
    heading: req.body.heading,
    body: req.body.body,
  });
  console.log(group.members);
  await group.updateOne({ $push: { messages: message.id } });
  // await group.updateOne({ $push: { messages: message.id } });

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
) => {
  const group = await Group.findOne({
    _id: req.params.id,
    members: req.user.id,
  })
    .populate('messages')
    .sort();

  if (!group) {
    return new ErrorResponse(
      'You either do not belong to this group or there is No such group',
      404
    );
  }

  return res.status(201).json({
    status: 'success',
    group: group.messages,
  });
};

export default { newGroup, addMembers, sendGroupMessage, getGroupMessage };
