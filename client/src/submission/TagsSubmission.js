import React, { Component } from 'react'
import { Button, TextField, Grid } from "@material-ui/core";

export default class TagsSubmission extends Component {
  render() {
    return (
      <Grid container justify='center'>
        <Grid xs={12} sm ={8} md={6} item>
          <form action="/api/tag" method="POST">
            <div>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tag Name"
                InputLabelProps={{
                shrink: true
                }}
                margin="normal"
              />
              </div>
            <Button variant='contained' type="submit" color='primary'>Submit Tag</Button>
          </form>
        </Grid>
      </Grid>
    )
  }
}
