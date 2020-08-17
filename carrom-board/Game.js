//Function constructor 
function Game(){

}

Game.prototype.init = function(){
    // New memeber for the game object
    this.gameWorld = new GameWorld(); // Gertting the physical objects

}

Game.prototype.start = function(){
    CarromGame.init();
    CarromGame.mainLoop();
}

Game.prototype.mainLoop = function(){
  

    // Clear the canvas 
    Canvas.clear();
    CarromGame.gameWorld.handleInput();
    CarromGame.gameWorld.update(); //.gameWorld is a property of the object defined in the init method
    CarromGame.gameWorld.draw();
    Mouse.reset();
 
    requestAnimationFrame(CarromGame.mainLoop);

}

let CarromGame = new Game();