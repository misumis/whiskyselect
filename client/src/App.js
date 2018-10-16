import React, { Component } from 'react';
import { Route, Switch,Link, BrowserRouter as Router } from "react-router-dom"
import {ListItem, Paper, Button, ListItemText, Grid,TextField, Typography, Toolbar, AppBar} from '@material-ui/core';

import './App.css';
import Home from './components/Home';
import WhiskySubmission from './submission/WhiskySubmission';
import DefaultLayout from './components/DefaultLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={DefaultLayout}>
              <Route path="" component={Home}/>
              <Route path="submit" component={WhiskySubmission}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
