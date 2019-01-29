import actions from '../actions/constants'

export const getTags = () => dispatch => {
  return dispatch( (dispatch) => {
    dispatch({type: actions.FETCH_TAG_PENDING})
    fetch( "/tag" , { method:"GET" })
      .then(res => res.json())
      .then(response => dispatch({type: actions.FETCH_TAG_FULFILLED, payload:response}))
      .catch(err => dispatch({type: actions.FETCH_TAG_REJECTED, payload: err}))
  })
}

export const postTag = ({name}) => dispatch => {
  return dispatch( dispatch => {
    dispatch({type:actions.POST_TAG_PENDING})
    fetch('/tag',
    {
      method:"POST",
      body:JSON.stringify({name: name}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(message => {dispatch({type: actions.POST_TAG_FULFILLED}); dispatch({type: actions.OPEN_SNACKBAR, payload:message});})
      .catch(err => dispatch({type: actions.POST_TAG_REJECTED, payload: err}))
  })
}

export const editTag = ({id, name}) => dispatch => {
  return dispatch( dispatch => {
    dispatch({type:actions.PUT_TAG_PENDING})
    fetch(`/tag/${id}`,
    {
      method:"PUT",
      body:JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(message => {dispatch({type: actions.PUT_TAG_FULFILLED}); dispatch({type: actions.OPEN_SNACKBAR, payload:message});})
      .catch(err => dispatch({type: actions.PUT_TAG_REJECTED, payload: err}))
  })
}

export const deleteTag = (id) => dispatch => {
  return dispatch( (dispatch) => {
    dispatch({type: actions.DELETE_TAG_PENDING})
    fetch( "/tag/" + id , { 
      method:"DELETE",
      headers: {
        "Content-Type": "application/json"
      } 
    })
      .then(res => res.json())
      .then(message => {dispatch({type: actions.DELETE_TAG_FULFILLED}); dispatch({type: actions.OPEN_SNACKBAR, payload:message});})
      .catch(err => dispatch({type: actions.DELETE_TAG_REJECTED, payload: err}))
  })
}

export const disableFilter = () => dispatch => {
  return dispatch ( (dispatch) => {
    dispatch({type: actions.DISABLE_FILTER})
  })
}

export const filterByTag = (id) => dispatch => {
  return dispatch( (dispatch) => {
    dispatch({type: actions.FILTER_BY_TAG_ID, payload:id });
    dispatch({type: actions.FETCH_WHISKY_TAGS_PENDING})
    fetch( "/whiskytags?id=" + id , { 
      method:"GET",
      headers: {
        "Content-Type": "application/json"
      } 
    })
      .then(res => res.json())
      .then(response => dispatch({type: actions.FETCH_WHISKY_TAGS_FULFILLED, payload:response}))
      .catch(err => dispatch({type: actions.FETCH_WHISKY_TAGS_REJECTED, payload: err}))
  })
}
