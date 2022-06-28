import { NextFunction, Request, Response } from "express";
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import People from "../models/peopleModel";
import signJWT from "../functions/signJWT";
import IUser from "../interfaces/authInterface";


const register = async (req: Request, res: Response, Next: NextFunction) => {


    try {

        let {name, phoneNumber, password, email} = req.body

      bcrypt.hash(password, 10, async (hashError, hash) => {
        if (hashError) {
            res.status(500).json({
                message: hashError.message,
                error: hashError
            })
        }

        const _user = new People({
            _id: new mongoose.Types.ObjectId(),
            name,
            password: hash,
            email,
            phoneNumber
            
        });       
        
    await _user.save()

        

        

        signJWT(_user, (error, token) => {

            if (error) {
                return res.status(401).json({
                    message: 'Unauthorized',
                    error: error
                });
            }
            return res.status(200).json({
                _id: _user._id,
                name: _user.name,
                email: _user.email,
                token: token
            })
    
        })
       
    })
        
    } catch (error) {
        return res.status(500).json({
                message: 'internal server Error',
                error: error
            })
    }
    
};

const login =  async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Kindly provide a valid email and password" });

        const user = await People.findOne({ email: req.body.email }).exec();

        if (!user) return res.status(401).json({ message: "Email or Password is Wrong!" })

        // console.log(user.password)

        const isPasswordValid = await bcrypt.compare(password, user.password);            

        if (!isPasswordValid) return res.status(401).json({ message: "Email or Password is Wrong oooo!" })

        signJWT(user, (error, token) => {

            if (error) {
                console.log(error)
                return res.status(401).json({
                    message: 'Unauthorized',
                    error: error
                });
            }
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token
            })
    
        }) 
    

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const forgotPassword =(req: Request, res: Response, next: NextFunction) => {
    try {
        let email = req.body.email
        if (!email) return res.status(404).json({message: 'kindly provide your email before sending'})

        const user = People.findOne({email}).exec()
        if (!user) {
            return res.status(404).json({message: 'There is no user with the email submitted confirm it is the correct email or signup again'})
        }

        const resetToken = crypto.randomBytes(32).toString('hex');

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


const getAllUsers = (req: Request, res: Response, Next: NextFunction) => {
    try {
        const allUsers = People.find()
        return res.status(200).json({
            status: 'sucess',
            users: allUsers
        })        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

};

export default{ register, login, getAllUsers, forgotPassword };