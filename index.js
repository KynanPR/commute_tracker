const moment = require("moment");

moment().format(); 

console.log("Hello World!");

const commuteName = 'My Commute';
const commuteStops = ['outLeftHome', 'outTramStop', 'outOnTram', 'outOffTram', 'outArrivedWork'];

class Location { // a location is a point along the commute journey that will be used to create a stop
    constructor(name, boolDestination) {
        this.stopName = name; // User given name of stop. TODO add checks for duplicate stop names
        this.boolDestination = boolDestination; // boolDestination flags a location as a beginning/ending location, ie. Home or Work     
    }
}

class Stop { // Created as part of a journey init, takes a specified location object and creates an instance of it with the timestamp for that journey
    constructor(location) {
        this.location = location; // In case the parent Location object needs to be accessed later
        this.stopIndex = null; // For tracking which number this stop is in a journey. Init to null, set by the setStopNo method, called by Journey init
        this.name = location.StopName;
        this.arrivedAt = null; // Initially null so it can be set during the journey
    }
    setStopIndex(stopNo) {
        this.stopIndex = stopNo;
    }
    // TODO set arrivedAt method
}

class Journey { // A specific instance as part of a Commute with given Locations that can vary depending on journey type eg. Tram vs Cycling vs Driving
    constructor(locations) { // locations will be an array of Location objects
        // TODO check there are at least 2 Locations and they are destinations
        // DOCS - Can only have 1 journey per day
        this.date = moment().format('YYYY-MM-DD'); // Serves as an identifier for the journey
        this.stops = []; // Init array of stops

        let stopIndex = 0;
        locations.forEach(location => { // Create and init a stop for each location
            stopFromLocation = new Stop(location); // Create new Stop from the Location object
            stopFromLocation.setStopIndex(stopIndex);
            this.stops.push(stopFromLocation); // Add that Stop to the array
        });
    }
    // TODO incrementStop method
}

class Commute { // The top level object with the invariant properties of a commute. eg. Home/Work Locations, Name of commute, Locations available for Journies
    constructor(name) {
        this.name = name;
        this.locations = [];
        this.journeys = [];
    }
    newJourney() {
        now = new Date() // TODO moment
        const journeyDate =  now.toISOString().substring(0, 10); // TODO moment
        const newJourney = new Journey(this.stopNames);
        this.journeys[journeyDate] = newJourney;
    }
    incrementStop(journeyDate) { // TODO move to Journey
        now = new Date();// TODO moment
        const startState = this.journeys[journeyDate];
        const nextStopIndex = Object.values(startState).indexOf(null);
        const nextStopName = Object.keys(startState)[nextStopIndex];

        this.journeys[journeyDate][nextStopName] = now.ge //TODO moment
    }
    // TODO addLocation method
    //
}

const startTimer = document.getElementById('start-button');

function logTime(calledElement) {
    
    const elementID = calledElement.id;
    const currentDateTime = now.toISOString() // TODO need to change to moment
    console.log(`Element ID: ${elementID} DateTime: ${currentDateTime}`)
}

startTimer.addEventListener('click', (event) => {
    const buttonElement = event.target;
    logTime(buttonElement);
});

