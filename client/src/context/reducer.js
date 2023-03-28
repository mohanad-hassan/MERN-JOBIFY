import {DISPLAY_ALERT,CLEAR_ALRET ,REGISER_UESR_BEGIN,REGISER_UESR_SUCCESS,REGISER_UESR_ERROR,LOGIN_UESR_BEGIN,LOGIN_UESR_SUCCESS,LOGIN_UESR_ERROR,TOGGLE_SIDEBAR,LOGOUT_USER,UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,UPDATE_USER_ERROR,HANDLE_CHANGE,CLEAR_VALUES,CREATE_JOB_BEGIN,CREATE_JOB_ERROR,CREATE_JOB_SUCCESS,GET_JOBS_BEGIN,GET_JOBS_SUCCESS,SET_EDIT_JOB} from'./actions'

import { initialState } from './appContext';

export const reducer  = (state,action ) => { 


    if (action.type === DISPLAY_ALERT) {
        return {
          ...state,
          showAlert: true,
          alertType: 'danger',
          alertText: 'Please provide all values!',
        };
      }
    if (action.type === CLEAR_ALRET) {
        return {
          ...state,
          showAlert: false,
          alertType: '',
          alertText: '',
        };
      }
    if (action.type === REGISER_UESR_BEGIN) {
        return {
          ...state,
      isLoading:true
        };
      }
    if (action.type === REGISER_UESR_ERROR) {
        return {
          ...state,
      isLoading:false , 
      showAlert:true ,
      alertType:'danger',
      alertText:action.payload.msg
        };
      }
    if (action.type === REGISER_UESR_SUCCESS) {
        return {
          ...state,
      isLoading:false , 
      showAlert:true ,
      alertType:'success',
      alertText:'user Created  , Redirecting ',
      user :action.payload.user,
      token :action.payload.token,
      userKocation :action.payload.location,
      jobLocation :action.payload.location,
        };}

        if (action.type === LOGIN_UESR_BEGIN) {
          return {
            ...state,
        isLoading:true
          };
        }


    

      if (action.type === LOGIN_UESR_SUCCESS) {
          return {
            ...state,
        isLoading:false , 
        showAlert:true ,
        alertType:'success',
        alertText:'user LoggedIn  , Redirecting ',
        user :action.payload.user,
        token :action.payload.token,
        userKocation :action.payload.location,
        jobLocation :action.payload.location,
          };
        }
  


        if (action.type === LOGIN_UESR_ERROR) {
          return {
            ...state,
        isLoading:false , 
        showAlert:true ,
        alertType:'danger',
        alertText:action.payload.msg
          };
        }
        if (action.type === TOGGLE_SIDEBAR) {
          return {
            ...state,
            showSidebar:!state.showSidebar
          };
        }

        if (action.type === LOGOUT_USER) {
          return {
            ...initialState,
            token:null ,
            user:null ,
            userLocation:null ,
            jobLocation:null
          };
        }

        if (action.type === UPDATE_USER_BEGIN) {
          return { ...state, isLoading: true };
        }
        if (action.type === UPDATE_USER_SUCCESS) {
          return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
          };
        }
        if (action.type === UPDATE_USER_ERROR) {
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
          };
        }

        if (action.type === HANDLE_CHANGE) {
          return {
            ...state,
            [action.payload.key]:action.payload.value
          };
        }

        if (action.type === CLEAR_VALUES) {
          return {
            ...state,
            isEditing:false,
            editJobId:'',
            position:'',
            company:''
            ,jobType:'full-time' ,
            status:'pending',
            jobLocation: state.userLocation||'',
            
          
          };
        }

        if (action.type === CREATE_JOB_BEGIN) {
          return { ...state, isLoading: true };
        }
      
        if (action.type === CREATE_JOB_SUCCESS) {
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created!',
          };
        }
        if (action.type === CREATE_JOB_ERROR) {
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
          };
        }

        if (action.type === GET_JOBS_BEGIN) {
          return {
            ...state,
            isLoading: true,
            showAlert: false,
          
          };
        }

        if (action.type === GET_JOBS_SUCCESS) {
          return {
            ...state,
            isLoading: false,
          numOfPages:action.payload.numOfPages ,
          jobs:action.payload.jobs,
          totalJobs:action.payload.totalJobs
          };
        }

        if (action.type === SET_EDIT_JOB) {
          const job = state.jobs.find((job) => job._id === action.payload.id);
          const { _id, position, company, jobLocation, jobType, status } = job;
          return {
            ...state,
            isEditing: true,
            editJobId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status,
          };
        }


      throw new Error(`no such action : ${action.type}`);
    }

