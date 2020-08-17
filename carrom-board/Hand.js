function Hand(position, onShoot){
    this.position = position,
    this.origin = CONSTANTS.handOrigin.copy();
    this.rotation = 0;
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
    this.aim = false;
    this.counter = 0;
}

Hand.prototype.handleInput = function(){
    // allowing the user to first decide where to place the counter.
    if(!this.aim && Mouse.position.x >= CONSTANTS.leftBoundaryCircle && Mouse.position.x <= CONSTANTS.rightBoundaryCircle){
        this.position.x = Mouse.position.x;
        if(Mouse.left.pressed){
            this.position.x = Mouse.position.x;
            this.aim = true;
            this.counter += 1;
        }
    }
}

Hand.prototype.update = function(){
    // stops the user for shooting whilst the striker has already been shot
    if(this.shot){
        return;
    }
    
    if (this.aim === true && Mouse.left.down){
        this.increasePower();
        this.counter +=1;
    }
    else if(this.power > 0 && this.counter >= 13){
        this.shoot();
        sounds.collide.volume = 0.7;
        sounds.collide.play();

    }

    this.updateRotation();
}

Hand.prototype.draw = function(){
    Canvas.drawImage(sprites.hand, this.position, this.origin, this.rotation);
}

// finds hhow much the hand should rotate
Hand.prototype.updateRotation = function(){
    let opp = Mouse.position.y - this.position.y;
    let adj = Mouse.position.x - this.position.x;

    this.rotation = Math.atan2(opp, adj) - Math.PI/2;
}

Hand.prototype.increasePower = function(){
    if(this.power > CONSTANTS.maxPower){
        return;
    }
    this.power += 40;
    this.origin.y += 1;
}

Hand.prototype.shoot = function(){
    this.onShoot(this.power, (this.rotation + Math.PI/2));
    this.power = 0;
    this.origin = CONSTANTS.handShotOrigin.copy();
    this.shot = true;

}

// reseting all the attributes realeted to shooting as this allows the user to shoot again
Hand.prototype.reposition = function(position){
    this.position = position.copy();
    this.origin = CONSTANTS.handOrigin.copy();
    this.shot = false;
    this.aim = false;
    this.counter = 0;

    // with each reposition after the queen has been pocketed the counter will increase by one
    
    if(queenCounter >= 1){
        queenCounter += 1;
        
    }
    console.log(queenCounter);
}
