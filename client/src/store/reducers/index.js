import {combineReducers} from 'redux';
import whiskyReducer from './whisky';
import { snackbarReducer } from "./snackbar";
import { reducer as formReducer } from "redux-form";
import tagReducer from './tag';

export default combineReducers({
  form: formReducer,
  tag: tagReducer,
  whisky: whiskyReducer,
  snackbar: snackbarReducer
})