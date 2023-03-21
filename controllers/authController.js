import User from '../models/User.js'
import {BadRequestError,UnAuthenticatedError} from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'

const register  = async(req,res,next) => {
const {name ,email,password }  = req.body
if (!name ||!email || !password ) {
    throw new BadRequestError('plesase provide all values')
}

const emailAlreadyExist = await User.findOne({email})
    if (emailAlreadyExist ) {
throw new BadRequestError ( "the email is already exist ")
    }

    const user  = await User.create({name,email,password})
const token  = user.createJwt()
res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
    } , token ,      location: user.location,


  });        }

const login  = async(req,res) => { 
  const {email,password} = req.body ; 
if (!email || !password) { 
  throw new  BadRequestError('please provide email and password ') 
}

const user  = await User.findOne({email}).select('+password')
if(!user) {
  throw new BadRequestError(' the user is not found ')
}
const passwordIsCorrect = await user.comparePassword(password )
if(!passwordIsCorrect) {
  throw new UnAuthenticatedError('the password is falseeeee ')
}
const token  = user.createJwt()
user.password = undefined
res.status(StatusCodes.OK).json({user,token,userLocation : user.location})


  
  }


const updateUser  = async(req,res) => { res.send("updateUser") }

export {register,login,updateUser}