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
                      start: '',
                      points: [''],
                      end: ''};
    }

    //component render method
    render() {
        //get page according to current view state
        switch(this.state.view) {
            case 'input':
                var page = <Input />;
                break;
            case 'loading':

                break;
            case 'map':

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