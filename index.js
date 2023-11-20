console.log("Hello World!");

const now = new Date();
const commuteName = 'My Commute'
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
        this.journeys = [];
    }
    createJourney() {
        const newJourney = new Journey(this.stopNames);
        this.journeys.push(newJourney);
    }
}

// let myCommute = {
//     outLeftHome: 0,
//     outTramStop: 0,
//     outOnTram: 0,
//     outOffTram: 0,
//     outArrivedWork: 0
// }

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