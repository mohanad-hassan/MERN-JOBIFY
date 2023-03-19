import { useState, useEffect, createContext, useContext, useReducer, useRef } from "react";
import { reducer } from "./reducer";
import {DISPLAY_ALERT,CLEAR_ALRET} from'./actions'


const initialState = {
    isLoading: true,
    showAlert: false,
    alertText: "TEST",
    alertType: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state,dispatch]  = useReducer(reducer,initialState) 

const displayAlert  = () => { 
dispatch({type:DISPLAY_ALERT})
 }

 const clearAlert = () => { 
    setTimeout(() => {     dispatch({type:CLEAR_ALRET})
},3000)
  }

    return (
        <AppContext.Provider
            value={{
                ...state,displayAlert,clearAlert
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
