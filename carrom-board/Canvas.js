function Canvas2D(){
    this._canvas = document.getElementById('screen');
    this._canvasContext = this._canvas.getContext("2d");
}

//Methods 
Canvas2D.prototype.clear = function(){
    // Clearing the canvas
    this._canvasContext.clearRect(0,0, this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.drawImage = function(image, position, origin, rotation = 0) {
    if(!position){
        position = new Vector2();
    }

    if(!origin){
        origin = new Vector2();
    }

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    // Use canvas context to draw an image in a given position
    this._canvasContext.drawImage(image, -origin.x, -origin.y);
    this._canvasContext.restore();
}

// drawing texts and setting values if theyre not given as an argument
Canvas2D.prototype.drawText = function (text, position, color,fontsize, textAlign, fontname) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    color = typeof color !== 'undefined' ? color : COLOUR.black;
    color = color;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
};
let Canvas = new Canvas2D;

