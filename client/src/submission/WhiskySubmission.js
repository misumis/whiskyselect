import React, { Component } from 'react'
import { Button, TextField, Grid, Typography, Paper } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { postWhisky, editWhisky } from "../store/actions/whisky";
import connect from 'react-redux/lib/connect/connect';
import { Redirect } from "react-router-dom";

export class WhiskySubmission extends Component {
  nameInput({ input, meta:{touched, error}, ...custom }){
    const hasError =  touched && error !== undefined;
    return(
      <div>
        <TextField 
          error = {hasError}
          fullWidth
          id="name"
          name="name"
          label="Whisky Name"
          InputLabelProps={{
          shrink: true
          }}
          margin="normal"
          {...input}
          {...custom} />
        {hasError && <Typography color='error'>{error}</Typography>}
      </div>)
  }

  ageInput({ input, meta:{touched, error}, ...custom }){
    const hasError =  touched && error !== undefined;
    return(
      <div>
        <TextField 
          error = {hasError}
          fullWidth
          type='number'
          id="age"
          name="age"
          label="Whisky age"
          InputLabelProps={{
          shrink: true
          }}
          margin="normal"
          {...input}
          {...custom} />
        {hasError && <Typography color='error'>{error}</Typography>}
      </div>)
  }

  descriptionInput({ input, meta:{touched, error}, ...custom }){
    const hasError =  touched && error !== undefined;
    return(
      <div>
        <TextField 
          error = {hasError}
          fullWidth
          multiline
          id="description"
          name="description"
          label="Description"
          InputLabelProps={{
          shrink: true
          }}
          margin="normal"
          {...input}
          {...custom} />
        {hasError && <Typography color='error'>{error}</Typography>}
      </div>)
  }
  pictureUrlInput({ input, meta:{touched, error}, ...custom }){
    const hasError =  touched && error !== undefined;
    return(
      <div>
        <TextField 
          error = {hasError}
          fullWidth
          id="pictureUrl"
          name="pictureUrl"
          label="PictureUrl"
          InputLabelProps={{
          shrink: true
          }}
          margin="normal"
          {...input}
          {...custom} />
        {hasError && <Typography color='error'>{error}</Typography>}
      </div>)
  }

  submit = ( values ) => {
    this.props.match.params.whiskyId ?
    this.props.editWhisky({ id: this.props.match.params.whiskyId, ...values }) 
    :
    this.props.postWhisky(values)
  }
  checkIfExists = async (img, pictureUrl) => {
    let promise = new Promise((resolve, reject) => {
      
      img.onload = () => {
        this.setState({pictureUrl})
      };
      img.onerror = () => {
        this.setState({pictureUrl:""})
      };
    })
    let result = promise;
  }

  previewImage = e => {
    let pictureUrl = e.currentTarget.defaultValue;
    var img = new Image();
    img.src = pictureUrl;
    this.checkIfExists(img, pictureUrl);
    
  }

  handleInitialize() {
    const initData = {
      name: this.props.whisky.details.name,
      age: this.props.whisky.details.age,
      description: this.props.whisky.details.description,
      pictureUrl: this.props.whisky.details.pictureUrl,
    };
    this.props.initialize(initData);
  }


  constructor(){
    super();
    this.state={
    pictureUrl:""
    }
  }
  componentDidMount() {
    if(this.props.match.params.whiskyId !== undefined){
      this.handleInitialize();
    }
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <Grid container justify='center'>
        <Grid xs={12} sm ={8} md={6} item>
          <Paper style={{padding: "32px 16px"}} >
            <form onSubmit={handleSubmit(this.submit)}>
                <Field name="name" component={this.nameInput} />
                <Field name="age" component={this.ageInput} />
                <Field name="description" component={this.descriptionInput} />
                <Field name="pictureUrl" onChange={e => this.previewImage(e)} onBlur={e => this.previewImage(e)} component={this.pictureUrlInput} />
                {this.state.pictureUrl? <img src={this.state.pictureUrl} alt="preview" style={{width:"100%"}}/>:null}
              <Button variant='contained' type="submit" color='primary'>{this.props.match.params.whiskyId ? "Edit Whisky" : "Submit Whisky!"}</Button>
              {this.props.whisky.posted?<Redirect push to="/" />:null}
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const validate = values => {
  const errors = {};
  var img = new Image();
  img.src = values.pictureUrl;

  if( !values.name || values.name.trim() === "") {
     errors.name = "Name Required";
  }
  if( !values.age || values.age === "") {
     errors.age = "Age Required";
  }
  if( !values.description || values.description.trim() === "") {
     errors.description = "Description Required";
  }
  if( !values.pictureUrl || values.pictureUrl.trim() === "") {
     errors.pictureUrl = "Picture Url Required";
  }
  return errors;
}

const mapStateToProps = (state) => ({
  whisky: state.whisky
})
const mapDispatchToProps = (dispatch) => ({
  postWhisky: (values) => dispatch(postWhisky(values)),
  editWhisky: (values) => dispatch(editWhisky(values))
})
WhiskySubmission = connect( mapStateToProps, mapDispatchToProps)(WhiskySubmission)
export default reduxForm  ({
  form: 'whiskyForm',
  validate
})(WhiskySubmission)