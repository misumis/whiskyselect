import React, { Component } from 'react'
import {ListItem, Paper, ListItemText, Grid, CircularProgress} from '@material-ui/core';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWhisky } from "../store/actions/whisky";


export class Home extends Component {
  static propTypes = {
    whisky: PropTypes.object.isRequired
  }
  static defaultProps = {
    whisky: []
  }

  componentWillMount() {
    this.props.getWhisky();
  }

  render() {
    return (
      <Grid container justify='center'>
           <Grid xs={12} sm ={8} md={6} item>
           {this.props.whisky.fetching? <CircularProgress />:null}
             <Paper square>
               {this.props.whisky.data.map( product => (
                 <ListItem key={product.id} component={Link} to={`whisky/${product.id}`} button>
                   <ListItemText primary={product.name} secondary={product.age + ` years old`}></ListItemText>
                 </ListItem>))
               }
             </Paper>
           </Grid>
         </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  whisky: state.whisky,
  snackbar: state.snackbar
})

const mapDispatchToProps = (dispatch) => ({
  getWhisky: () => dispatch(getWhisky()),

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
