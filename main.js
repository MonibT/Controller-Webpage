
const value = document.querySelector("#value");
const input = document.querySelector("#degree");
var deg = 0;

var lastCamDegree = 90;

var timer ;

value.textContent = input.value;

input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
    changeCamDegree(event.target.value);
});


function move(direction) {
    // Get the selected car
    var carSelection = document.querySelector('input[name="car"]:checked').value;

    // Send the selected car and direction to the server
    fetch('/move?car=' + carSelection + '&direction=' + direction)
    .then(response => response.json())
    .then(data => console.log(data));
}

document.getElementById('up').addEventListener('click', function() {
    move('up');
});

document.getElementById('down').addEventListener('click', function() {
    move('down');
});

document.getElementById('left').addEventListener('click', function() {
    move('left');
});

document.getElementById('right').addEventListener('click', function() {
    move('right');
});

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

function changeCamDegree(value) {

    if((lastCamDegree - value ) >= 10 ||(lastCamDegree - value ) <= -10){
        var http = new XMLHttpRequest();

        http.open('POST', "/camdegree", true);
    
        http.setRequestHeader('camdegree', 'camdegree');
    
        var data = `${value}`;
    
        http.send(data);

        lastCamDegree = value ;
    }
}

function readGasSensor() {
    var http = new XMLHttpRequest();
    http.open('GET', "/gas", true);
    http.send();

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

// Fetch sensor data from the server
fetch('/sensorData')
.then(response => response.json())
.then(data => {
    // Update the webpage with the sensor data
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
