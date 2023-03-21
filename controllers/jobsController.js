const createJob = async (req, res) => {
    const m  = 1+1
    console.log(m) 

    res.send("createJob");
};
const updateJob = async (req, res) => {
    res.send("updateJob");
};
const deleteJob = async (req, res) => {
    res.send("deleteJob");
};
const getAllJobs = async (req, res) => {
    res.send("getAllJobs");
};
const showStats = async (req, res) => {
    res.send("showStats");
};

export { createJob, updateJob, deleteJob, getAllJobs, showStats };
