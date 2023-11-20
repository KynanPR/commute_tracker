import moment from 'moment';
moment().format();

console.log("Hello World!");

const commuteName = 'My Commute';
const commuteStops = ['outLeftHome', 'outTramStop', 'outOnTram', 'outOffTram', 'outArrivedWork'];

class Journey {
    constructor(stops) {
        stops.forEach(element => {
            this[element] = null;
        });
    }
}

class Commute {
    constructor(name, stops) {
        this.name = name;
        this.stopNames = stops;
        this.journeys = {};
    }
    newJourney() {
        now = new Date()
        const journeyDate =  now.toISOString().substring(0, 10);
        const newJourney = new Journey(this.stopNames);
        this.journeys[journeyDate] = newJourney;
    }
    incrementStop(journeyDate) {
        now = new Date()
        const startState = this.journeys[journeyDate];
        const nextStopIndex = Object.values(startState).indexOf(null);
        const nextStopName = Object.keys(startState)[nextStopIndex];

        this.journeys[journeyDate][nextStopName] = now.ge


    }
}

const startTimer = document.getElementById('start-button');

function logTime(calledElement) {
    const elementID = calledElement.id;
    const currentDateTime = now.toISOString()
    console.log(`Element ID: ${elementID} DateTime: ${currentDateTime}`)
    let
}

startTimer.addEventListener('click', (event) => {
    const buttonElement = event.target;
    logTime(buttonElement);
});