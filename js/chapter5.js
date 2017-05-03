window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {

    eventAssetsLoaded();
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
    } else {
        var theCanvas = document.getElementById("canvas");
        var context = theCanvas.getContext("2d");
        context.scale(2, 2);
    }

    var speed = 50;
    var y = 10;
    var x = 250;
    var r = 15;

    var p1 = {
        x: 20,
        y: 250
    };
    var p2 = {
        x: 480,
        y: 50
    };
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var moves = distance / speed;

    // increment units
    // var xunits = (p2.x - p1.x) / moves;
    // var yunits = (p2.y - p1.y) / moves;

    var angle = -35;
    var radians = angle * Math.PI / 180;
    // increment units (rad)
    var xunits = Math.cos(radians) * speed;
    var yunits = Math.sin(radians) * speed;

    var points = new Array();

    var pointImage = new Image();
    pointImage.src = "img/point.png";

    var ball = {
        x: p1.x,
        y: p1.y
    };

    var gameOver = false;

    // varying size balls
    // var numBalls = 300;
    // var maxSize = 8;
    // var minSize = 5;
    // var maxSpeed = maxSize + 5;
    // var balls = new Array();
    //
    // var tempBall;
    // var tempX;
    // var tempY;
    // var tempSpeed;
    // var tempAngle;
    // var tempRadius;
    // var tempRadians;
    // var tempXunits;
    // var tempYunits;
    //
    // for (var i = 0; i < numBalls; i++) {
    //     tempRadius = Math.floor(Math.random() * maxSize) + minSize;
    //     tempX = tempRadius * 2 + (Math.floor(Math.random() * theCanvas.width / 2) - tempRadius * 2);
    //     tempY = tempRadius * 2 + (Math.floor(Math.random() * theCanvas.height / 2) - tempRadius * 2);
    //     tempSpeed = maxSpeed - tempRadius;
    //     tempAngle = Math.floor(Math.random() * 360);
    //     tempRadians = tempAngle * Math.PI / 180;
    //     tempXunits = Math.cos(tempRadians) * tempSpeed;
    //     tempYunits = Math.sin(tempRadians) * tempSpeed;
    //
    //     tempBall = {
    //         x: tempX,
    //         y: tempY,
    //         radius: tempRadius,
    //         speed: tempSpeed,
    //         angle: tempAngle,
    //         xunits: tempXunits,
    //         yunits: tempYunits
    //     }
    //     balls.push(tempBall);
    // }

    var numBalls = 200;
    var maxSize = 15;
    var minSize = 5;
    var maxSpeed = maxSize + 5;
    var balls = new Array();
    var tempBall;
    var tempX;
    var tempY;
    var tempSpeed;
    var tempAngle;
    var tempRadius;
    var tempRadians;
    var tempvelocityx;
    var tempvelocityy;

    for (var i = 0; i < numBalls; i++) {
        tempRadius = 5;
        var placeOK = false;
        while (!placeOK) {
            tempX = tempRadius * 3 + (Math.floor(Math.random() * theCanvas.width / 2) - tempRadius * 3);
            tempY = tempRadius * 3 + (Math.floor(Math.random() * theCanvas.height / 2) - tempRadius * 3);
            tempSpeed = 1;
            tempAngle = Math.floor(Math.random() * 360);
            tempRadians = tempAngle * Math.PI / 180;
            tempvelocityx = Math.cos(tempRadians) * tempSpeed;
            tempvelocityy = Math.sin(tempRadians) * tempSpeed;

            tempBall = {
                x: tempX,
                y: tempY,
                nextX: tempX,
                nextY: tempY,
                radius: tempRadius,
                speed: tempSpeed,
                angle: tempAngle,
                velocityx: tempvelocityx,
                velocityy: tempvelocityy,
                mass: tempRadius
            };
            placeOK = canStartHere(tempBall);
        }
        balls.push(tempBall);
    }

    function canStartHere(ball) {
        var retval = true;
        for (var i = 0; i < balls.length; i++) {
            if (hitTestCircle(ball, balls[i])) {
                retval = false;
            }
        }
        return retval;
    }

    formElement = document.getElementById("canvasWidth")
    formElement.addEventListener('change', canvasWidthChanged, false);

    formElement = document.getElementById("canvasHeight")
    formElement.addEventListener('change', canvasHeightChanged, false);

    function drawScreen() {

        var w = theCanvas.width / 2;
        var h = theCanvas.height / 2;

        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, w, h);

        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, w - 2, h - 2);

        a();

        // bounceUpDown
        function bounceUpDown() {
            if (y + r >= h && speed > 0) {
                speed = -speed;
            }
            if (y - r <= 0 && speed < 0) {
                speed = -speed;
            }

            y += speed;

            context.fillStyle = "#000000";
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }

        // movingBetweenTwoPoints
        function movingBetweenTwoPoints() {

            // two points, limited
            // if (moves > 0) {
            //     moves--;
            //     ball.x += xunits;
            //     ball.y += yunits;
            // }

            ball.x += xunits;
            ball.y += yunits;


            context.fillStyle = "#000000";
            context.beginPath();
            context.arc(ball.x, ball.y, r, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            if (ball.x > w || ball.x < 0) {
                angle = 180 - angle;
                updateBall();
            } else if (ball.y > h || ball.y < 0) {
                angle = 360 - angle;
                updateBall();
            }
        }

        // movingMultipleBalls
        function movingMultipleBalls() {
            context.fillStyle = "#fafafa";
            var ball;

            for (var i = 0; i < balls.length; i++) {
                ball = balls[i];
                ball.x += ball.xunits;
                ball.y += ball.yunits;

                context.beginPath();
                context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();

                if (ball.x > w || ball.x < 0) {
                    ball.angle = 180 - ball.angle;
                    updateBall(ball);
                } else if (ball.y > h || ball.y < 0) {
                    ball.angle = 360 - ball.angle;
                    updateBall(ball);
                }
            }
        }

        // movingMultipleBallsWithCollision
        function a() {
            update();
            testWalls();
            collide();
            render();
        }

        function drawPoints() {
            points.push({
                x: ball.x,
                y: ball.y
            });

            for (var i = 0; i < points.length; i++) {
                context.drawImage(pointImage, points[i].x, points[i].y, 1, 1);
            }
        }

        function updateBall() {
            radians = angle * Math.PI / 180;
            xunits = Math.cos(radians) * speed;
            yunits = Math.sin(radians) * speed;
        }

        function updateBall(ball) {
            ball.radians = ball.angle * Math.PI / 180;
            ball.xunits = Math.cos(ball.radians) * ball.speed;
            ball.yunits = Math.sin(ball.radians) * ball.speed;
        }
    }

    function update() {
        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];
            ball.nextx = (ball.x += ball.velocityx);
            ball.nexty = (ball.y += ball.velocityy);
        }
    }

    function testWalls() {
        var ball;
        var testBall;

        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];

            if (ball.nextx + ball.radius > theCanvas.width / 2) {
                ball.velocityx = ball.velocityx * -1;
                ball.nextx = theCanvas.width / 2 - ball.radius;

            } else if (ball.nextx - ball.radius < 0) {
                ball.velocityx = ball.velocityx * -1;
                ball.nextx = ball.radius;

            } else if (ball.nexty + ball.radius > theCanvas.height / 2) {
                ball.velocityy = ball.velocityy * -1;
                ball.nexty = theCanvas.height / 2 - ball.radius;

            } else if (ball.nexty - ball.radius < 0) {
                ball.velocityy = ball.velocityy * -1;
                ball.nexty = ball.radius;
            }
        }
    }

    function collide() {
        var ball;
        var testBall;
        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];
            for (var j = i + 1; j < balls.length; j++) {
                testBall = balls[j];
                if (hitTestCircle(ball, testBall)) {
                    collideBalls(ball, testBall);
                }
            }
        }
    }

    function hitTestCircle(ball1, ball2) {
        var retval = false;
        var dx = ball1.nextx - ball2.nextx;
        var dy = ball1.nexty - ball2.nexty;
        var distance = (dx * dx + dy * dy);
        if (distance <= (ball1.radius + ball2.radius) *
            (ball1.radius + ball2.radius)) {
            retval = true;
        }
        return retval;
    }

    function collideBalls(ball1, ball2) {

        var dx = ball1.nextx - ball2.nextx;
        var dy = ball1.nexty - ball2.nexty;

        var collisionAngle = Math.atan2(dy, dx);

        var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx +
            ball1.velocityy * ball1.velocityy);
        var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx +
            ball2.velocityy * ball2.velocityy);

        var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
        var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);

        var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
        var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
        var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
        var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);

        var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 +
            (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
        var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 +
            (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);

        var final_velocityy_1 = velocityy_1;
        var final_velocityy_2 = velocityy_2;

        ball1.velocityx = Math.cos(collisionAngle) * final_velocityx_1 +
            Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_1;
        ball1.velocityy = Math.sin(collisionAngle) * final_velocityx_1 +
            Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_1;
        ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 +
            Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_2;
        ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 +
            Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_2;

        ball1.nextx = (ball1.nextx += ball1.velocityx);
        ball1.nexty = (ball1.nexty += ball1.velocityy);
        ball2.nextx = (ball2.nextx += ball2.velocityx);
        ball2.nexty = (ball2.nexty += ball2.velocityy);
    }

    function render() {
        var ball;
        context.fillStyle = "#fafafa";
        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];
            ball.x = ball.nextx;
            ball.y = ball.nexty;

            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }
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

    function gameLoop() {
        if (!gameOver) {
            window.setTimeout(gameLoop, 30);
            drawScreen();
        }
    }

    gameLoop();
}
