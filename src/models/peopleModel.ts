import mongoose, { Schema } from "mongoose";
import validator from "validator";
import IUser from "../interfaces/authInterface";




const peopleSchema: Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String, 
        required: true
    },
    phoneNumber: {
        type: Number, 
        required: true,
        unique: true, 
        // validate: [validator.isMobilePhone, 'kindly provide a valid mobile number']
    },
    active: {
        type: Boolean, 
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'owner'],
        default: 'user'
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: [validator.isEmail, 'kindly provide a valid email address']
    },
    userGroups:[{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }

},
{
    timestamps: true
})

export default mongoose.model<IUser>('PEOPLE', peopleSchema)