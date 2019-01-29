import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Snackbar, SnackbarContent} from '@material-ui/core';
import {green, red} from '@material-ui/core/colors';

import { closeSnackbar } from "../store/actions/snackbar";

class SnackbarWrapper extends Component {
  render() {
    return (
      <div>
        <Snackbar
             anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.props.snackbar.open}
            autoHideDuration={6000}
            onClose={this.props.closeSnackbar}
        >
          <SnackbarContent
            style={this.props.snackbar.statusCode < 400 ? { backgroundColor:green[600] } : { backgroundColor: red[600]}}
            message={<span id="message-id">{this.props.snackbar.message}</span>}
          >
          </SnackbarContent>
        </Snackbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  whisky: state.whisky,
  snackbar: state.snackbar
})

const mapDispatchToProps = (dispatch) => ({
  closeSnackbar: () => dispatch(closeSnackbar())
})

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarWrapper)
