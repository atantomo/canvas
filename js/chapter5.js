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

    var bullseye = new Image();
    bullseye.src = "img/cross.png";

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

    var numBalls = 100;
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
    var friction = 0; //.01;

    for (var i = 0; i < numBalls; i++) {
        tempRadius = 5; // Math.floor(Math.random() * maxSize) + minSize;
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

    var radiusInc = 2;
    var circle = {
        centerX: 250,
        centerY: 250,
        radius: 50,
        angle: 0
    }
    var circleBall = {
        x: 0,
        y: 0,
        speed: .01,
        t: 0
    };

    ball.y += ball.velocityy;
    ball.x += ball.velocityx;

    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    // zigzag
    // var p0 = {
    //     x: 250,
    //     y: 10
    // };
    // var p1 = {
    //     x: 450,
    //     y: 200
    // };
    // var p2 = {
    //     x: 100,
    //     y: 295
    // };
    // var p3 = {
    //     x: 350,
    //     y: 350
    // };

    // loop
    var p0 = {
        x: 150,
        y: 440
    };
    var p1 = {
        x: 450,
        y: 10
    };
    var p2 = {
        x: 50,
        y: 10
    };
    var p3 = {
        x: 325,
        y: 450
    };

    function Gravity() {
        this.speed = 4;
        this.gravity = .1;
        this.elasticity = .5;
        this.angle = 295;
        this.friction = .008;

        this.radians = this.angle * Math.PI / 180;
        this.radius = 15;
        this.vx = Math.cos(this.radians) * this.speed;
        this.vy = Math.sin(this.radians) * this.speed;

        this.p1 = {
            x: 20,
            y: theCanvas.height / 2 - this.radius
        };
        this.ball = {
            x: this.p1.x,
            y: this.p1.y,
            velocityx: this.vx,
            velocityy: this.vy,
            radius: this.radius,
            elasticity: this.elasticity
        };
    }

    function Easing() {
        this.easeValue = .05;
        this.tempSpeed = .5;
        this.tempAngle = 270;
        this.tempRadians = this.tempAngle * Math.PI / 180;

        this.tempvelocityx = Math.cos(this.tempRadians) * this.tempSpeed;
        this.tempvelocityy = Math.sin(this.tempRadians) * this.tempSpeed;

        this.p1 = {
            x: 240,
            y: -20
        };
        this.p2 = {
            x: 240,
            y: 470
        };
        this.ship = {
            x: this.p1.x,
            y: this.p1.y,
            endx: this.p2.x,
            endy: this.p2.y,
            velocityx: 0,
            velocityy: 0
        };
        this.easeInShip = {
            x: this.p2.x,
            y: this.p2.y,
            velocityx: this.tempvelocityx,
            velocityy: this.tempvelocityy,
        };
    }

    var g = new Gravity();
    var e = new Easing();

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
        function movingMultipleBallsWithCollision() {
            update();
            testWalls();
            collide();
            render();
        }

        // circularMotion
        function circularMotion() {
            ball = circleBall;
            // circle.radius += radiusInc;
            ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
            ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;

            circle.angle += ball.speed;

            context.fillStyle = "#E872B0";
            context.beginPath();
            context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }

        // bezierMotion
        function bezierMotion() {
            ball = circleBall;
            var t = ball.t;

            var cx = 3 * (p1.x - p0.x)
            var bx = 3 * (p2.x - p1.x) - cx;
            var ax = p3.x - p0.x - cx - bx;

            var cy = 3 * (p1.y - p0.y);
            var by = 3 * (p2.y - p1.y) - cy;
            var ay = p3.y - p0.y - cy - by;

            var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
            var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

            ball.t += ball.speed;

            if (ball.t > 1) {
                ball.t = 1;
            }

            pinkBall();
            crossImage();

            function pinkBall() {
                context.fillStyle = "#E872B0";
                context.beginPath();
                context.arc(xt, yt, 15, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
            }

            function crossImage() {
                context.fillStyle = "#E872B0";
                context.beginPath();
                context.drawImage(bullseye, xt - bullseye.width / 2, yt - bullseye.height / 2);
                context.closePath();
                context.fill();
            }
        }

        // gravitySimulator
        function gravitySimulator() {
            ball = g.ball;

            ball.velocityx -= (ball.velocityx * g.friction);
            ball.velocityy += g.gravity;
            if ((ball.y + ball.radius) > h) {
                ball.velocityy = -(ball.velocityy) * ball.elasticity;
            }
            ball.y += ball.velocityy;
            ball.x += ball.velocityx;

            context.fillStyle = "#E872B0";
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }

        // easingSimulator
        function a() {
            ship = e.ship;

            var dx = ship.endx - ship.x;
            var dy = ship.endy - ship.y;

            ship.velocityx = dx * e.easeValue;
            ship.velocityy = dy * e.easeValue;

            ship.x += ship.velocityx;
            ship.y += ship.velocityy;

            context.fillStyle = "#E872B0";
            context.beginPath();
            context.arc(ship.x, ship.y, 15, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            ship = e.easeInShip;

            ship.velocityx = ship.velocityx + (ship.velocityx * e.easeValue);
            ship.velocityy = ship.velocityy + (ship.velocityy * e.easeValue);

            ship.x += ship.velocityx;
            ship.y += ship.velocityy;

            context.fillStyle = "#11B764";
            context.beginPath();
            context.arc(ship.x, ship.y, 15, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }

        function drawBezierAnnotation() {
            context.font = "10px sans";
            context.fillStyle = "#FF0000";
            context.beginPath();
            context.arc(p0.x, p0.y, 8, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            context.fillStyle = "#FFFFFF";
            context.fillText("0", p0.x - 2, p0.y + 2);

            context.fillStyle = "#FF0000";
            context.beginPath();
            context.arc(p1.x, p1.y, 8, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            context.fillStyle = "#FFFFFF";
            context.fillText("1", p1.x - 2, p1.y + 2);

            context.fillStyle = "#FF0000";
            context.beginPath();
            context.arc(p2.x, p2.y, 8, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            context.fillStyle = "#FFFFFF";
            context.fillText("2", p2.x - 2, p2.y + 2);

            context.fillStyle = "#FF0000";
            context.beginPath();
            context.arc(p3.x, p3.y, 8, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            context.fillStyle = "#FFFFFF";
            context.fillText("3", p3.x - 2, p3.y + 2);
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
            //Friction
            ball.velocityx = ball.velocityx - (ball.velocityx * friction);
            ball.velocityy = ball.velocityy - (ball.velocityy * friction);

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
