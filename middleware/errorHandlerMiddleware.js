const errorHandlerMiddleware = (error,req,res,next) => { 

    console.log(error)
    res.send("error occured in the server ")
 }

 export default errorHandlerMiddleware