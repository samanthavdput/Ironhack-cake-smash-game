//Canvas Variables
let canvas = document.querySelector('canvas');
let intervalId = 0; 
let ctx;
let body = document.querySelector("body");
let startscreen = document.querySelector(".startscreen");
let button = document.querySelector(".btn-start");
let canvasContainer = document.createElement("div");
canvasContainer.innerHTML = `<canvas id="myCanvas" width="600" height="698"></canvas>`;
let counter;
let downloadTimer;

//button click event
button.addEventListener('click', () => {
    body.removeChild(startscreen);
    body.appendChild(canvasContainer);

    canvas = document.querySelector('canvas');
    canvas.style.border = "2px solid rgb(147, 19, 151)";
    canvas.style.backgroundColor = "#d885d1";

    ctx = canvas.getContext('2d');
    intervalId = 0; 

    intervalId = setInterval(() => {
        requestAnimationFrame(startGame);
    }, 10);

    counter = 60;
    downloadTimer = setTimeout(countDown,1000);

    function countDown(){
        counter--;
    if(counter > 0){
        setTimeout(countDown,1000);
    }
    else {
        clearInterval(downloadTimer);
        winner();
        }
    }
});