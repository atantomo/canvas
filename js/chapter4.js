window.addEventListener('load', eventWindowLoaded, false);

var tileSheet = new Image();
var photo = new Image();
var plus = new Image();
var cross = new Image();

var expectedImgCnt = 2;
var loadedImgCnt = 0;

var blueObject = {};
var redObject = {};
var gameOver = false;

blueObject.x = 0;
blueObject.y = 200;
blueObject.dx = 2;
blueObject.width = 48;
blueObject.height = 48;
blueObject.image = new Image();
blueObject.image.src = "img/plus.png";

redObject.x = 88;
redObject.y = 200;
redObject.dx = -2;
redObject.width = 48;
redObject.height = 48;
redObject.image = new Image();
redObject.image.src = "img/cross.png";


function eventWindowLoaded() {

    tileSheet.src = 'img/tank_sheet.png';
    tileSheet.onload = eventAssetsLoaded;

    photo.src = "img/butterfly.jpg";
    photo.onload = eventAssetsLoaded;
}

function eventAssetsLoaded() {

    loadedImgCnt += 1;
    if (loadedImgCnt >= expectedImgCnt) {
        canvasApp();
    }
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

        var theCanvas2 = document.getElementById("canvas2");
        var context2 = theCanvas2.getContext("2d");
        context2.scale(2, 2);
    }

    var w = theCanvas.width / 2;
    var h = theCanvas.height / 2;

    context.drawImage(blueObject.image, 0, 0);
    blueObject.blueImageData = context.getImageData(0, 0, blueObject.width, blueObject.height);
    context.clearRect(0, 0, w, h);

    context.drawImage(redObject.image, 0, 0);
    redObject.redImageData = context.getImageData(0, 0, redObject.width, redObject.height);
    context.clearRect(0, 0, w, h);

    var counter = 0;
    var animationFrames = [1, 2, 3, 4, 5, 6, 7, 8];
    var frameIndex = 0;
    var mapIndexOffset = -1;

    var x = 50;
    var y = 50;
    var dx = 1;
    var dy = 0;

    var mapRows = 10;
    var mapCols = 10;

    var tileMap = [
        [32, 31, 31, 31, 1, 31, 31, 31, 31, 32],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [32, 1, 26, 1, 26, 1, 26, 1, 1, 32],
        [32, 26, 1, 1, 26, 1, 1, 26, 1, 32],
        [32, 1, 1, 1, 26, 26, 1, 26, 1, 32],
        [32, 1, 1, 26, 1, 1, 1, 26, 1, 32],
        [32, 1, 1, 1, 1, 1, 1, 26, 1, 32],
        [1, 1, 26, 1, 26, 1, 26, 1, 1, 1],
        [32, 1, 1, 1, 1, 1, 1, 1, 1, 32],
        [32, 31, 31, 31, 1, 31, 31, 31, 31, 32]
    ];

    var windowWidth = 1000;
    var windowHeight = 1000;
    var viewPortWidth = 500;
    var viewPortHeight = 500;

    var windowX = 1580;
    var windowY = 590;

    var scaledTileWidth = 32 * 2;

    drawScreen();

    function drawScreen() {

        context.clearRect(0, 0, w, h);
        context.fillStyle = "rgb(240, 240, 240)";
        context.fillRect(0, 0, w, h);

        context2.clearRect(0, 0, w, h);
        context2.fillStyle = "rgb(220, 220, 220)";
        context2.fillRect(0, 0, w, h);

        counter++;
        if (counter > 1) {
            counter = 0;
        }

        frameIndex++;
        if (frameIndex == animationFrames.length) {
            frameIndex = 0;
        }
        var sourceX = Math.floor(animationFrames[frameIndex] % 8) * scaledTileWidth;
        var sourceY = Math.floor(animationFrames[frameIndex] / 8) * scaledTileWidth;

        y += dy;
        x += dx;

        a();
    }

    function drawImageVariations() {
        context.fillStyle = '#aaaaaa';
        context.fillRect(0, 0, 200, 200);

        context.fillStyle = '#000000';
        context.font = '20px sans-serif';
        context.textBaseline = 'top';
        context.fillText("Canvas!", 0, 0);

        context.drawImage(tileSheet, 0, 0);
        context.drawImage(tileSheet, 0, 34, 32, 32);
        context.drawImage(tileSheet, 0, 68, 64, 64);
        context.drawImage(tileSheet, 0, 140, 16, 16);
        context.drawImage(tileSheet, 0, 4, 8, 8, 50, 50, 64, 64);
    }

    // movingTank
    function movingTank() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);

        context.translate(x + 32, y + 32);
        var rotation = 90;
        var angleInRadians = rotation * Math.PI / 180;
        context.rotate(angleInRadians);

        context.drawImage(tileSheet, sourceX, sourceY, scaledTileWidth, scaledTileWidth, -32, -32, 32, 32);

        context.restore();
    }

    // togglingImage
    function togglingImage() {
        context.drawImage(tileSheet, 32 * counter, 0, 32, 32, 50, 50, 64, 64);
    }

    // tiling
    function tiling() {
        for (var rowCtr = 0; rowCtr < mapRows; rowCtr++) {
            for (var colCtr = 0; colCtr < mapCols; colCtr++) {

                var tileId = tileMap[rowCtr][colCtr] + mapIndexOffset;
                var sourceX = Math.floor(tileId % 8) * scaledTileWidth;
                var sourceY = Math.floor(tileId / 8) * scaledTileWidth;

                context.drawImage(tileSheet, sourceX,
                    sourceY, scaledTileWidth, scaledTileWidth, colCtr * 32, rowCtr * 32, 32, 32);
            }
        }
    }

    // viewPort
    function viewPort() {
        context.drawImage(photo, windowX, windowY, windowWidth, windowHeight, 0, 0, viewPortWidth, viewPortHeight);
    }

    function placeShip(obj, posX, posY, width, height) {
        if (width && height) {
            context.drawImage(obj, posX, posY, width, height);
        } else {
            context.drawImage(obj, posX, posY);
        }
    }

    var mouseX;
    var mouseY;
    var imageData = context.createImageData(scaledTileWidth, scaledTileWidth);

    theCanvas.addEventListener("mousemove", onMouseMove, false);
    theCanvas.addEventListener("click", onMouseClick, false);

    function onMouseMove(e) {
        mouseX = e.clientX - theCanvas.offsetLeft;
        mouseY = e.clientY - theCanvas.offsetTop;
    }

    function onMouseClick(e) {

        var col = Math.floor(mouseX / 32);
        var row = Math.floor(mouseY / 32);
        if (col >= 8) {
            return;
        }

        if (mouseY < 128) {
            //find tile to highlight

            var tileId = (row * 7) + (col + row);
            highlightTile(tileId, col * scaledTileWidth, row * scaledTileWidth)
        } else {
            context.putImageData(imageData, col * scaledTileWidth, row * scaledTileWidth);
        }
    }

    function highlightTile(tileId, x, y) {
        context.fillStyle = "#aaaaaa";
        context.fillRect(0, 0, 256, 128);
        drawTileSheet();

        imageData = context.getImageData(x, y, scaledTileWidth, scaledTileWidth);
        for (j = 3; j < imageData.data.length; j += 4) {
            imageData.data[j] = 128;
        }

        var startX = Math.floor(tileId % 8) * 32;
        var startY = Math.floor(tileId / 8) * 32;
        context.strokeStyle = "red";
        context.strokeRect(startX + 0.5, startY + 0.5, 31, 31)
    }

    function drawTileSheet() {
        context.drawImage(tileSheet, 0, 0, 256, 128);
        context2.drawImage(theCanvas, scaledTileWidth, 0, scaledTileWidth, scaledTileWidth, 0, 0, 32, 32);
    }

    // tileApplicator
    function tileApplicator() {
        drawTileSheet();
    }

    // collision
    function a() {
        blueObject.x += blueObject.dx;
        redObject.x += redObject.dx;

        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        context.drawImage(blueObject.image, blueObject.x, blueObject.y);
        context.drawImage(redObject.image, redObject.x, redObject.y);

        //console.log("redObject.redImageData.data[3]=" + redObject.redImageData.data[3]);

        if (boundingBoxCollide(blueObject, redObject)) {

            var xMin = Math.max(blueObject.x, redObject.x);
            var yMin = Math.max(blueObject.y, redObject.y);
            var xMax = Math.min(blueObject.x + blueObject.width, redObject.x + redObject.width);
            var yMax = Math.min(blueObject.y + blueObject.height, redObject.y + redObject.height);

            for (var pixelX = xMin; pixelX < xMax; pixelX++) {
                for (var pixelY = yMin; pixelY < yMax; pixelY++) {
                    var bluepixel = ((pixelX - blueObject.x) + (pixelY - blueObject.y) * blueObject.width) * 4 + 3;
                    var redpixel = ((pixelX - redObject.x) + (pixelY - redObject.y) * redObject.width) * 4 + 3;
                    if ((blueObject.blueImageData.data[bluepixel] !== 0) &&
                        (redObject.redImageData.data[redpixel] !== 0)) {
                        console.log("pixel collision")
                        blueObject.dx = 0;
                        redObject.dx = 0;
                        gameOver = true;
                        break;
                    }
                }
            }
        }
    }

    function boundingBoxCollide(object1, object2) {
        var left1 = object1.x;
        var left2 = object2.x;
        var right1 = object1.x + object1.width;
        var right2 = object2.x + object2.width;
        var top1 = object1.y;
        var top2 = object2.y;
        var bottom1 = object1.y + object1.height;
        var bottom2 = object2.y + object2.height;

        if (bottom1 < top2) return false;
        if (top1 > bottom2) return false;

        if (right1 < left2) return false;
        if (left1 > right2) return false;

        return true;
    };

    function gameLoop() {
        if (!gameOver) {
            window.setTimeout(gameLoop, 100);
            drawScreen();
        }
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

// drawImage(Image, (dest position) dx, dy, (scale) dw, dh)
//drawImage(Image, (source position) sx, sy, sw, sh, (dest position) dx, dy, (scale) dw, dh)

// sets aside a portion of memory to store an individual pixel’s worth of data
// imagedata = context.createImageData(sw, sh)
// imagedata = context.createImageData(imagedata)
// imagedata = context.createImageData()
//
// imagedata = context.getImageData(sx, sy, sw, sh)
//
// context.putImageData (imagedata, dx, dy)
// context.putImageData (imagedata, dx, dy [, dirtyX, dirtyY,
//                        dirtyWidth, dirtyHeight ])
