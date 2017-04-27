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
        context.scale(2, 2);
    }

    drawScreen();

    // squares
    function squares() {
        //make changes here.
        context.fillStyle = '#000000';
        context.strokeStyle = '#ff00ff';
        context.lineWidth = 2;
        context.fillRect(10, 10, 40, 40);
        context.strokeRect(0, 0, 60, 60);
        context.clearRect(20, 20, 20, 20);
    }

    // lineDrawing
    function lineDrawing() {
        context.strokeStyle = "black";
        context.lineWidth = 10;
        context.lineCap = 'square';
        context.beginPath();
        context.moveTo(20, 0);
        context.lineTo(100, 0);
        context.stroke();
        context.closePath();
    }

    // arcDrawing
    function arcDrawing() {
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.arc(100, 100, 20, (Math.PI / 180) * 0, (Math.PI / 180) * 180, false);

        context.moveTo(0, 0);
        context.lineTo(100, 200);
        context.arcTo(350, 350, 100, 100, 20);

        //full circle
        context.stroke();
        context.closePath();
    }

    // bezierDrawing
    function bezierDrawing() {
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.moveTo(30, 0);
        context.quadraticCurveTo(100, 25, 30, 50);


        context.moveTo(150, 0);
        context.bezierCurveTo(0, 125, 300, 175, 150, 300);

        context.stroke();
        context.closePath();
    }

    // maskDrawing
    function maskDrawing() {

        //draw a big box on the screen
        context.fillStyle = "black";
        context.fillRect(10, 10, 200, 200);
        context.save();
        context.beginPath(); //clip the canvas to a 50×50 square starting at 0,0
        context.rect(0, 0, 50, 50);
        context.clip();

        //red circle
        context.beginPath();
        context.strokeStyle = "red";
        context.lineWidth = 5;
        context.arc(100, 100, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        //full circle
        context.stroke();
        context.closePath();

        context.restore();

        //reclip to the entire canvas
        context.beginPath();
        context.rect(0, 0, 500, 500);
        context.clip();

        //draw a blue line that is not clipped
        context.beginPath();
        context.strokeStyle = "blue";
        context.lineWidth = 5;
        context.arc(100, 100, 50, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        //full circle
        context.stroke();
        context.closePath();
    }

    // compositing
    function compositing() {

        //draw a big box on the screen
        context.fillStyle = "black"; //
        context.fillRect(10, 10, 200, 200);

        //leave globalCompositeOperation as is
        //now draw a red square
        context.fillStyle = "red";
        context.fillRect(1, 1, 50, 50);

        //now set it to source-over
        context.globalCompositeOperation = "source-over";
        context.fillRect(60, 1, 50, 50);

        //now set to destination-atop
        context.globalCompositeOperation = "destination-over";
        context.fillRect(1, 60, 50, 50);

        //now set globalAlpha
        context.globalAlpha = .5;

        //now set to source-atop
        context.globalCompositeOperation = "source-atop";
        context.fillRect(60, 60, 50, 50);

    }

    // rotation
    function rotation() {

        var x = 100;
        var y = 100;
        var width = 50;
        var height = 50;

        context.setTransform(1, 0, 0, 1, 0, 0);

        context.translate(x + 0.5 * width, y + 0.5 * height);

        var angleInRadians = 45 * Math.PI / 180;
        context.rotate(angleInRadians);

        context.translate(-(x + 0.5 * width), -(y + 0.5 * height));

        //now draw a red square
        context.fillStyle = "red";
        context.fillRect((-0.5 * width + x), (-0.5 * height + y), width, height);
    }

    // fourSquares
    function fourSquares() {

        //now draw a red square
        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 45 * Math.PI / 180;
        var x = 50;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + .5 * width, y + .5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-.5 * width, -.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 75 * Math.PI / 180;
        var x = 100;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + .5 * width, y + .5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-.5 * width, -.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 90 * Math.PI / 180;
        var x = 150;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + .5 * width, y + .5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-.5 * width, -.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 120 * Math.PI / 180;
        var x = 200;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + .5 * width, y + .5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-.5 * width, -.5 * height, width, height);
    }

    // scale
    function scale() {

        var x = 100;
        var y = 100;
        var width = 100;
        var height = 50;

        context.setTransform(1, 0, 0, 1, 0, 0);

        context.translate(x + 0.5 * width, y + 0.5 * height);

        context.scale(4, 4);
        var angleInRadians = 45 * Math.PI / 180;
        context.rotate(angleInRadians);

        context.fillStyle = "rgb(224, 71, 116)";
        context.fillRect((-0.5 * width), (-0.5 * height), width, height);
    }

    // fillGradient
    function fillGradient() {

        // horizontal gradient values must remain 0
        var gr = context.createLinearGradient(0, 0, 100, 0);

        // Add the color stops.
        gr.addColorStop(0, 'rgb(255,0,0)');
        gr.addColorStop(.5, 'rgb(0,255,0)');
        gr.addColorStop(1, 'rgb(255,0,0)');

        // Use the gradient for the fillStyle.
        context.fillStyle = gr;
        context.fillRect(0, 0, 100, 100);
        context.fillRect(0, 100, 50, 100);
        context.fillRect(0, 200, 200, 100);
    }

    // strokeGradient
    function strokeGradient() {

        var gr = context.createLinearGradient(0, 0, 100, 0);

        // Add the color stops.
        gr.addColorStop(0, 'rgb(255,0,0)');
        gr.addColorStop(.5, 'rgb(0,255,0)');
        gr.addColorStop(1, 'rgb(255,0,0)');

        // Use the gradient for the fillStyle.
        context.strokeStyle = gr;
        context.strokeRect(0, 0, 100, 100);
        context.strokeRect(0, 100, 50, 100);
        context.strokeRect(0, 200, 200, 100);
    }

    // closeShapedGradient
    function closeShapedGradient() {
        var gr = context.createLinearGradient(0, 0, 0, 100);

        // Add the color stops.
        gr.addColorStop(0, 'rgb(255,0,0)');
        gr.addColorStop(.5, 'rgb(0,255,0)');
        gr.addColorStop(1, 'rgb(255,0,0)');

        // Use the gradient for the fillStyle.
        context.fillStyle = gr;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(50, 0);
        context.lineTo(100, 50);
        context.lineTo(50, 100);
        context.lineTo(0, 100);
        //context.lineTo(0, 0);
        context.stroke();
        context.fill();
        //context.closePath();
    }

    // radialGradient
    function drawScreen() {

        var gr = context.createRadialGradient(50, 50, 0, 50, 50, 100);

        // Add the color stops.
        gr.addColorStop(0, 'rgb(255,0,0)');
        gr.addColorStop(.5, 'rgb(0,255,0)');
        gr.addColorStop(1, 'rgb(255,0,0)');

        // Use the gradient for the fillStyle.
        context.fillStyle = gr;
        context.arc(100, 100, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        context.fill();
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
// information such as rotations or translations using the context.rotate() and context.setTransform() methods
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
