import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputForm from './elements/InputForm';

class Input extends React.Component {

    //component render method
    render() {
        return (
            <Paper className="input-container" elevation={1}>
                <Typography variant="h1">RouteR</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    By <a href="https://www.jonathanlucki.ca">Jonathan Lucki</a>
                </Typography>
                <Divider />
                <br />
                <Typography variant="subtitle1" gutterBottom>
                    Please input up to six locations below, and RouteR will automatically calculate and display the fastest routing between them.
                </Typography>
                <br />
                <Divider />
                <InputForm locations={this.props.locations} onLocationChange={this.props.onLocationChange}/>
            </Paper>
        );
    }

}

export default Input;