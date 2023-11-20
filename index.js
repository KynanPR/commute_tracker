console.log("Hello World!");

const startTimer = document.getElementById('start-button');

function logTime(element) {
    const elementID = element.id;
    const currentDateTime = Date().toISOString()
    console.log(`Element ID: ${elementID} DateTime: ${currentDateTime}`)
}

startTimer.addEventListener('click', (event) => {
    const buttonElement = event.target;
    logTime(buttonElement)
});

