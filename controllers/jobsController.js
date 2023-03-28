import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
} from '../errors/index.js';
import mongoose from 'mongoose';
import checkPermissions from '../utils/checkPermissions.js';


const createJob = async (req, res) => {
    const { position, company } = req.body;

    if (!position || !company) {
        throw new BadRequestError('Please provide all values');
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {

const {id:jobID} = req.params ;
const {company,position} = req.body ;

if(!company || !position) {
    throw new BadRequestError("please provide all values") ;
}
const job  = await Job.findOne({_id:jobID})
if(!job) {
    throw new NotFoundError(` no job with id${jobID} was found `)
}

checkPermissions(req.user,job.createdBy)
const updateJob  =await Job.findOneAndUpdate({_id:jobID},req.body,{new:true,runValidators:true})
res.status(StatusCodes.OK).json(updateJob)
};
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;

    const job = await Job.findOne({ _id: jobId });
  
    if (!job) {
      throw new NotFoundError(`No job with id : ${jobId}`);
    }
  
    checkPermissions(req.user, job.createdBy);
  console.log(job)
    await Job.deleteOne({_id:job._id});
    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });};

const getAllJobs = async (req, res) => {

const jobs  = await Job.find({createdBy:req.user.userId})
res.status(StatusCodes.OK).json({jobs,totalJobs:jobs.length , numOfPages:1})

};
const showStats = async (req, res) => {
    res.send("showStats");
};

export { createJob, updateJob, deleteJob, getAllJobs, showStats };
