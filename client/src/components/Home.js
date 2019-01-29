import React, { Component } from 'react'
import {ListItem, Paper, ListItemText, Grid, CircularProgress, ListItemIcon, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWhisky } from "../store/actions/whisky";
import { getTags, filterByTag, disableFilter } from "../store/actions/tag";
import { Clear } from '@material-ui/icons';

const WhiskyItem = ({product}) => {
  return(
  <ListItem key={product.id} component={Link} to={`whisky/${product.id}`} button>
    <ListItemText primary={product.name} secondary={product.age + ` years old`}></ListItemText>
  </ListItem>
  )
}

export class Home extends Component {
  static propTypes = {
    whisky: PropTypes.object.isRequired
  }
  static defaultProps = {
    whisky: []
  }
  disableFilter = e => {
    e.preventDefault();
    this.props.disableFilter()
  }

  componentWillMount() {
    this.props.getWhisky();
    this.props.getTags();
  }

  render() {
    return (
      <Grid container justify='center'>
        <Grid xs={12} sm ={8} md={5} item>
        {this.props.whisky.fetching? <CircularProgress />:null}
          <Paper square>
            {this.props.whisky.data.map( product => (
                this.props.tag.filterToggled? 
                  this.props.tag.filteredWhisky.includes(product.id)?
                  <WhiskyItem key={product.id} product={product} />
                  :
                  null
                :
                <WhiskyItem product={product} />
                )
              )
            }
          </Paper>
        </Grid>
        <Grid xs={12} sm ={8} md={5} item>
          <Paper square>
              {this.props.tag.data.map( tag => (
                <ListItem ContainerComponent="div" key={tag.id} dense button onClick={() => this.props.filterByTag(tag.id)}>
                  <ListItemText primary={tag.name} primaryTypographyProps={{ color:tag.id === this.props.tag.filterTagId ? "secondary": "default" }}></ListItemText>
                  {this.props.tag.filterToggled && tag.id === this.props.tag.filterTagId ? 
                  <ListItemSecondaryAction onClick={this.props.disableFilter}>
                    <IconButton>
                      <Clear />
                    </IconButton>
                  </ListItemSecondaryAction>
                  : 
                  null}
                </ListItem>))
              }
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  tag: state.tag,
  whisky: state.whisky,
  snackbar: state.snackbar
})

const mapDispatchToProps = (dispatch) => ({
  getWhisky: () => dispatch(getWhisky()),
  getTags: () => dispatch(getTags()),
  filterByTag: (id) => dispatch(filterByTag(id)),
  disableFilter: () => dispatch(disableFilter())

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
