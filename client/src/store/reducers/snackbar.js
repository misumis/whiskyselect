import actions from '../actions/constants'

const initialState = {
    open: false,
    message: "",
}

export const snackbarReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case actions.OPEN_SNACKBAR:
    return { 
        ...state,  
        open:true,
        statusCode:payload.statusCode,
        message:payload.message,
    }
  case actions.CLOSE_SNACKBAR:
    return {
        ...state,
        open: false,
        message:""
    }
  default:
    return state
  }
}
