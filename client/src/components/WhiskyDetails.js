import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWhiskyDetails, deleteWhisky } from "../store/actions/whisky";
import { Typography, Grid, CardContent, CardHeader, Card, CardMedia, IconButton } from '@material-ui/core';
import { Edit, Delete } from "@material-ui/icons"
import EMPTYSTATE from "../img/emptyState.jpg"
import { Redirect } from "react-router-dom";

const WHISKYPLACEHOLDER = "https://media.madeindesign.com/nuxeo/products/6/8/whisky-glass-whisky_madeindesign_6699_original.jpg"
export class WhiskyDetails extends Component {
  static propTypes = {
    details: PropTypes.object.isRequired
  }
  componentWillMount() {
    this.props.getWhiskyDetails(this.props.match.params.whiskyId);
  }
  
  render() {
    return (
      <div>
        {this.props.details.error ?
        <div>
          <img style={{height:"50%", width:"100%"}} src={EMPTYSTATE} alt ="empty state"/>
          <Typography variant="display1" color='secondary'>{this.props.details.message}</Typography>
        </div>
        :
        <Grid container justify='center'>
          <Grid xs={12} sm ={8} md={6} item>
            <Card style={{textAlign:'center'}}>
              <CardHeader
              action={
                <div>
                <IconButton component={Link} to={`/whisky/${this.props.details.id}/edit`}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => this.props.deleteWhisky(this.props.details.id)}>
                  <Delete />
                </IconButton>
                </div>
              }
              />
              <CardMedia
                style={{height: 0, paddingTop: '56.25%', backgroundSize: "contain"}}
                image={this.props.details.pictureUrl ? this.props.details.pictureUrl : WHISKYPLACEHOLDER }
                title={this.props.details.name}
              />
              <CardContent>
                <Typography variant="title" gutterBottom>{this.props.details.name}</Typography>
                <Typography variant="body2" gutterBottom>Age:{this.props.details.age} years old</Typography>
                <Typography variant="body1" gutterBottom>{this.props.details.description}</Typography>

              </CardContent>
            </Card>
          </Grid>
          {this.props.posted?<Redirect push to="/" />:null}
        </Grid>
        
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posted: state.whisky.posted,
  details: state.whisky.details
})

const mapDispatchToProps = (dispatch) => ({
  getWhiskyDetails: (id) => dispatch(getWhiskyDetails(id)),
  deleteWhisky: id => dispatch(deleteWhisky(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(WhiskyDetails)
