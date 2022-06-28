import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import mongoose from 'mongoose'
import { config } from './config/config'
import messagageRoutes from './routes/messageRoutes'
import authenticate from './routes/authRoutes'



dotenv.config({ path: './config.env' })
const app = express()

// async  () => {
//   await mongoose.connect(config.mongo.url).then(() => {
//     console.log('connected to the database successfully')
// }).catch(error => {
//     console.log(error)
// })
// }

// connect to mongo db
mongoose.connect(config.mongo.url).then(() => {
    console.log('connected to the database successfully')
}).catch(error => {
    console.log(error)
})

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routes
app.use('/mail', messagageRoutes);
app.use('/users', authenticate);
// error handling
// app.use((req, res, next) => {
//    const error = new Error('not found');
//    console.log(error)

//    return res.status(404).json({
//     status: 'fail',
//     message: error.message
//  })
// })
const port = process.env.PORT ||9090
// ? Number(process.env.PORT) : 1337
http.createServer(app).listen(port, () => {
  console.log(`server is up and running on port ${port}...`)  
})