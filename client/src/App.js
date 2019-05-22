import React from 'react';
import './App.css';
import Input from './views/Input.js';
import Loading from './views/Loading.js';
import Error from './views/Error.js';
import RouteMap from './views/RouteMap.js';
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
        this.handleViewChange('loading');
        event.preventDefault();
        const response = await fetch('/api/calculate-route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({locations: this.state.locations}),
        });
        const result = await response.json();
        if (result !== 'error') {
            this.setState({route: result});
            this.handleViewChange('map');
        } else {
            this.handleViewChange('error');
        }
        this.setState({route: result});
    }

    //component render method
    render() {
        //get page according to current view state
        var page = <Error />;
        switch(this.state.view) {
            case 'input':
                page = <Input locations={this.state.locations} onLocationChange={this.handleLocationChange} onSubmit={this.handleLocationSubmit}/>;
                break;
            case 'loading':
                page = <Loading />;
                break;
            case 'map':
                page = <RouteMap route={this.state.route} />
                break;
            case 'error':
                page = <Error />;
                break;
            default:
                page = <Error />;
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