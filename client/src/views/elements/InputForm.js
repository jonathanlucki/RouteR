import React from 'react';
import Paper from "../Input";

class InputForm extends React.Component {

    //component constructor
    constructor(props) {
        //set props
        super(props);
        //bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //handle form submission
    handleSubmit(event) {

    }

    //component render method
    render() {
        return (
            <form onSubmit={this.handleSubmit}>

            </form>
           );
    }

}


export default InputForm;