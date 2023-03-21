//the application under stands this is the erro middleware from the error parameter 
import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err,req,res,next) => { 
console.log(err)
const defaultError = {
    //err.statusCode comes from Error Object 

  status :err.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR , 
  //message comes from Error Object 
  msg :err.message||'there was an error in the server '
}
//mongodb validation error 
if (err.name === 'ValidationError') {
  defaultError.statusCode = StatusCodes.BAD_REQUEST
  // defaultError.msg = err.message
  defaultError.msg = Object.values(err.errors)
    .map((item) => item.message)
    .join(',')
}
//mongodb validation error 
//if its exist and the value is 11000
if (err.code && err.code === 11000) {
  defaultError.statusCode = StatusCodes.BAD_REQUEST
  defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
}

  return  res.status(defaultError.status).send({msg:defaultError.msg })
 }

 export default errorHandlerMiddleware