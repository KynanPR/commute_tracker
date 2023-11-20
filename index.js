console.log("Hello World!");

const now = new Date();

const startTimer = document.getElementById('start-button');

function logTime(calledElement) {
    const elementID = calledElement.id;
    const currentDateTime = now.toISOString()
    console.log(`Element ID: ${elementID} DateTime: ${currentDateTime}`)
}

startTimer.addEventListener('click', (event) => {
    const buttonElement = event.target;
    logTime(buttonElement);
});
