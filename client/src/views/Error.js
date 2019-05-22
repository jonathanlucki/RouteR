import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Error extends React.Component {

    //component render method
    render() {
        return (
            <Paper className="input-container" elevation={5}>
                <Typography variant="h6">Uh oh! We have encountered an error with your request. Please check your addresses or try again later.</Typography>
            </Paper>
        );
    }

}

export default Error;