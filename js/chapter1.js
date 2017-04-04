window.onload = eventWindowLoaded;

var Debugger = function() {};
Debugger.log = function(message) {
    try {
        console.log(message);
    } catch (exception) {
        return;
    }
}

function eventWindowLoaded() {
    a();
}

function canvasSupport() {
    return Modernizr.canvas;
}

// beginning
function beginning() {
    if (!canvasSupport()) {
        return;
    }
    console.log(Modernizr.canvas);

    var theCanvas = document.getElementById("canvas");
    var context = theCanvas.getContext("2d");

    function drawScreen() {

        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 500, 300);

        context.fillStyle = "#000000";
        context.font = "20px Sans-Serif";
        context.textBaseline = "top";
        context.fillText("Hello World!", 95, 80);

        var helloWorldImage = new Image();
        helloWorldImage.onload = function() {
            context.drawImage(helloWorldImage, 160, 130);
        }
        helloWorldImage.src = "img/melon_cut.jpg";

        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290);

        // Export image
        // toDataURL();
    }

    drawScreen();
}

// guessWord
function guessWord() {
    var guesses = 0;
    var message = "Guess The Letter From a (lower) to z (higher)";
    var letters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];
    var today = new Date();
    var letterToGuess = "";
    var higherOrLower = "";
    var lettersGuessed;
    var gameOver = false;

    var theCanvas = document.getElementById("canvas");
    var context = theCanvas.getContext("2d");
    context.scale(2, 2);

    function initGame() {
        var formElement = document.getElementById("createImageData");
        formElement.addEventListener('click', createImageDataPressed, false);

        var letterIndex = Math.floor(Math.random() * letters.length);
        letterToGuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed = [];
        gameOver = false;
        window.addEventListener("keydown", eventKeyPressed, true);
        drawScreen();
    }

    function eventKeyPressed(e) {
        if (!gameOver) {
            var letterPressed = String.fromCharCode(e.keyCode);
            letterPressed = letterPressed.toLowerCase();
            guesses++;
            lettersGuessed.push(letterPressed);

            if (letterPressed == letterToGuess) {
                gameOver = true;
            } else {

                letterIndex = letters.indexOf(letterToGuess);
                guessIndex = letters.indexOf(letterPressed);
                if (guessIndex < 0) {
                    higherOrLower = "That is not a letter";
                } else if (guessIndex > letterIndex) {
                    higherOrLower = "Before that";
                } else {
                    higherOrLower = "After that";
                }
            }
            drawScreen();
        }
    }

    function createImageDataPressed(e) {

        window.open(theCanvas.toDataURL(), "canvasImage", "left=100,top=100,width=" +
            theCanvas.width + ",height=" + theCanvas.height + ",toolbar=0,resizable=0");
    }

    function drawScreen() {
        //Background
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 500, 300);
        //Box
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290);

        context.textBaseline = "top";
        //Date
        context.fillStyle = "#000000";
        context.font = "10px Sans-Serif";
        context.fillText(today, 150, 10);
        //Message
        context.fillStyle = "#FF0000";
        context.font = "14px Sans-Serif";
        context.fillText(message, 125, 30); //Guesses
        context.fillStyle = "#109910";
        context.font = "16px Sans-Serif";
        context.fillText('Guesses: ' + guesses, 215, 50);
        //Higher Or Lower
        context.fillStyle = "#000000";
        context.font = "16px Sans-Serif";
        context.fillText("Higher Or Lower: " + higherOrLower, 150, 125);
        //Letters Guessed
        context.fillStyle = "#FF0000";
        context.font = "16px Sans-Serif";
        context.fillText("Letters Guessed: " + lettersGuessed.toString(),
            10, 260);
        if (gameOver) {
            context.fillStyle = "#FF0000";
            context.font = "40px Sans-Serif";
            context.fillText("You Got It!", 150, 180);
        }
    }

    initGame();
}

function a() {

    if (!canvasSupport()) {
        return;
    }

    var theCanvas = document.getElementById("canvas");
    var context = theCanvas.getContext("2d");
    context.scale(2, 2);

    function drawScreen() {
        //background
        context.globalAlpha = 1;
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 640, 480);
        //image
        context.globalAlpha = .25;
        context.drawImage(helloWorldImage, 0, 0);

        if (fadeIn) {
            alpha += .01;
            if (alpha >= 1) {
                alpha = 1;
                fadeIn = false;
            }
        } else {
            alpha -= .01;
            if (alpha < 0) {
                alpha = 0;
                fadeIn = true;
            }
        }

        context.font = "72px Sans-Serif";
        context.textBaseline = "top";

        context.globalAlpha = alpha;

        context.fillStyle = "#FFFFFF";
        context.fillText(text, 150, 200);
    }

    var text = "Hello World";
    var alpha = 0;
    var fadeIn = true;
    var helloWorldImage = new Image();
    helloWorldImage.src = "img/melon_cut.jpg";

    function gameLoop() {
        window.setTimeout(gameLoop, 20);
        drawScreen()
    }

    // Make everything drawn afterwards 50% transparent
    // context.globalAlpha = .5;
    gameLoop();
}
