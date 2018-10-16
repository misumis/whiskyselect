import React, { Component } from 'react'
import {ListItem, Paper, Button, ListItemText, Grid,TextField, Typography, Toolbar, AppBar} from '@material-ui/core';
import { Route, Link, BrowserRouter  as Router } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
    <AppBar color="default">
        <Toolbar>
          <Typography style={{flex:1, textAlign:'left'}}>Whisky Select</Typography>
          <Button component={Link} to="/submit">Add Whisky</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
