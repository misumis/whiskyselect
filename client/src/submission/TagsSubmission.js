import React, { Component } from 'react'
import { Button, TextField, Grid, Typography, Paper } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { postTag, editTag } from "../store/actions/tag";
import connect from 'react-redux/lib/connect/connect';
import { Redirect } from "react-router-dom";

export class TagSubmission extends Component {
  nameInput({ input, meta:{touched, error}, ...custom }){
    const hasError =  touched && error !== undefined;
    return(
      <div>
        <TextField 
          error = {hasError}
          fullWidth
          id="name"
          name="name"
          label="Tag Name"
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
    this.props.match.params.tagId ?
    this.props.editTag({ id: this.props.match.params.tagId, ...values }) 
    :
    this.props.postTag(values)
  }

  handleInitialize() {
    const initData = {
      name: this.props.tag.details.name,
    };
    this.props.initialize(initData);
  }

  componentDidMount() {
    if(this.props.match.params.tagId !== undefined){
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
              <Button variant='contained' type="submit" color='primary'>{this.props.match.params.whiskyId ? "Edit Tag" : "Submit Tag!"}</Button>
              {this.props.tag.posted?<Redirect push to="/" />:null}
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const validate = values => {
  const errors = {};
  if( !values.name || values.name.trim() === "") {
     errors.name = "Name Required";
  }
  return errors;
}

const mapStateToProps = (state) => ({
  tag: state.tag
})
const mapDispatchToProps = (dispatch) => ({
  postTag: (values) => dispatch(postTag(values)),
  editTag: (values) => dispatch(editTag(values))
})
TagSubmission = connect( mapStateToProps, mapDispatchToProps)(TagSubmission)
export default reduxForm  ({
  form: 'tagForm',
  validate
})(TagSubmission)