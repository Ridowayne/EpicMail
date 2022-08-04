import { NextFunction, Request, Response } from 'express';
import Message from '../models/MessageModel';
import ErrorResponse from '../utils/Erromessage';

const getMany = (query: any) => {
  async (req: Request, res: Response, next: NextFunction) => {
    return await Message.find({ query });
  };
};

const getall = async () => {
  let result = await Message.find();
  return result;
};
const getOne = (Model: any) => {
  async (req: Request, res: Response, next: NextFunction) => {
    const docs = await Model.findOneById({ _id: req.params.id });

    if (!docs) {
      return next(new ErrorResponse('No document found with that ID', 404));
    }
    return res.status(200).json({
      status: 'sucess',
      users: docs,
    });
  };
};

export default { getMany, getOne, getall };
