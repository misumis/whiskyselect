import React, { Component } from 'react';
import {ListItem, Paper, Button, ListItemText, Grid,TextField} from '@material-ui/core';
import './App.css';

class App extends Component {

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
      <div className="App">
        <form action="/api/whisky" method="POST">
          <div><TextField placeholder="Name" required name="name"/></div>
          <div><TextField placeholder="Age" required name="age"/></div>
          <Button type="submit" color='primary'>Submit Whisky!</Button>
        </form>
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
    );
  }
}

export default App;
