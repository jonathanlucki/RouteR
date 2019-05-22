import React from 'react';

class RouteMap extends React.Component {

    //component constructor
    constructor(props) {
        //set props
        super(props);
        //bind methods
        this.getMapUrl = this.getMapUrl.bind(this);
    }

    //returns map url
    getMapUrl() {
        var start = this.props.route[0];
        console.log(start);
        start = start.split(' ').join('+');
        if (this.props.route.length > 2) {
            var points = '';
            for (var i = 1; i < (this.props.route.length - 1); i++) {
                if (i !== 1) {
                    points = points + "|";
                }
                points = points + this.props.route[i];
            }
            points = points.split(' ').join('+');
        }
        var end = this.props.route[this.props.route.length - 1];
        end = end.split(' ').join('+');
        var key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        if (this.props.route.length > 2) {
            return "https://www.google.com/maps/embed/v1/directions?key=" + key + "&origin=" + start + "&destination=" + end + "&waypoints=" + points;
        } else {
            return "https://www.google.com/maps/embed/v1/directions?key=" + key + "&origin=" + start + "&destination=" + end;
        }
    }

    //component render method
    render() {
        return (
            <iframe
                title="map"
                name="map"
                style={{border: 0}}
                width="100%"
                height="100%"
                frameBorder="0"
                src={this.getMapUrl()} allowFullScreen>
            </iframe>
        );
    }

}

export default RouteMap;