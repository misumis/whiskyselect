import React, { Component } from 'react';
import { Route, Link, BrowserRouter  as Router } from "react-router-dom";
import {ListItem, Paper, Button, ListItemText, Grid,TextField, Typography, Toolbar, AppBar} from '@material-ui/core';

export default class Home extends Component {
fetchWhisky = () => {
    return fetch('/api/whisky', {
        method:'GET',
    })
    .then(response => response.json())
    }
    constructor(){
    super()
    this.state={
        whisky:[]
    }
    }
    getWhiskyDatabase = () => {
    this.fetchWhisky().then(resp => this.setState({whisky:resp}));
    }
    componentDidMount(){
    this.getWhiskyDatabase();
    }
  render() {
    return (
      <div>
        {this.state.whisky.length?
        <Grid container justify='center'>
          <Grid xs={12} sm ={8} md={6} item>
            <Paper square>
              {this.state.whisky.map( product => (
                <ListItem>
                  <ListItemText primary={product.name} secondary={product.age + ` years old`}></ListItemText>
                </ListItem>))
              }
            </Paper>
          </Grid>
        </Grid>
        :null}
      </div>
    )
  }
}
