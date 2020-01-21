import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

class InputField extends React.Component {
  //component constructor
  constructor(props) {
    //set props
    super(props);
    //bind methods
    this.getLocationValue = this.getLocationValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //gets current location value
  getLocationValue() {
    switch (this.props.type) {
      case "start":
        return this.props.locations.start;
      case "end":
        return this.props.locations.end;
      case "point":
        return this.props.locations.points[this.props.num];
      default:
        return null;
    }
  }

  //handle input field text change
  handleChange(location) {
    var locations = this.props.locations;
    switch (this.props.type) {
      case "start":
        locations.start = location;
        this.props.onLocationChange(locations);
        break;
      case "end":
        locations.end = location;
        this.props.onLocationChange(locations);
        break;
      case "point":
        locations.points[this.props.num] = location;
        this.props.onLocationChange(locations);
        break;
      default:
        break;
    }
  }

  //component render method
  render() {
    return (
      <PlacesAutocomplete
        value={this.getLocationValue()}
        onChange={this.handleChange}
        onSelect={this.handleChange}
        debounce={500}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                className: "input-form-element",
                id: this.props.id,
                label: this.props.label,
                margin: "normal"
              })}
            />
            <Paper square>
              {suggestions.map(suggestion => {
                return (
                  <MenuItem
                    {...getSuggestionItemProps(suggestion, {
                      selected: suggestion.active,
                      component: "div",
                      style: { whiteSpace: "normal" }
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </MenuItem>
                );
              })}
            </Paper>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default InputField;
