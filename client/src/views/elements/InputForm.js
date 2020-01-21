import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import InputField from "./InputField.js";

class InputForm extends React.Component {
  //component constructor
  constructor(props) {
    //set props
    super(props);
    //set state
    this.state = { maxPoints: this.props.locations.points.length };
    //bind methods
    this.getPointFields = this.getPointFields.bind(this);
    this.getPointFieldsCount = this.getPointFieldsCount.bind(this);
    this.validInput = this.validInput.bind(this);
  }

  //returns number of point fields to be displayed
  getPointFieldsCount(locations) {
    for (var num = this.state.maxPoints; num > 0; num--) {
      if (locations.points[num - 1] !== "") {
        return Math.min(num + 1, this.state.maxPoints);
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
      if (this.props.locations.points[num] === "") {
        text = "Add a stop";
      }
      fields.push(
        <InputField
          id={"point" + num}
          type="point"
          num={num}
          key={num}
          label={text}
          locations={this.props.locations}
          onLocationChange={this.props.onLocationChange}
        />
      );
    }
    return fields;
  }

  //returns true if required fields are filled or not
  validInput() {
    if (this.props.locations.start !== "") {
      for (var i = 0; i < this.props.locations.points.length; i++) {
        if (this.props.locations.points[i] !== "") {
          return true;
        }
      }
    }
    return false;
  }

  //component render method
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <FormGroup>
          <InputField
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
          <br />
          <Button
            className="input-form-element"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!this.validInput()}
          >
            Calculate Route
          </Button>
        </FormGroup>
      </form>
    );
  }
}

export default InputForm;
