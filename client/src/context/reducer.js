import {DISPLAY_ALERT,CLEAR_ALRET} from'./actions'


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

      throw new Error(`no such action : ${action.type}`);
    }

