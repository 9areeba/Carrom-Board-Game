// Will have functions to assist with loading the assets for the game

let sprites = {};
let sounds = {};
let asseetsStillLoading = 0;

function assetsLoadingLoop(callback){

    if (asseetsStillLoading){
        //This uses recursion and calls the fucntion again 
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
    else{
        callback();
    }
}

// Once all the assets have been laoded then the call back fucntion will be called
function loadAssets(callback){

    // This function will load the sprite images
    function loadSprite(filename){
        asseetsStillLoading ++; 

        let spriteImage = new Image();
        spriteImage.src = "assets/sprites/" + filename;

        // This is event handler and once the image has fully loaded, the function inside it will execute
        spriteImage.onload = function(){
            asseetsStillLoading --;
        }

        return spriteImage;
    }

    function loadSound(sound, loop){
        return new Sound("assets/sounds/" + sound, loop);
    }

    sprites.background = loadSprite("board.png");
    sprites.hand = loadSprite("hand2.png"); 
    sprites.blueBall = loadSprite("pointer.png");
    sprites.queen = loadSprite("queen.png");
    sprites.yellowBall = loadSprite("yellow.png");
    sprites.blackBall = loadSprite("black.png");
    sprites.gameOver = loadSprite("gameOver.png");
    sprites.continue = loadSprite("continue.png");
    sprites.winner = loadSprite("finalScore.png");
    
    sounds.collide = loadSound("BallsCollide");
    sounds.pocket = loadSound("pocket");
    sounds.side = loadSound("Side");

    assetsLoadingLoop(callback);
}

function getBallSpriteByColour(colour){
    switch(colour){
        case COLOUR.RED:
            return sprites.queen;
        case COLOUR.BLACK:
            return sprites.blackBall;
        case COLOUR.YELLOW:
            return sprites.yellowBall;
        case COLOUR.BLUE:
            return sprites.blueBall;

    }

}
