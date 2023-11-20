console.log("Hello World!");

const startTimer = document.getElementById('start-buton');

function logTime(element) {
    const elementID = element.id;
    const currentDateTime = Date().toISOString()
    console.log(`Element ID: ${elementID} DateTime: ${currentDateTime}`)
}

startTimer.addEventListener('click', (event) => {
    const buttonElement = event.target;
    logTime(buttonElement)
});

