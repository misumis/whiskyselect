import React, { Component } from 'react'
import { Button, TextField } from "@material-ui/core";

export default class WhiskySubmission extends Component {
  render() {
    return (
      <div>
        <form action="/api/whisky" method="POST">
          <div><TextField
                fullWidth
                id="name"
                name="name"
                label="Whisky Name"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              /></div>
          <div><TextField  placeholder="Age" required name="age"/></div>

          <Button type="submit" color='primary'>Submit Whisky!</Button>
        </form>
      </div>
    )
  }
}
