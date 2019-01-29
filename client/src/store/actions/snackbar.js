import actions from '../actions/constants'

export const closeSnackbar = () => dispatch => {
  dispatch({type: actions.CLOSE_SNACKBAR})
}
