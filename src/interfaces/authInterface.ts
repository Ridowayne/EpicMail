import {Document, Types} from 'mongoose';

export default interface IUser extends Document {
    _id?: Types.ObjectId;
    name: string;
    phoneNumber: number;
    password: string
    email: string
}