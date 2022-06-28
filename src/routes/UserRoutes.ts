import express from 'express';
import * as conroller from './../contollers/UserController'
const router = express.Router()
const app = express()

 app.post('/signup', conroller.createUser)
 app.post('/login', conroller.loginUser)

export = router;