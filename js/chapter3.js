window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {

    var patternImage = new Image();
    patternImage.src = 'img/flower_small.jpg';
    patternImage.onload = eventAssetsLoaded;
}

function eventAssetsLoaded() {

    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {

    if (!canvasSupport()) {
        return;
    }

    var message = "your text";
    var fillOrStroke = "fill";

    var fontSize = "50";
    var fontFace = "garamond";
    var fontWeight = "normal";
    var fontStyle = "normal";

    var fillType = "radialGradient";
    var textFillColor = "#FFF800";
    var textFillColor2 = "#E872B0";
    var pattern = new Image();
    pattern.src = 'img/flower_small.jpg';

    var textBaseline = "middle";
    var textAlign = "center";

    var textAlpha = 1;
    var shadowX = 1;
    var shadowY = 1;
    var shadowBlur = 1;
    var shadowColor = "#707070";

    var colorStops = new Array({
        color: "#FF0000",
        stopPercent: 0
    }, {
        color: "#FFFF00",
        stopPercent: .125
    }, {
        color: "#00FF00",
        stopPercent: .375
    }, {
        color: "#0000FF",
        stopPercent: .625
    }, {
        color: "#FF00FF",
        stopPercent: .875
    }, {
        color: "#FF0000",
        stopPercent: 1
    });

    var theCanvas = document.getElementById("canvas");
    var context = theCanvas.getContext("2d");
    context.scale(2, 2);

    var formElement = document.getElementById("textBox");
    formElement.addEventListener('keyup', textBoxChanged, false);

    formElement = document.getElementById("fillOrStroke");
    formElement.addEventListener('change', fillOrStrokeChanged, false);

    formElement = document.getElementById("textSize");
    formElement.addEventListener('change', textSizeChanged, false);

    formElement = document.getElementById("textFont");
    formElement.addEventListener('change', textFontChanged, false);

    formElement = document.getElementById("fontWeight");
    formElement.addEventListener('change', fontWeightChanged, false);

    formElement = document.getElementById("fontStyle");
    formElement.addEventListener('change', fontStyleChanged, false);

    formElement = document.getElementById("fillType");
    formElement.addEventListener('change', fillTypeChanged, false);

    formElement = document.getElementById("textFillColor");
    formElement.addEventListener('change', textFillColorChanged, false);

    formElement = document.getElementById("textFillColor2");
    formElement.addEventListener('change', textFillColor2Changed, false);

    formElement = document.getElementById("textBaseline");
    formElement.addEventListener('change', textBaselineChanged, false);

    formElement = document.getElementById("textAlign");
    formElement.addEventListener('change', textAlignChanged, false);

    formElement = document.getElementById("textAlpha");
    formElement.addEventListener('change', textAlphaChanged, false);

    formElement = document.getElementById("shadowX");
    formElement.addEventListener('change', shadowXChanged, false);

    formElement = document.getElementById("shadowY");
    formElement.addEventListener('change', shadowYChanged, false);

    formElement = document.getElementById("shadowBlur");
    formElement.addEventListener('change', shadowBlurChanged, false);

    formElement = document.getElementById("shadowColor");
    formElement.addEventListener('change', shadowColorChanged, false);

    formElement = document.getElementById("canvasWidth");
    formElement.addEventListener('change', canvasWidthChanged, false);

    formElement = document.getElementById("canvasHeight");
    formElement.addEventListener('change', canvasHeightChanged, false);

    formElement = document.getElementById("createImageData");
    formElement.addEventListener('click', createImageDataPressed, false);

    drawScreen();

    // simpleFont
    function drawScreen() {

        context.globalAlpha = 1.0;

        context.shadowColor = "#707070";
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;

        var w = theCanvas.width / 2;
        var h = theCanvas.height / 2;
        context.clearRect(0, 0, w, h);
        context.fillStyle = "rgb(240, 240, 240)";
        context.fillRect(0, 0, w, h);
        context.strokeStyle = "rgb(160, 160, 160)";
        context.strokeRect(0, 0, w, h);

        // vertical alignment
        context.textBaseline = textBaseline;
        // horizontal alignment
        context.textAlign = textAlign;

        context.font = fontWeight + " " + fontStyle + " " + fontSize + "px " + fontFace;
        context.lineWidth = 2;

        var metrics = context.measureText(message);
        var textWidth = metrics.width;

        context.strokeStyle = "rgb(224, 71, 116)";

        var xPosition = (theCanvas.width / 4);
        var yPosition = (theCanvas.height / 4);

        context.globalAlpha = textAlpha;

        context.shadowColor = shadowColor;
        context.shadowOffsetX = shadowX;
        context.shadowOffsetY = shadowY;
        context.shadowBlur = shadowBlur;

        switch (fillType) {
            case "colorFill":
                context.fillStyle = textFillColor;
                break;
            case "linearGradient":
                var halfTextWidth = textWidth / 2;
                var gradient = context.createLinearGradient(xPosition - halfTextWidth, 100, xPosition + halfTextWidth, 100);
                gradient.addColorStop(0, textFillColor);
                gradient.addColorStop(1, textFillColor2);

                context.fillStyle = gradient;
                break;
            case "radialGradient":
                var halfTextWidth = textWidth / 2;
                var gradient = context.createRadialGradient(xPosition, yPosition, 0, xPosition, yPosition, halfTextWidth);
                gradient.addColorStop(0, textFillColor);
                gradient.addColorStop(1, textFillColor2);

                context.fillStyle = gradient;
                break;
            case "animatedGradient":
                var gradient = context.createLinearGradient(
                    theCanvas.width / 2,
                    0,
                    theCanvas.width / 2,
                    theCanvas.height);

                for (var i = 0; i < colorStops.length; i++) {
                    var tempColorStop = colorStops[i];
                    var tempColor = tempColorStop.color;
                    var tempStopPercent = tempColorStop.stopPercent;
                    gradient.addColorStop(tempStopPercent, tempColor);
                    tempStopPercent += .015;
                    if (tempStopPercent > 1) {
                        tempStopPercent = 0;
                    }
                    tempColorStop.stopPercent = tempStopPercent;;
                    colorStops[i] = tempColorStop;
                }

                context.fillStyle = gradient;
                break;
            case "pattern":
                var fillPattern = context.createPattern(pattern, 'repeat');
                context.fillStyle = fillPattern;
                break;
        }

        switch (fillOrStroke) {
            case "fill":
                context.fillText(message, xPosition, yPosition);
                break;
            case "stroke":
                context.strokeText(message, xPosition, yPosition);
                break;
            case "both":
                context.fillText(message, xPosition, yPosition);
                context.strokeText(message, xPosition, yPosition);
                break;
        }
    }

    function textBoxChanged(e) {
        var target = e.target;
        message = target.value;
        drawScreen();
    }

    function fillOrStrokeChanged(e) {
        var target = e.target;
        fillOrStroke = target.value;
        drawScreen();
    }

    function textSizeChanged(e) {
        var target = e.target;
        fontSize = target.value;
        drawScreen();
    }

    function textFontChanged(e) {
        var target = e.target;
        fontFace = target.value;
        drawScreen();
    }

    function fontWeightChanged(e) {
        var target = e.target;
        fontWeight = target.value;
        drawScreen();
    }

    function fontStyleChanged(e) {
        var target = e.target;
        fontStyle = target.value;
        drawScreen();
    }

    function fillTypeChanged(e) {
        var target = e.target;
        fillType = target.value;
        drawScreen();
    }

    function textFillColorChanged(e) {
        var target = e.target;
        textFillColor = "#" + target.value;
        drawScreen();
    }

    function textFillColor2Changed(e) {
        var target = e.target;
        textFillColor2 = "#" + target.value;
        drawScreen();
    }

    function textBaselineChanged(e) {
        var target = e.target;
        textBaseline = target.value;
        drawScreen();
    }

    function textAlignChanged(e) {
        var target = e.target;
        textAlign = target.value;
        drawScreen();
    }

    function textAlphaChanged(e) {
        var target = e.target;
        textAlpha = (target.value);
        drawScreen();
    }

    function shadowXChanged(e) {
        var target = e.target;
        shadowX = target.value;
        drawScreen();
    }

    function shadowYChanged(e) {
        var target = e.target;
        shadowY = target.value;
        drawScreen();
    }

    function shadowBlurChanged(e) {
        var target = e.target;
        shadowBlur = target.value;
        drawScreen();
    }

    function shadowColorChanged(e) {
        var target = e.target;
        shadowColor = target.value;
        drawScreen();
    }

    function canvasWidthChanged(e) {
        var target = e.target;
        theCanvas.width = target.value;
        theCanvas.style.width = target.value / 2 + "px";

        var context = theCanvas.getContext("2d");
        context.scale(2, 2);

        drawScreen();
    }

    function canvasHeightChanged(e) {
        var target = e.target;
        theCanvas.height = target.value;
        theCanvas.style.height = target.value / 2 + "px";

        var context = theCanvas.getContext("2d");
        context.scale(2, 2);

        drawScreen();
    }

    function createImageDataPressed(e) {

        var imageDataDisplay = document.getElementById('imageDataDisplay');
        imageDataDisplay.value = theCanvas.toDataURL();
        window.open(imageDataDisplay.value, "canvasImage", "left=0,top=0,width=" +
            theCanvas.width + ",height=" + theCanvas.height +
            ",toolbar=0,resizable=0");
    }

    function gameLoop() {
        window.setTimeout(gameLoop, 20);
        drawScreen()
    }
    gameLoop();
}

// font order:
// [font style] [font weight] [font size] [font face]

// Canvas can use fonts designated in css (after it has been loaded)
// @font-face {
//     font-family: Arcade;
//     src: url('arcade.otf');
// }
