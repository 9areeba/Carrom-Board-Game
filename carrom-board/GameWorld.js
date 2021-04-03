//The game world will contain all the physical objects of the game
// Resposnisble to draw and update these objects 
let queenCounter = 0;

function GameWorld (){

    
    this.balls = CONSTANTS.ballsParams.map(params => new Ball(...params));

    this.blueBall = this.balls.find(ball => ball.colour === COLOUR.BLUE);

    this.hand = new Hand(
        new Vector2(294.5, 512.5),
        this.blueBall.shoot.bind(this.blueBall)
    );

    this.table = {
        TopY: 15,
        RightX: 585,
        BottomY: 585,
        LeftX: 15
    };

    this.p_yellow = new Player(true, COLOUR.YELLOW);
    this.p_black = new Player(false, COLOUR.BLACK);

    // this is displaying to the use whose turn it is 
    this.playerTurn = document.getElementById('Player');

    this.stopGame = false;
    this.pocketedYellowBalls = [];
    this.pocketedBlackBalls = [];
    this.winner = undefined;
}

// used to check all the collisions with balls, board and pockets
GameWorld.prototype.handleCollisions = function(){
    for(let i = 0; i < this.balls.length; i++){

        this.balls[i].handleBallInPocket();
        this.balls[i].collideWithTable(this.table);

        for(let j = i+1; j < this.balls.length; j++){
            firstBall = this.balls[i];
            secondBall = this.balls[j];
            firstBall.collideWithBall(secondBall);
        }
    }
}

// this handles what should happen to striker and hand when user is setting up to shoot
GameWorld.prototype.handleInput = function(){
    if(this.stopGame === false){
        this.blueBall.handleInput();
        this.hand.handleInput();
    }
}

GameWorld.prototype.update = function(){
    //with each update positon we need to check if game ends
    this.checkIfGameEnds();

    if(this.stopGame){
        return;
    }
    // if the game has not stopped all the obejects are updated
    this.handleCollisions();

    this.hand.update(); 

    for(let i = 0; i < this.balls.length; i++){
        this.balls[i].update(CONSTANTS.delta);
    }


    // repostioning the stirker and hand here
    if(!this.ballsMoivng() && this.hand.shot && this.hand.aim){
        this.hand.reposition(new Vector2(294.5, 512.5));
        this.blueBall.reposition(new Vector2(294.5, 512.5));

        if(!this.p_yellow.secondTurn && !this.p_black.secondTurn){
            // with each reposition the turns are changing
            this.p_yellow.turn = !this.p_yellow.turn;
            this.p_black.turn = !this.p_black.turn;
        }

        if(!this.p_black.queen && !this.p_yellow.queen){
            this.p_yellow.reset();
            this.p_black.reset();
        }

        

        // displaying whic players turn it is 
        if(this.p_black.turn){
            this.playerTurn.innerHTML = "Player Black's Turn";

        }else{
            this.playerTurn.innerHTML = "Player Yellow's Turn";

        }
    }

    
}

GameWorld.prototype.draw = function(){
    Canvas.drawImage(sprites.background, {x:0,y:0});
    // drawing scores
    Canvas.drawText("Player Yellow: "+ this.p_yellow.score, new Vector2(100,4), COLOUR.white, "15px");
    Canvas.drawText("Player Black: "+ this.p_black.score, new Vector2(350,4), COLOUR.white, "15px");

    this.hand.draw();
    for(let i = 0; i < this.balls.length; i++){
        this.balls[i].draw();
    }

    if(this.stopGame){
        this.checkWhoWon();

        Canvas.drawImage(sprites.gameOver, new Vector2(10,190));
        Canvas.drawImage(sprites.winner, new Vector2(150,320));
        if(this.winner === "Tie"){
            Canvas.drawText("It is a Tie!", new Vector2(240,332), COLOUR.white, "18px");
        }
        else{
            Canvas.drawText("Player "+ this.winner+" Wins!", new Vector2(200,332), COLOUR.white, "18px");
        }

    }

    
};

GameWorld.prototype.ballsMoivng = function(){
    let areBallsMoving = false

    for(let i =0; i < this.balls.length; i++){
        if(this.balls[i].moving){
            areBallsMoving = true;
            break
        }
    }

    return areBallsMoving;
}

// checking the pocketed balls list
GameWorld.prototype.checkIfGameEnds = function(){
    if(this.pocketedYellowBalls.length === 9){      
        this.stopGame = true;
    }
    if(this.pocketedBlackBalls.length === 9){
        this.stopGame = true;
    }
}

GameWorld.prototype.checkWhoWon = function(){
    if(this.p_yellow.score > this.p_black.score){
        this.winner = "Yellow";
    }
    else if(this.p_black.score > this.p_yellow.score){
        this.winner = "Black"
    }
    else{
        this.winner = "Tie"
    }
}

