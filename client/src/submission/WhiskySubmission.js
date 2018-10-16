import React, { Component } from 'react'
import { Button, TextField, Grid } from "@material-ui/core";

export default class WhiskySubmission extends Component {
  render() {
    return (
      <Grid container justify='center'>
        <Grid xs={12} sm ={8} md={6} item>
          <form action="/api/whisky" method="POST">
            <div>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Whisky Name"
                InputLabelProps={{
                shrink: true
                }}
                margin="normal"
              />
              </div>
              <div>
                <TextField
                  fullWidth
                  id="Age"
                  name="age"
                  label="Whisky age"
                  InputLabelProps={{
                  shrink: true
                  }}
                  margin="normal"
                />
              </div>
            <Button type="submit" color='primary'>Submit Whisky!</Button>
          </form>
        </Grid>
      </Grid>
    )
  }
}
