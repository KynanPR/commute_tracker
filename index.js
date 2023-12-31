moment().format();

console.log("Hello World!");

commutes = [];

const commuteName = "My Commute";
const commuteStops = ["outLeftHome", "outTramStop", "outOnTram", "outOffTram", "outArrivedWork"];

// The top level object with the invariant & reusable properties of a commute. eg. Home/Work Locations, Name of commute, Locations available for Journys
class Commute {
	constructor(name, startLocationName, endLocationName) { // User provided
		this.name = name;
		this.startLocation = new Location(startLocationName, true);
		this.endLocation = new Location(endLocationName, true);
		this.locations = [];
		this.journeys = [];
		console.log(`New Commute Created: ${this.name}`);
	}

	// Create a new Journey. Providing an array of locations that will make it up
	newJourney(locations) {
		const newJourney = new Journey(locations);
		this.journeys.push(newJourney);
		console.log(`Commute - '${this.name}': New Journey created with ${newJourney.stops.length} stops`, newJourney);
	}

	addLocation(locationName) {
		const  newLocation = new Location(locationName, false);
		this.locations.push(newLocation);
		console.log(`Commute - '${this.name}': New Location added`, newLocation);
	}
}

// A specific instance as part of a Commute with given Locations that can vary depending on journey type eg. Tram vs Cycling vs Driving
class Journey {
	constructor(locations) { // Locations will be an array of Location objects
		// TODO check there are at least 2 Locations and they are destinations
		// DOCS - Can only have 1 journey per day

		this.date = moment().format("YYYY-MM-DD"); // Serves as an identifier for the journey
		this.stops = locations.map((location) => new Stop(location)); // Create an array with a Stop object for each location
		this.hasStarted = false;
		this.hasCompleted = false;
	}

	// Get the current state of the Journey from the 3 (4 if something went wrong) possible states
	getJourneyState() {
		const started = this.hasStarted;
		const completed = this.hasCompleted;

		// Check options in order of how frequently they occur/are needed (presumed)
		if (started && !completed) { // Journey started but not complete
			return "Underway";
		} else if (started && completed) { // Journey started and finished - a completed journey
			return "Completed";
		} else if (!started && !completed) { // Journey not yet started and therefore unfinished
			return "Unstarted";
		} else { // Either the Joureny is somehow flagged as completed but not flagged as started, or something else went wrong
			throw new Error(
				"Something went wrong. I shouldn't be possible to have a Journey that is complete but unstarted"
			);
		}
	}

	// Set the arrivedAt time for the next stop
	incrementStop(stopIndex) {
		this.stops[stopIndex].arrivedAt = moment().unix(); // Set arrivedAt to current unix time - TODO change to setArrivedAt method
		console.log(`Journey ID - '${this.date}': Incremented Stop ${stopIndex + 1}`);
	}

	// Get the Stop index of the most recent Stop incremented
	getNextStopIndex() {
		const currentStop = this.stops.findIndex((stop) => stop.arrivedAt === null); // First null is next Stop
		return Math.max(0, currentStop); // If Journey hasn't started or if for some reason the method is being called on a completed Journey, return the first stop
	}

	// General method to increment the current Stop and move to the next
	nextStop() {
		const nextStop = this.getNextStopIndex();
		this.incrementStop(nextStop); // Increment the next stop
		if (nextStop === this.stops.length - 1) { // Check if that was the last stop
			this.endJourney(); // If it was end the Journey
		}
	}

	// Currently just flags Journey as started and increments the first stop. Will do more in the future
	startJourney() {
		if (this.getJourneyState() === "Unstarted") { // Check if Journey is unstarted
			console.log(`Journey ID - '${this.date}': Starting Journey...`);
			this.hasStarted = true; // Flag the Journey as started
			this.nextStop(); // Increment first Stop
		} else { // Shouldn't be called in any other state
			throw new Error(
				"Can't start this Journey as it has either already started or already ended"
			); // Something's gone wrong
		}
	}

	// Currently just flags Journey as completed. Will do more in the future
	endJourney() {
		if (this.getJourneyState() === "Underway") { // Check if Journey is underway
			console.log(`Journey ID - '${this.date}': Ending Journey...`);
			this.hasCompleted = true; // Flag Journey as completed
		} else { // Shouldn't be called in any other state
			throw new Error(
				"Can't end this Journey as it has either already started or already ended"
			); // Something's gone wrong
		}
	}
}

// A location is a point along the commute journey that will be used to create a stop
class Location {
	constructor(name, boolDestination) {
		this.name = name; // User given name of stop. TODO add checks for duplicate stop names
		this.boolDestination = boolDestination; // boolDestination flags a location as a beginning/ending location, ie. Home or Work
	}
}

// Created as part of a journey init, takes a specified location object and creates an instance of it with the timestamp for that journey
class Stop {
	constructor(location) {
		this.location = location; // In case the parent Location object needs to be accessed later
		this.name = location.name;
		this.arrivedAt = null; // Initially null so it can be set during the journey
	}
	// TODO setArrivedAt method
}

function createCommute() {
	const form = document.getElementById("newCommute");
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		let formData = new FormData(form);
		const values = {};

		for (const [name, value] of formData.entries()) {
			values[name] = value;
		}

		const commuteName = values.commuteName;
		const commuteFirstStop = values.commuteStart;
		const commuteLastStop = values.commuteEnd;

		newCommute = new Commute(commuteName, commuteFirstStop, commuteLastStop);
		commutes.push(newCommute);

		form.reset();
	});
}


// let myNewCommute = new Commute("My Commute", "Home", "Work");
// commuteStops.map((location) => myNewCommute.addLocation(location));
// myNewCommute.newJourney(myNewCommute.locations);

