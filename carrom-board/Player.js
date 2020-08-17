
function Player(turn, colour){
    this.score = 0;
    this.turn = turn;
    this.playerColour = colour
    this.secondTurn = false;
    this.queen = false;
}

Player.prototype.points = function(ballColour){
    // queen gives 50 points
    if(ballColour == COLOUR.RED){
        this.queen = true;
        this.secondTurn = true;
        queenCounter += 1;
    }

    // it's own colour = 10 points
    else if(ballColour === this.playerColour){
        this.score += 10
        this.secondTurn = true;

    }

    // pocketing a different colour cause the player to lose 5 points, and opponent to gain 10 points
    else if(ballColour !== this.playerColour){

        if(this.playerColour === COLOUR.YELLOW){
            // then opponent gets 10 points
            CarromGame.gameWorld.p_black.score += 10;
        }
            if(this.playerColour === COLOUR.BLACK){

            CarromGame.gameWorld.p_yellow.score += 10;
        }
    }
  
}

Player.prototype.reset = function(){
    this.secondTurn = false;
}