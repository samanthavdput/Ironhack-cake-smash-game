//Game Variables
let playerImg;
let playerX = 120;
let playerY = 500;
let RightArrowDown = false;
let LefttArrowDown = false;
let playerMovement = 15; 
let cake = [ { x: 700, y: 150 } ];
let cakeX = cake.x;
let cakeY = cake.y;
let cakeYSpeed = 2;
let cakeYTopSpeed = 4;
let isGameover = false;

//Obstacle object
let cakeImg = new Image();
cakeImg.src = "images/ClipartKey_831865.png";

//Sounds
let backgroundMusic = new Audio();
backgroundMusic.src = "sounds/backgroundMusic.wav";

let smashSound = new Audio();
smashSound.src = "sounds/splatSound.wav";

let loserSound = new Audio();
loserSound.src = "sounds/failSound.wav";

let winnerSound = new Audio();
winnerSound.src = "sounds/yaySound.wav";

//soundPlay functions
function playBackgroundMusic() {
    backgroundMusic.volume = "0.1";
    backgroundMusic.play();
  }

function playSmashSound() {
    smashSound.play();
}

function playloserSound() {
    loserSound.play();
}

function playWinnerSound() {
    winnerSound.play();
}

function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

//StartGame Funtion
function startGame() {
    let background = new Image();
    background.src = "images/background-carnival.jpg";
    playerImg = new Image();
    playerImg.src = "images/Daco_261073.png";

    ctx.drawImage(background, 0, 0 );
    ctx.drawImage(playerImg, playerX, playerY);
    ctx.font = '15px Comic Sans MS';
    ctx.fillStyle = "black";
    ctx.fillText('Time left: ' + counter, 450,canvas.height-645 );
    for (let i = 0; i < cake.length; i++) {
        ctx.drawImage(cakeImg, cake[i].x, cake[i].y);
        collisionCake(i);
    }
    addCake();
    moveCake();
}

//playerMove function
document.addEventListener('keydown', function(event){
    if (event.key === 'ArrowRight'){
        if (playerX + playerMovement < canvas.width - playerMovement - 30) {
            RightArrowDown = true;
            playerX = playerX + playerMovement;
        }
    } 
    else if (event.key === 'ArrowLeft'){
        if (playerX - playerMovement >= 0) {
            LefttArrowDown = true;
            playerX = playerX - playerMovement;
        }        
    } 
});

document.addEventListener('keyup', function(event){
    isRightArrow = false;
    isLefttArrow = false;
});

//Add & Move Cake
function addCake() {
    if (counter >= 40) {
        let randomPossibility = Math.floor(Math.random() * 120);
        let randomPlace = Math.floor(Math.random() * (canvas.width  - 60));
        if(randomPossibility === 1){
            let pie = {
                x: randomPlace,
                y: 10
            };
                cake.push(pie);
        } 
    } else if (counter <= 40 && counter >= 20){
        let randomPossibility = Math.floor(Math.random() * 90); 
        let randomPlace = Math.floor(Math.random() * (canvas.width  - 60));
        if (randomPossibility === 1) {
            let pie = {
                x: randomPlace,
                y: 10
            };
                cake.push(pie);
        } 
    } else {
        let randomPossibility = Math.floor(Math.random() * 60); 
        let randomPlace = Math.floor(Math.random() * (canvas.width  - 60));
        if (randomPossibility === 1) {
            let pie = {
                x: randomPlace,
                y: 10
            };
                cake.push(pie);
        } 
    }
}

function moveCake() {
    cake.forEach((pie) => {
        if (counter >= 40) {
            pie.y++;
            backgroundMusic.playbackRate = 1;
        } else if (counter > 20 && counter <= 40 ) {
            pie.y += cakeYSpeed;
            backgroundMusic.playbackRate = 1.4;
        } else {
            pie.y += cakeYTopSpeed;
            backgroundMusic.playbackRate = 1.8;
        }
    });
}

//cake Collision
function collisionCake(i) {
    if (playerX < (cake[i].x) + cakeImg.width &&
        playerX + playerImg.width > cake[i].x &&
        playerY < cake[i].y + cakeImg.height &&
        playerY + playerImg.height > cake[i].y) {
            playSmashSound();
            clearInterval(intervalId);
            gameOver();
        } 
}

//GameOver Function
function gameOver() {
    clearInterval(intervalId);
    stopBackgroundMusic();
    playloserSound();
    isGameover = true;
    let canvas = document.querySelector('canvas');
    canvas.className = 'hidden';
    let gameOverScreen = document.createElement('div');
    gameOverScreen.className = "gameoverscreen";
    gameOverScreen.innerHTML= 
    `<img class="game-over-img" src="images/hame-over.png">
    <h1 class="gameover">Oh No!</h1>
    <h2>You're covered in cake!</h2>
    <img class= "smashed-gif" src="images/smashed.gif">
    <!-- <button class="btn-start">PLAY AGAIN</button> -->
    <button class="btn-start" onclick="location.href='index.html'">PLAY AGAIN</button>`;
    let body = document.querySelector('body');
    canvas.parentNode.removeChild(canvas);
    body.appendChild(gameOverScreen);
}

//Winner Function
function winner() {
    clearInterval(intervalId);
    stopBackgroundMusic();
    playWinnerSound();
    let canvas = document.querySelector('canvas');
    canvas.className = 'hidden';
    let winningScreen = document.createElement('div');
    winningScreen.className = "winscreen";
    winningScreen.innerHTML= `
        <h1 class="youwin">Congratulations!</h1>
        <h1>You win!</h1>
        <h2>You avoided all the cakes!</h2>
        <img class="inyourface-gif" src="images/inyourface.gif">
        <button class="btn-start" onclick="location.href='index.html'">PLAY AGAIN</button>
        `;
    let body = document.querySelector('body');
    canvas.parentNode.removeChild(canvas);
    body.appendChild(winningScreen);
}