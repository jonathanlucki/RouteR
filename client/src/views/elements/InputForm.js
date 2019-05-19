import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import InputField from './InputField.js';

class InputForm extends React.Component {

    //component constructor
    constructor(props) {
        //set props
        super(props);
        //set state
        this.state = {maxPoints: this.props.locations.points.length};
        //bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPointFields = this.getPointFields.bind(this);
        this.getPointFieldsCount = this.getPointFieldsCount.bind(this);
    }

    //returns number of point fields to be displayed
    getPointFieldsCount(locations) {
        for (var num = this.state.maxPoints; num > 0; num--) {
            if (locations.points[num-1] !== '') {
                return Math.min((num+1),this.state.maxPoints);
            }
        }
        return 1;
    }

    //returns point fields
    getPointFields() {
        var count = this.getPointFieldsCount(this.props.locations);
        var fields = [];
        for (var num = 0; num < count; num++) {
            var text = "Stop #" + (num + 1);
            if (this.props.locations.points[num] === '') {
                text = "Add a stop";
            }
            fields.push(
                <InputField
                    id={"point"+num}
                    type="point"
                    num={num}
                    label={text}
                    locations={this.props.locations}
                    onLocationChange={this.props.onLocationChange}
                />
            );
        }
        return fields;
    }

    //handles form submissions
    handleSubmit(event) {

    }

    //component render method
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <InputField
                        required="true"
                        id="start"
                        type="start"
                        num={null}
                        label="Starting Location"
                        locations={this.props.locations}
                        onLocationChange={this.props.onLocationChange}
                    />
                    {this.getPointFields()}
                    <InputField
                        id="end"
                        type="end"
                        num={null}
                        label="Ending Location (Optional)"
                        locations={this.props.locations}
                        onLocationChange={this.props.onLocationChange}
                    />
                    <br/>
                    <Button className="input-form-element">
                        Calculate Route
                    </Button>
                </FormGroup>
            </form>
           );
    }

}


export default InputForm;