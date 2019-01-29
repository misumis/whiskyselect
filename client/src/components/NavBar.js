import React, { Component } from 'react'
import {Button, Typography, Toolbar, AppBar} from '@material-ui/core';
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
    <AppBar position='sticky' color="default">
        <Toolbar>
          <Typography style={{flex:1, textAlign:'left', textDecoration:'none'}} component={Link} to="/" color="secondary" >Whisky Select</Typography>
          <Button component={Link} to="/submit">Add Whisky</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
