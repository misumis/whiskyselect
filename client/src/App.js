import React, { Component } from 'react';
import { Route, Switch,Link, BrowserRouter as Router } from "react-router-dom"
import {ListItem, Paper, Button, ListItemText, Grid,TextField, Typography, Toolbar, AppBar} from '@material-ui/core';

import './App.css';
import Home from './components/Home';
import WhiskySubmission from './submission/WhiskySubmission';
import DefaultLayout from './components/DefaultLayout';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/submit" component={WhiskySubmission}/>
            </Switch>
          </div>
          
        </Router>
      </div>
    );
  }
}

export default App;
