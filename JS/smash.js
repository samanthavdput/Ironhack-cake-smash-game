//Obstacles
let cakeImg = new Image();
cakeImg.src = "/images/ClipartKey_831865.png";

//Game Variables
let playerX = 120;
let playerY = 500;
let RightArrowDown = false;
let LefttArrowDown = false;
let playerMovement = 20; 
let cake = [ { x: 700, y: 150 } ];
let cakeX = cake.x;
let cakeY = cake.y;
let cakeYincrement = 2;
let cakeYincrementMore = 4;

//playerMove function
document.addEventListener('keydown', function(event){
    if (event.key === 'ArrowRight'){
        if (playerX + playerMovement < canvas.width - playerMovement - 50) {
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

//StartGame Funtion
function startGame() {
    let background = new Image();
    background.src = "/images/background-carnival.jpg";
    let playerImg = new Image();
    playerImg.src = '/images/Daco_261073.png';

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

//Add & Move Cake
function addCake() {
    if (counter >= 30) {
        let randomPossibility = Math.floor(Math.random() * 120);
        let randomPlace = Math.floor(Math.random() * (canvas.width  - 30));
        if(randomPossibility === 1){
            let cupcake = {
                x: randomPlace,
                y: 10
            }
                cake.push(cupcake);
        } 
    } else {
        let randomPossibility = Math.floor(Math.random() * 60); 
        let randomPlace = Math.floor(Math.random() * (canvas.width  - 30));
        if(randomPossibility === 1){
            let cupcake = {
                x: randomPlace,
                y: 10
            };
                cake.push(cupcake);
        } 
    }
}

function moveCake() {
    cake.forEach((cupcake) => {
        if (counter >= 40) {
            cupcake.y++;
        } else if (counter > 20 && counter <= 40 ) {
            cupcake.y += cakeYincrement;
        } else {
            cupcake.y += cakeYincrementMore;
        }
    });
}

//cake Collision
function collisionCake(i) {
    if (playerX < (cake[i].x -10)+ cakeImg.width  &&
        playerX + cakeImg.width > (cake[i].x -10) &&
        playerY < (cake[i].y -5) + cakeImg.height &&
        playerY + cakeImg.height > (cake[i].y -5)) {
            clearInterval(intervalId);
            gameOver();
        } 
}

//GameOver Function
function gameOver() {
    clearInterval(intervalId);
    let canvas = document.querySelector('canvas');
    canvas.className = 'hidden';
    let gameOverScreen = document.createElement('div');
    gameOverScreen.className = "gameoverscreen";
    gameOverScreen.innerHTML= 
    `<img class="game-over-img" src="/images/hame-over.png">
    <h1 class="gameover">Oh No!</h1>
    <h2>You're covered in cake!</h2>
    <img class= "smashed-gif" src="/images/smashed.gif">
    <!-- <button class="btn-start">PLAY AGAIN</button> -->
    <button class="btn-start" onclick="location.href='index.html'">PLAY AGAIN</button>`;
    let body = document.querySelector('body');
    canvas.parentNode.removeChild(canvas);
    body.appendChild(gameOverScreen);
}

//Winner Function
function winner() {
    clearInterval(intervalId);
    let canvas = document.querySelector('canvas');
    canvas.className = 'hidden';
    let winningScreen = document.createElement('div');
    winningScreen.className = "winscreen";
    winningScreen.innerHTML= `
        <h1 class="youwin">Congratulations!</h1>
        <h1>You win!</h1>
        <h2>You avoided all the cakes!</h2>
        <img class="inyourface-gif" src="/images/inyourface.gif">
        <button class="btn-start" onclick="location.href='index.html'">PLAY AGAIN</button>
        `;
    let body = document.querySelector('body');
    canvas.parentNode.removeChild(canvas);
    body.appendChild(winningScreen);
}