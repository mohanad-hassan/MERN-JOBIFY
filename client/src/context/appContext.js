import React, { useState, useEffect, createContext, useContext, useReducer, useRef } from "react";
import { reducer } from "./reducer";
import {DISPLAY_ALERT,CLEAR_ALRET ,REGISER_UESR_BEGIN,REGISER_UESR_SUCCESS,REGISER_UESR_ERROR,LOGIN_UESR_BEGIN,LOGIN_UESR_SUCCESS,LOGIN_UESR_ERROR,TOGGLE_SIDEBAR,LOGOUT_USER,UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,UPDATE_USER_ERROR,HANDLE_CHANGE, CLEAR_VALUES,CREATE_JOB_BEGIN,CREATE_JOB_ERROR,CREATE_JOB_SUCCESS,GET_JOBS_BEGIN,GET_JOBS_SUCCESS,SET_EDIT_JOB} from'./actions'
import axios from 'axios'


const user  = localStorage.getItem('user')
const token  = localStorage.getItem('token')
const userLocation  = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "TEST",
    alertType: "",
    user:user?JSON.parse(user):null ,
    token:token||null ,
    userLocation : userLocation||'' , 
    showSidebar:false ,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation||'',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs:[] ,
    totalJobs:0,
    page:1,
    numOfPages:1
    
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state,dispatch]  = useReducer(reducer,initialState) 

// axios
const authFetch = axios.create({
    baseURL: '/api/v1',headers:{Authorization:`Bearer ${state.token}`}
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

const displayAlert  = () => { 
dispatch({type:DISPLAY_ALERT})
 }

 const clearAlert = () => { 
    setTimeout(() => {     dispatch({type:CLEAR_ALRET})
},3000)
  }

  const addUsertoLocalStorage  = ({user,token , location}) => { 
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('location',location)
   }

   const removeUserFromLocalStorage  = () => { 
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
   }


  const registerUser  = async(currentUser) => { 
dispatch({type:REGISER_UESR_BEGIN})
try {
    const response  = await  axios.post('/api/v1/auth/register',currentUser)
    const data = await response.data
    dispatch({type:REGISER_UESR_SUCCESS,payload:data})
    const {user,location,token}  = data
    addUsertoLocalStorage({user,token,location})

} catch (error) {
    const msg  = error.response.data.msg
    console.log({error})
    dispatch({type:REGISER_UESR_ERROR,payload:{msg}})
}
   }

   const loginUser  = async (currentUser) => { 
dispatch({type:LOGIN_UESR_BEGIN})
try {
    const response  = await  axios.post('/api/v1/auth/login',currentUser)
    const data = await response.data
    dispatch({type:LOGIN_UESR_SUCCESS,payload:data})
    const {user,location,token}  = data
    addUsertoLocalStorage({user,token,location})
} catch (error) {
    const msg  = error.response.data.msg
    dispatch({type:LOGIN_UESR_ERROR,payload:{msg:msg||'no error i can see '}})
}
    }



     const toggleSidebar = () => { 
        dispatch({type:TOGGLE_SIDEBAR})
      }

     const logoutUser = () => { 
        dispatch({type:LOGOUT_USER})
        removeUserFromLocalStorage()
      }

      const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
          const { data } = await authFetch.patch('/auth/updateUser', currentUser);
          const { user, location } = data;
    
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { user, location },
          });
        } catch (error) {
          if (error.response.status !== 401) {
            dispatch({
              type: UPDATE_USER_ERROR,
              payload: { msg: error.response.data.msg },
            });
          }
          logoutUser()
        }
        clearAlert();
      };
    
      const handleChange = (key,value) => { 
        dispatch({type:HANDLE_CHANGE,payload:{key,value}})
       }

      const clearValues = (key,value) => { 
        dispatch({type:CLEAR_VALUES,})
       }

       const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN });
        try {
          const { position, company, jobLocation, jobType, status } = state;
          await authFetch.post('/jobs', {
            position,
            company,
            jobLocation,
            jobType,
            status,
          });
          dispatch({ type: CREATE_JOB_SUCCESS });
          dispatch({ type: CLEAR_VALUES });
        } catch (error) {
          if (error.response.status === 401) return;
          dispatch({
            type: CREATE_JOB_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
        clearAlert();
      };

      const getJobs =async () => { 
        let url = `/jobs`
        dispatch({type:GET_JOBS_BEGIN})
        try {
          const {data}  = await authFetch(url)
          const {jobs,numOfPages,totalJobs} = data;
          dispatch({type:GET_JOBS_SUCCESS,payload:{jobs,numOfPages,totalJobs}})
        } catch (error) {
          console.log(error.response)
          //logoutUser()
        }
        clearAlert()
       }

       const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
      }
      const editJob = () => {
        console.log('edit job')
      }

const    deleteJob=(id) => { console.log(`deleteJob${id}`) }

    return (
        <AppContext.Provider
            value={{
                ...state,displayAlert,clearAlert,registerUser, loginUser,logoutUser,toggleSidebar,updateUser,handleChange,clearValues,createJob,getJobs,setEditJob,deleteJob,editJob
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
