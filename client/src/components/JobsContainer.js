import Loading from "./Loading";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, page, totalJobs,
    search,
    searchStatus,
    searchType,
    sort, numOfPages} = useAppContext();

  useEffect(() => { getJobs() },[ search, searchStatus, searchType, sort,page])

  if(isLoading) {
    return <Loading center={true}/>
  }

  if(jobs.length===0) {
    return <Wrapper>
        <h1> no jobs to display</h1>
         </Wrapper>
  }

  return (
    <Wrapper>
<h1>
{jobs.length} job{jobs.length>1 && 's'}  found
</h1>

<div className='jobs'>

{
 jobs.map((job,id) => { 
    return <Job key={id} {...job}/>
  })
  }
  </div>
  {numOfPages > 1 && <PageBtnContainer />}

{/* pagination buttons */}
    </Wrapper>
  );
};

export default JobsContainer;
