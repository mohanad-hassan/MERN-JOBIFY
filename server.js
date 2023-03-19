
//important NOTE to use import and export we used "type":"module" in package.json

import express  from "express"
//don't forget .js or it will not work 
import notFoundMiddleware from "./middleware/notFoundMiddleware.js"
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import dotenv from 'dotenv'
// mongodb connect 
import connectDB from "./db/connect.js"
//Routers
import authRouter  from './routes/authRoutes.js'
import jobsRouter  from './routes/jobsRouter.js'
const app  = express()
dotenv.config()
const port = process.env.PORT || 5000

//to parse json from the request 
app.use(express.json())


//Routes
app.get('/', (req,res) => {
    //when you throw error it goes out from this route and go to errorHandlerMiddleware function in app.use
    //throw new Error()

    res.send("WELCOME to MERN PROJECT") })

    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/jobs',jobsRouter)






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