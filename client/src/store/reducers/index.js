import {combineReducers} from 'redux';
import whiskyReducer from './whisky';
import { snackbarReducer } from "./snackbar";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  form: formReducer,
  whisky: whiskyReducer,
  snackbar: snackbarReducer
})