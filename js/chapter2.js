window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {

    canvasApp();

}

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {

    if (!canvasSupport()) {
        return;
    } else {
        var theCanvas = document.getElementById("canvas");
        var context = theCanvas.getContext("2d");
    }

    drawScreen();

    function drawScreen() {
        //make changes here.
        context.fillStyle = '#000000';
        context.strokeStyle = '#ff00ff';
        context.lineWidth = 2;
        context.fillRect(10, 10, 40, 40);
        context.strokeRect(0, 0, 60, 60);
        context.clearRect(20, 20, 260, 20);

    }
}


// Canvas state
// Transformation matrix information such as rotations or translations using the context.rotate() and context.setTransform() methods
// The current clipping region
// The current values for canvas attributes, such as (but not limited to):
// globalAlpha
// globalCompositeOperation
// strokeStyle
// textAlign, textBaseline
// lineCap, lineJoin, lineWidth, and miterLimit
// fillStyle
// font
// shadowBlur, shadowColor, shadowOffsetX, and shadowOffsetY
