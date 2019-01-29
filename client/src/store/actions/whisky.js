import actions from '../actions/constants'

export const getWhisky = () => dispatch => {
  return dispatch( (dispatch) => {
    dispatch({type: actions.FETCH_WHISKY_PENDING})
    fetch( "/whisky" , { method:"GET" })
      .then(res => res.json())
      .then(response => dispatch({type: actions.FETCH_WHISKY_FULFILLED, payload:response}))
      .catch(err => dispatch({type: actions.FETCH_WHISKY_REJECTED, payload: err}))
  })
}

export const postWhisky = ({name, age, description, pictureUrl}) => dispatch => {
  return dispatch( dispatch => {
    dispatch({type:actions.POST_WHISKY_PENDING})
    fetch('/whisky',
    {
      method:"POST",
      body:JSON.stringify({name: name, age: age, description: description, pictureUrl: pictureUrl}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(message => {dispatch({type: actions.POST_WHISKY_FULFILLED}); dispatch({type: actions.OPEN_SNACKBAR, payload:message});})
      .catch(err => dispatch({type: actions.POST_WHISKY_REJECTED, payload: err}))
  })
}

export const editWhisky = ({id, name, age, description, pictureUrl}) => dispatch => {
  return dispatch( dispatch => {
    dispatch({type:actions.PUT_WHISKY_PENDING})
    fetch(`/whisky/${id}`,
    {
      method:"PUT",
      body:JSON.stringify({ name: name, age: age, description: description, pictureUrl: pictureUrl }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(message => {dispatch({type: actions.PUT_WHISKY_FULFILLED}); dispatch({type: actions.OPEN_SNACKBAR, payload:message});})
      .catch(err => dispatch({type: actions.PUT_WHISKY_REJECTED, payload: err}))
  })
}

export const getWhiskyDetails = (id) => dispatch => {
  return dispatch( (dispatch) => {
    dispatch({type: actions.FETCH_WHISKY_DETAILS_PENDING})
    fetch( "/whisky/" + id , { 
      method:"GET",
      headers: {
        "Content-Type": "application/json"
      } 
    })
      .then(res => res.json())
      .then(response => dispatch({type: actions.FETCH_WHISKY_DETAILS_FULFILLED, payload:response}))
      .catch(err => dispatch({type: actions.FETCH_WHISKY_DETAILS_REJECTED, payload: err}))
  })
}

export const deleteWhisky = (id) => dispatch => {
  return dispatch( (dispatch) => {
    dispatch({type: actions.DELETE_WHISKY_PENDING})
    fetch( "/whisky/" + id , { 
      method:"DELETE",
      headers: {
        "Content-Type": "application/json"
      } 
    })
      .then(res => res.json())
      .then(message => {dispatch({type: actions.DELETE_WHISKY_FULFILLED}); dispatch({type: actions.OPEN_SNACKBAR, payload:message});})
      .catch(err => dispatch({type: actions.DELETE_WHISKY_REJECTED, payload: err}))
  })
}
