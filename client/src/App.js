import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux";
import store from './store';

import './App.css';
import Home from './components/Home';
import WhiskySubmission from './submission/WhiskySubmission';  
import TagsSubmission from './submission/TagsSubmission';  
import NavBar from './components/NavBar';
import SnackbarWrapper from './components/SnackbarWrapper';
import WhiskyDetails from './components/WhiskyDetails';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <div>
              <NavBar/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/tag" component={TagsSubmission}/>
                <Route exact path="/submit" component={WhiskySubmission}/>
                <Route exact path="/whisky/:whiskyId" component={WhiskyDetails}/>
                <Route exact path="/whisky/:whiskyId/edit" component={WhiskySubmission}/>
              </Switch>
            </div>
          </Router>
          <SnackbarWrapper />
        </div>
      </Provider>
    );
  }
}

export default App;
