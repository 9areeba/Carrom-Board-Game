let left = 1;
let middle = 2;
let right = 3;

function handleMouseMove(event){
    let x = event.pageX;
    let y = event.pageY;

    Mouse.position = new Vector2(x,y);
    
}

function handleMouseDown(event){
    //grabbing the current position of the mouse
    handleMouseMove(event);

    if (event.which === left){
        if (!Mouse.left.down)
            Mouse.left.pressed = true;
        Mouse.left.down = true;
    }else if (event.which === middle){
        if (!Mouse.middle.down)
            Mouse.middle.pressed = true;
        Mouse.middle.down = true;
    }else if (event.which === right){
        if (!Mouse.right.down)
            Mouse.right.pressed = true;
        Mouse.right.down = true;        
    }
}

function handleMouseUp(event){
    handleMouseMove(event)

    if (event.which === left)
        Mouse.left.down = false;
    else if (event.which === middle)
        Mouse.middle.down = false;
    else if (event.which === right)
        Mouse.right.down = false;
}


function MouseHandler(){
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();

    this.position = new Vector2();

    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

MouseHandler.prototype.reset = function(){
    this.left.pressed = false;
    this.middle.pressed = false;
    this.right.pressed = false;
}

let Mouse = new MouseHandler();
