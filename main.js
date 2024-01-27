// Selecting the HTML elements for value and degree
const value = document.querySelector("#value");
const input = document.querySelector("#degree");

// Initializing degree and last camera degree variables
var deg = 0;
var lastCamDegree = 90;

// Setting the text content of the value element to the input value
value.textContent = input.value;

// Adding an event listener to the input element to change the camera degree when the input value changes
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
    changeCamDegree(event.target.value);
});

// Function to move the car in a specified direction
function move(direction) {
    // Get the selected car
    const carSelection = document.querySelector('input[name="car"]:checked').value;

    // Send the selected car and direction to the server
    fetch(`/move?car=${carSelection}&direction=${direction}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

// Array of directions
const directions = ['up', 'down', 'left', 'right'];

// Adding click event listeners to the direction buttons
directions.forEach(direction => {
    document.getElementById(direction).addEventListener('click', function() {
        move(direction);
    });
});

// Adding keydown event listener to the window to move the car with arrow keys
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});

// Function to change the camera degree
function changeCamDegree(value) {
    // If the change in camera degree is at least 10
    if((lastCamDegree - value ) >= 10 ||(lastCamDegree - value ) <= -10){
        var http = new XMLHttpRequest();

        // Send the new camera degree to the server
        http.open('POST', "/camdegree", true);
        http.setRequestHeader('camdegree', 'camdegree');
        var data = `${value}`;
        http.send(data);

        // Update the last camera degree
        lastCamDegree = value ;
    }
}

// Function to read the gas sensor data
function readGasSensor() {
    var http = new XMLHttpRequest();
    http.open('GET', "/gas", true);
    http.send();

    // Fetch the gas sensor data from the server and update the 'gas' element on the webpage
    fetch('/gas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to get data');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('gas').innerText = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Fetch ultrasonic sensor data from the server
fetch('/sensorData')
.then(response => response.json())
.then(data => {
    // Update the webpage with the ultrasonic sensor data
    document.getElementById('topValue').textContent =  data.top;
    document.getElementById('leftValue1').textContent = data.left1;
    document.getElementById('leftValue2').textContent = data.left2;
    document.getElementById('leftValue3').textContent = data.left3;
    document.getElementById('rightValue1').textContent = data.right1;
    document.getElementById('rightValue2').textContent = data.right2;
    document.getElementById('rightValue3').textContent = data.right3;
    document.getElementById('bottomValue').textContent = data.bottom;
})
.catch(error => console.error('Error:', error));
