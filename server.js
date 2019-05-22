require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY
});

var permutate = require('enum-permutate')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//returns a formatted travel time matrix from google maps distance matrix api json response matrix
function formatTimeMatrix(matrix) {
    var formattedMatrix = [];
    for (var rowNum = 0; rowNum < matrix.rows.length; rowNum++) {
        var rowArray = [];
        for (var colNum = 0; colNum < matrix.rows[rowNum].elements.length; colNum++) {
            rowArray.push(matrix.rows[rowNum].elements[colNum].duration.value);
        }
        formattedMatrix.push(rowArray);
    }
    return formattedMatrix;
}

//sends callback a matrix of travel times from addresses in addressArray
function getTravelTimeMatrix(addressArray, callback) {
    //make call to google distance matrix API
    googleMapsClient.distanceMatrix({
        origins: addressArray,
        destinations: addressArray
    }, function(err, response) {
        if (!err) {
            //successful response
            console.log(response.json);
            callback(formatTimeMatrix(response.json));
        } else {
            //error
            console.log(err);
            callback('error');
        }
    });
}

//returns array of addresses in order of input form from given locations object
function getAddressArray(locations) {
    var array = [];
    //add start to array
    if (locations.start !== '') {
        array.push(locations.start);
    }
    //add non-empty points to array
    for (var i = 0; i < locations.points.length; i++) {
        if (locations.points[i] !== '') {
            array.push(locations.points[i]);
        }
    }
    //add end to array
    if (locations.end !== '') {
        array.push(locations.end);
    }
    return array;
}

//returns number of non-empty strings in given array
function nonEmptyNum(array) {
    var num = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== '') {
            num = num + 1;
        }
    }
    return num;
}

//returns duration of given path according to travel time matrix
function getPathDuration(path, pathLength, timeMatrix) {
    var time = 0;
    //iterate through path
    for (var i = 0; i < (pathLength - 1); i++) {
        time = time + timeMatrix[path[i]][path[i+1]];
    }
    return time;
}

//sends callback a fastest routing address array based on input data from object locations
function calculateRoute(locations, callback) {
    var addressArray = getAddressArray(locations);
    getTravelTimeMatrix(addressArray, function(resultMatrix) {
        //check if matrix requests doesnt result in an error
        if (resultMatrix !== 'error') {
            //create array representing the different points given to matrix
            //(not including start and end, just the points)
            var optionsArray = [];
            var pointsLength = nonEmptyNum(locations.points);
            for (var i = 1; i <= pointsLength; i++) {
                optionsArray.push(i);
            }
            //create array of permutations of all these options
            var pathsArray = permutate(optionsArray);
            var pathsArrayLength = pathsArray.length;
            pointsLength = pointsLength + 1;
            //add start and end to all permutations
            for (var j = 0; j < pathsArrayLength; j++) {
                pathsArray[j].unshift(0);
                if (locations.end !== '') {
                    pathsArray[j].push(pointsLength);
                }
            }
            //iterate through all paths to find shortest path
            var minPath = pathsArray[0];
            var minDuration = getPathDuration(pathsArray[0], pathsArray[0].length, resultMatrix);
            for (var k = 1; k < pathsArrayLength; k++) {
                if (getPathDuration(pathsArray[k], pathsArray[k].length, resultMatrix) < minDuration) {
                    minPath = pathsArray[k];
                }
            }
            //find corresponding addresses to shortest path to determine routing
            var route = [];
            for (var x = 0; x < minPath.length; x++) {
                route.push(addressArray[minPath[x]]);
            }
            //send route to callback
            callback(route);
        } else {
            //if error send 'error'
            callback('error');
        }
    });
}

app.post('/api/calculate-route', (req, res) => {
    console.log(req.body);
    calculateRoute(req.body.locations, function(result) {
        res.send(result);
    });
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));