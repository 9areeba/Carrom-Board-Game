// this is the vecotr class and i will use this the carry out all of the mathmatetical

function Vector2(x=0, y=0){
    this.x = x;
    this.y = y;

}

Vector2.prototype.copy = function(){
    return new Vector2(this.x, this.y);
    
}

Vector2.prototype.addTo = function(vector){
    this.x += vector.x;
    this.y += vector.y;
}

Vector2.prototype.mult = function(scaler){
    return new Vector2(this.x * scaler, this.y * scaler);
}


Vector2.prototype.length = function(){
    return Math.sqrt(Math.pow(this.x, 2), Math.pow(this.y, 2));
}

Vector2.prototype.rotate = function(angle){
    return new Vector2(
        this.x * Math.cos(angle) - this.y * Math.sin(angle),
        this.x * Math.sin(angle) + this.y * Math.cos(angle)
    )
}

Vector2.prototype.distance = function(vector){
    x_length = vector.x - this.x;
    y_length = vector.y - this.y;

    return Math.sqrt(Math.pow(x_length, 2) + Math.pow(y_length, 2));
}


// extra utility function:
// checks if collison occurs between a ball and a corner
function check_collision_with_corner(distance, ball_and_radius){
    if(distance < ball_and_radius){
        return true;
    }
    else{
        return false;
    }
}