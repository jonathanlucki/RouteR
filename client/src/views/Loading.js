import React from "react";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

class Loading extends React.Component {
  //component render method
  render() {
    return (
      <Paper className="loading-container" elevation={5}>
        <CircularProgress />
        <br />
        <Typography variant="h5">Loading</Typography>
      </Paper>
    );
  }
}

export default Loading;
