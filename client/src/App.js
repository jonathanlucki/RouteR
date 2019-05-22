import React from 'react';
import './App.css';
import Input from './views/Input.js';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {

    //component constructor
    constructor(props) {
        //set props
        super(props);
        //set up state to default
        this.state = {view: 'input',
                      locations: {start: '',
                                  end: '',
                                  points: ['','','','','']},
                      route: []};
        //bind methods
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    }

    //handles view change
    handleViewChange(view) {
        this.setState({view});
    }

    //handles point change
    handleLocationChange(locations) {
        this.setState({locations});
    }

    //handles location submission
    async handleLocationSubmit(event) {
        event.preventDefault();
        const response = await fetch('/api/calculate-route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({locations: this.state.locations}),
        });
        const result = await response.text();
        if (result !== 'error') {
            this.setState({route: result});
            //this.handleViewChange('map');
        } else {
            this.handleViewChange('error');
        }
        this.setState({route: result});
    }

    //component render method
    render() {
        //get page according to current view state
        switch(this.state.view) {
            case 'input':
                var page = <Input locations={this.state.locations} onLocationChange={this.handleLocationChange} onSubmit={this.handleLocationSubmit}/>;
                break;
            case 'loading':

                break;
            case 'map':

                break;
            case 'error':

                break;
            default:

                break;
        }
        //return rendering
        return (
            <React.Fragment>
                <CssBaseline />
                {page}
            </React.Fragment>
        );
    }
}

export default App;