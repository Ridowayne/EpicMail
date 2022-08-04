import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/Erromessage';

export const getMany = (Model: any, page: any, limit: any) => {
  async (req: Request, res: Response, next: NextFunction) => {
    const docs = await Model.find().limit(limit).select('-password');
    return res.status(200).json({
      status: 'sucess',
      users: docs,
    });
  };
};

export const getOne = (Model: any) => {
  async (req: Request, res: Response, next: NextFunction) => {
    const docs = await Model.findOneById({ _id: req.params.id }).select(
      '-password'
    );

    if (!docs) {
      return next(new ErrorResponse('No document found with that ID', 404));
    }
    return res.status(200).json({
      status: 'sucess',
      users: docs,
    });
  };
};
