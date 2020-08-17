function Ball(position, colour){
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColour(colour);
    this.mass = 1;
    this.colour = colour;
    this.visible = true;
}

Ball.prototype.handleInput = function(){
    if (!CarromGame.gameWorld.hand.aim && Mouse.position.x >= CONSTANTS.leftBoundaryCircle && Mouse.position.x <= CONSTANTS.rightBoundaryCircle){
        this.position.x = Mouse.position.x; 
    }
}

Ball.prototype.update = function(delta){
    if(!this.visible){
        return;
    }

    this.position.addTo(this.velocity.mult(delta));

    //Modelling friction
    this.velocity = this.velocity.mult(CONSTANTS.friction);

    if(this.velocity.length() < 5){
        //setting the velocity of the ball to be 0
        this.velocity = new Vector2();
        this.moving = false;
    }
}

Ball.prototype.draw = function(){
    if(!this.visible){
        return;
    }

    Canvas.drawImage(this.sprite, this.position, CONSTANTS.ballOrigin)
}

Ball.prototype.shoot = function(power, rotation){
    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving = true;

}

Ball.prototype.handleBallInPocket = function(){

    if(!this.visible){
        return;
    }
        
    CONSTANTS.pockets.forEach(pocket =>{
        dist = pocket.distance(this.position);
        collided = check_collision_with_corner(dist, (CONSTANTS.pocketRadius + CONSTANTS.ballRadius));


        if(queenCounter === 3){
            queenCounter = 0;
            // if the users haven't pocketed a piece after the queen it comes back to the center
            if(CarromGame.gameWorld.p_yellow.turn && CarromGame.gameWorld.p_yellow.queen){   
                CarromGame.gameWorld.p_yellow.queen = false;
                CarromGame.gameWorld.balls[18].velocity = new Vector2();  
                CarromGame.gameWorld.balls[18].position = new Vector2(300,300);  
                CarromGame.gameWorld.balls[18].visible = true;
                CarromGame.gameWorld.p_yellow.secondTurn = false;

            }
            if(CarromGame.gameWorld.p_black.turn && CarromGame.gameWorld.p_black.queen){   
                CarromGame.gameWorld.p_black.queen = false;
                CarromGame.gameWorld.balls[18].velocity = new Vector2();  
                CarromGame.gameWorld.balls[18].position = new Vector2(300,300);  
                CarromGame.gameWorld.balls[18].visible = true;
                CarromGame.gameWorld.p_black.secondTurn = false;

            }
        }


        if (collided == true){
            if(this.colour == COLOUR.BLUE){
                return;
            }

            if(CarromGame.gameWorld.p_yellow.turn){                
                CarromGame.gameWorld.p_yellow.points(this.colour);   

                // if they pocketed another piece after queen the user gets points
                if(CarromGame.gameWorld.p_yellow.queen && this.colour === CarromGame.gameWorld.p_yellow.playerColour){
                    CarromGame.gameWorld.p_yellow.score += 30;
                    queenCounter = 0;
                    CarromGame.gameWorld.p_yellow.queen = false;    

                } 
            }
            if(CarromGame.gameWorld.p_black.turn){
                CarromGame.gameWorld.p_black.points(this.colour);    

                // if they pocketed another piece after queen the user gets points
                if(CarromGame.gameWorld.p_black.queen && this.colour === CarromGame.gameWorld.p_black.playerColour){
                    CarromGame.gameWorld.p_black.score += 30;
                    queenCounter = 0;
                    CarromGame.gameWorld.p_black.queen = false;

                } 
            }

            // pocketing the ball
            this.visible = false;
            this.moving = false; 

            // adding the pocketed ball the pocketed balls list
            if(this.colour === COLOUR.YELLOW){
                CarromGame.gameWorld.pocketedYellowBalls.push(this);
            }
            if(this.colour === COLOUR.BLACK){
                CarromGame.gameWorld.pocketedBlackBalls.push(this);
            }
            
            sounds.pocket.volume = 0.5;
            sounds.pocket.play();
            return;
        }

    });

}
// checking collisions
Ball.prototype.collideWithBall = function(ball) {

    if(!this.visible || !ball.visible){
        return;
    }

    // using pythagoras's theorem to see if the balls are touching
    dist_between_balls = this.position.distance(ball.position);

    if (dist_between_balls - CONSTANTS.ballDiameter > 0){
        return;
    }

    const xVelocityDiff = this.velocity.x - ball.velocity.x;
    const yVelocityDiff = this.velocity.y - ball.velocity.y;

    const xDist = ball.position.x - this.position.x;
    const yDist = ball.position.y - this.position.y;

    // Prevent accidental overlap of particles, 
    // as i am only chechking the for collisons if the diffence iv velocities is more than or equal to 0
    // this also prevent the pieces from collating/ sticking together 
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles, 
        // this is done by using tan function between the centres of the circles 
        const angle = -Math.atan2(yDist, xDist);


        // Store mass in var for better readability in collision equation
        const m1 = this.mass;
        const m2 = ball.mass;

        // Velocity before equation
        const u1 = this.velocity.rotate(angle);
        const u2 = ball.velocity.rotate(angle);

        // // Velocity after 1d collision equation
        const v1 = new Vector2(u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), u1.y);
        const v2 = new Vector2(u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), u2.y);
   

        // Final velocity after rotating axis back to original location
        const vFinal1 = v1.rotate(-angle);
        const vFinal2 = v2.rotate(-angle);

        // // Swap particle velocities for realistic bounce effect
        this.velocity = new Vector2(vFinal1.x, vFinal1.y);
        ball.velocity = new Vector2(vFinal2.x, vFinal2.y);

    }
}

// reversing the direction of the velocities when they touch the edge of the board
Ball.prototype.collideWithTable = function(table){
    if(!this.visible){
        return;
    }
    
    let collided = false;

    if(this.position.y <= table.TopY + CONSTANTS.ballRadius){
        this.position.y = table.TopY + CONSTANTS.ballRadius; //stops the ball from stikcing to the top of the table
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
        sounds.side.volume = 0.1;
        sounds.side.play();
    }
    if(this.position.x >= table.RightX - CONSTANTS.ballRadius){
        this.position.x = table.RightX - CONSTANTS.ballRadius;
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
        sounds.side.volume = 0.1;
        sounds.side.play();
    }
    if(this.position.y >= table.BottomY - CONSTANTS.ballRadius){
        this.position.y = table.BottomY - CONSTANTS.ballRadius;
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
        sounds.side.volume = 0.1;
        sounds.side.play();
    }
    if(this.position.x <= table.LeftX + CONSTANTS.ballRadius){
        this.position.x = table.LeftX + CONSTANTS.ballRadius;
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
        sounds.side.volume = 0.1;
        sounds.side.play();
    }

    if(collided){
        this.velocity = this.velocity.mult(CONSTANTS.friction);
    }
}


Ball.prototype.reposition = function(position){
    this.position = position.copy();
}
