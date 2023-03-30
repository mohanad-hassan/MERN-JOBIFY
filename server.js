
//important NOTE to use import and export we used "type":"module" in package.json
import 'express-async-errors'  // this like require('express-async-errors') will execute the code .
import express  from "express"
import morgan from 'morgan'
//cors package to make frontend communicate with backend  (to accept all cors headers )
// import cors from 'cors'
//don't forget .js or it will not work 
import notFoundMiddleware from "./middleware/notFoundMiddleware.js"
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import dotenv from 'dotenv'
// mongodb connect 
import connectDB from "./db/connect.js"
//Routers
import authRouter  from './routes/authRoutes.js'
import jobsRouter  from './routes/jobsRouter.js'
import authenticateUser from './middleware/auth.js'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app  = express()
dotenv.config()
//this line is so important to allow communicate between backend and front end 
// app.use(cors())
const port = process.env.PORT || 5000

if (process.env.NODE_ENV !=='production'){
    app.use(morgan('dev'))
}
//to parse json from the request 
app.use(express.json())


//Routes
// app.get('/', (req,res) => {
//     //when you throw error it goes out from this route and go to errorHandlerMiddleware function in app.use
//     //throw new Error()

//     res.json({msg:"WELCOME to MERN PROJECT"}) })
app.get('/api/v1', (req,res) => {

    res.json({msg:"WELCOME to MERN PROJECT"}) })

    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/jobs',authenticateUser,jobsRouter)

    // only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

// only when ready to deploy
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});





//middleware
//the order is so important don't forget to put error handler in the end .
//notFound have to be after all Routes .

app.use (notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start  = async() => { 

    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port , () => { console.log(`the server ih listening on port   ${port}`) })
    } catch (error) {
        console.log(error)
    }
 }

start()