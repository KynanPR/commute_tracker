console.log("Hello World!");

const now = new Date();
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
        const journeyDate =  now.toISOString().substring(0, 10);
        const newJourney = new Journey(this.stopNames);
        this.journeys[journeyDate] = newJourney;
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