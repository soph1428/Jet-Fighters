const canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var newgame = document.getElementById("newgame");
var keysText = document.getElementById("keysText");
var moveUpButton = document.createElement("button");
var moveRightButton = document.createElement("button");
var moveLeftButton = document.createElement("button");
var moveDownButton = document.createElement("button");
var sound = document.createElement("audio");
sound.src = "mixkit-body-punch-quick-hit-2153.wav";
var bullets1 = [];
var bullets2 = [];
let pickAColorFont = "80px arial";
let nicknameTextFont = "0px arial";
let nicknameFont = "0px arial";
let plane1FillStyle = "transparent";
let name1 = "";
let gameCodeFont = "0px arial";
let nicknameinput = window.document.createElement("input");
nicknameinput.id = "nicknameinput";
let roominput = window.document.createElement("input");
let createARoomTextFont = "0px arial";
let gameState1Player = true;
let scoreCounter1 = 0;
let scoreCounter2 = 0;
let score1FillStyle = "black";
let score2FillStyle = "black";
let scoreFont = "30px arial";
let upPressed1 = false;
let upPressed2 = false;
let downPressed1 = false;
let downPressed2 = false;
let rightPressed1 = false;
let rightPressed2 = false;
let leftPressed1 = false;
let leftPressed2 = false;
var colors = document.getElementById("colors");
var red = document.getElementById("red");
var orange = document.getElementById("orange");
var gold = document.getElementById("gold");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var purple = document.getElementById("purple");
var pink = document.getElementById("pink");
var black = document.getElementById("black");
var grey = document.getElementById("grey");
layoutForSizes()
window.addEventListener("resize", layoutForSizes)
function layoutForSizes() {
newgame.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + canvas.width + 20}px`;
newgame.style.top = `${canvas.getBoundingClientRect().top + window.scrollY + canvas.height - 150}px`;
keysText.style.marginTop = `${canvas.getBoundingClientRect().top + window.scrollY + canvas.height - 80}px`;
red.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 100}px`;
red.style.top = "240px";
orange.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 185}px`;
orange.style.top = "240px";
gold.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 270}px`;
gold.style.top = "240px";
green.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 355}px`;
green.style.top = "240px";
blue.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 100}px`;
blue.style.top = "320px";
purple.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 185}px`;
purple.style.top = "320px";
pink.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 270}px`;
pink.style.top = "320px";
black.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 355}px`;
black.style.top = "320px";
grey.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 227.5}px`;
grey.style.top = "400px";
}
//plane1
this.plane1 = new Image();
this.plane1.src = "plane.png";
this.x1 = 20;
this.y1 = 210;
this.width1 = 55;
this.height1 = 55;
this.name1X = this.x1 - 3;
this.name1Y = this.y1 + 3;
var drawintro = setInterval(function() {
    drawIntro();
}, 0);
if (localStorage.getItem("name") != null) {
    var color = document.getElementById(localStorage.getItem("color"));
    var nickname = localStorage.getItem("name");
    var code = localStorage.getItem("code");
    setTimeout(function() {
    color.click();
    }, 250);
    color.onclick = new Function(`${color.id}Click()`);
    nicknameinput.value = nickname;
    roominput.value = code;
    setTimeout(function() {
    nicknameinput.dispatchEvent(new KeyboardEvent("keydown", {
        "keyCode": "13"
    }));
    }, 250);
    nicknameinput.onkeydown = enterKeyPressNickname;
    setTimeout(function() {
    roominput.dispatchEvent(new KeyboardEvent("keydown", {
        "key": "Enter"
    }));
    }, 250);
    setTimeout(function() {
    localStorage.clear();
    }, 250);
}
function drawIntro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //pickAColor
    ctx.fillStyle = "black";
    ctx.font = pickAColorFont;
    ctx.fillText("Pick a Color", 35, 200);
    //enterANicknameText
    ctx.fillStyle = "black";
    ctx.font = nicknameTextFont;
    ctx.fillText("Enter a Nickname", 0, 200);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //gameCode
    ctx.fillStyle = "black";
    ctx.font = gameCodeFont = "30px arial";
    ctx.fillText("Code: " + roominput.value, 125, 25);
    window.document.removeEventListener("keydown", enterKeyPressNickname);
    //Plane1
    ctx.drawImage(plane1, x1, y1, width1, height1);
    ctx.fillStyle = plane1FillStyle;
    ctx.font = nicknameFont;
    ctx.fillText(name1, name1X, name1Y);
}
function enterKeyPressNickname(event) {
    if (event.keyCode == 13) {
        if (nicknameinput.value == "") {
            return;
        }
        if (nicknameinput.value.endsWith(" ", nicknameinput.value.length)) {
            return;
        }
        name1 = nicknameinput.value;
        nicknameTextFont = "0px arial";
        colors.removeChild(nicknameinput);
        clearInterval(drawintro);
        createARoomTextFont = "49.5px arial";
        var createARoomTextInterval = setInterval(function() {
            createARoomText();
        }, 0);
        roominput.style.position = "absolute";
        roominput.id = "roominput";
        roominput.style.left = `${canvas.getBoundingClientRect().left + 65}px`;
        roominput.style.top = "300px";
        roominput.style.borderWidth = "10px";
        roominput.style.fontSize = "30px";
        colors.appendChild(roominput);
        roominput.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                if (roominput.value == "") {
                    return;
                }
                if (roominput.value.endsWith(" ", roominput.value.length)) {
                    return;
                }
                colors.removeChild(roominput);
                nicknameFont = "20px arial";
                clearInterval(createARoomTextInterval);
                // Heroku: https://games-jetfighters.herokuapp.com
                // Server: http://127.0.0.1:5500
                var socket = io.connect("https://games-jetfighters.herokuapp.com");
                socket.on("full room", (gamecode) => {
                    alert("Game " + gamecode + " is full.");
                    document.location.reload();
                });
                socket.on("name used", (name) => {
                    alert("Name " + name + " is used");
                    document.location.reload();
                });
        socket.emit("new game", {
            code: roominput.value,
            name: name1,
            plane: plane1,
            planeSrc: plane1.src,
            fillstyle: plane1FillStyle,
            x: x1,
            y: y1,
            width: width1,
            nameX: name1X,
            nameY: name1Y
        });
        newgame.style.display = "unset";
        var drawgame = setInterval(function() {
            if (!gameState1Player) {
                return;
            }
            if (gameState1Player) {
                drawGame();
            }
        }, 0);
        socket.emit("join game", roominput.value);
        socket.on("joined game", (newUser) => {
            gameState1Player = false;
            createARoomTextFont = "0px arial";
            keysText.style.visibility = "visible";
            moveUpButton.style.color = plane1FillStyle;
            moveRightButton.style.color = plane1FillStyle;
            moveLeftButton.style.color = plane1FillStyle;
            moveDownButton.style.color = plane1FillStyle;
            moveUpButton.style.borderColor = "solid black";
            moveRightButton.style.borderColor = "solid black";
            moveLeftButton.style.borderColor = "solid black";
            moveDownButton.style.borderColor = "solid black";
            moveUpButton.style.display = "unset";
            moveRightButton.style.display = "unset";
            moveLeftButton.style.display = "unset";
            moveDownButton.style.display = "unset";
            socket.on("gameState", (planes) => {
                var plane = new Image();
                plane.src = Object.values(planes[roominput.value])[0].planeSrc;
                var plane1X = Object.values(planes[roominput.value])[0].x;
                var plane1Y = Object.values(planes[roominput.value])[0].y;
                var plane1Fillstyle = Object.values(planes[roominput.value])[0].color;
                var planeName1 = Object.values(planes[roominput.value])[0].name;
                var planeName1X = Object.values(planes[roominput.value])[0].nameX;
                var planeName1Y = Object.values(planes[roominput.value])[0].nameY;
                var plane2FillStyle = planes[roominput.value][Object.keys(planes[roominput.value]).find(key => key !== socket.id)].color;
                if (plane2FillStyle == plane1Fillstyle) {
                    plane2FillStyle = Object.values(planes[roominput.value])[1].color;
                }
                var plane2 = new Image();
                plane2.src = `plane${plane2FillStyle}flipped.png`;
                var x2 = Object.values(planes[roominput.value])[1].x = 425;
                var y2 = Object.values(planes[roominput.value])[1].y;
                var width2 = 55;
                var height2 = 55;
                var name2 = planes[roominput.value][Object.keys(planes[roominput.value]).find(key => key !== socket.id)].name;
                if (name2 == planeName1) {
                    name2 = Object.values(planes[roominput.value])[1].name;
                }
                if (planeName1X == 422) {
                    planeName1X = planes[roominput.value][socket.id].nameX = plane1X - 3;
                }
                var name2X = planes[roominput.value][socket.id].nameX = x2 - 3;
                var name2Y = planes[roominput.value][socket.id].nameY = y2 + 3;
                var speed = 2;
                var bullet1FillStyle = plane1Fillstyle;
                var bullet1X = plane1X + width1;
                var bullet1Y = plane1Y + height1 / 2;
                setInterval(function() {
                    bullet1X = plane1X + width1;
                    bullet1Y = plane1Y + height1 / 2;
                }, 0);
                var bullet1Radius = 5;
                var bullet2FillStyle = plane2FillStyle;
                var bullet2X = x2;
                var bullet2Y = y2 + height1 / 2;
                setInterval(function () {
                    bullet2X = x2;
                    bullet2Y = y2 + height1 / 2;
                }, 0);
                var bullet2Radius = 5;
                var bulletSpeed = 40;
                score1FillStyle = plane1Fillstyle;
                score2FillStyle = plane2FillStyle;
                document.addEventListener("keydown", (e) => {
                    if (e.key == "ArrowUp" || e.key == "w") { moveUp(); }});
                document.addEventListener("keyup", (e) => {
                    if (e.key == "ArrowUp" || e.key == "w") { stopUp(); }});
                function moveUp() {
                        if (name1 == planeName1) {
                            socket.emit("startMovingUp1");
                        }
                        if (name1 == name2) {
                            socket.emit("startMovingUp2");
                        }
                }
                function stopUp() {
                        if (name1 == planeName1) {
                            socket.emit("stopMovingUp1");
                        }
                        if (name1 == name2) {
                            socket.emit("stopMovingUp2");
                        }
                }
                document.addEventListener("keydown", (e) => {
                    if (e.key == "ArrowDown" || e.key == "s") { moveDown(); }});
                document.addEventListener("keyup", (e) => {
                    if (e.key == "ArrowDown" || e.key == "s") { stopDown(); }});
                function moveDown() {
                        if (name1 == planeName1) {
                            socket.emit("startMovingDown1");
                        }
                        if (name1 == name2) {
                            socket.emit("startMovingDown2");
                        }
                }
                function stopDown() {
                        if (name1 == planeName1) {
                            socket.emit("stopMovingDown1");
                        }
                        if (name1 == name2) {
                            socket.emit("stopMovingDown2");
                        }
                }
                document.addEventListener("keydown", (e) => {
                    if (e.key == "ArrowLeft" || e.key == "a") { moveRight(); }});
                document.addEventListener("keyup", (e) => {
                    if (e.key == "ArrowLeft" || e.key == "a") { stopRight(); }});
                function moveRight() {
                        if (name1 == planeName1) {
                            socket.emit("startMovingRight1");
                        }
                        if (name1 == name2) {
                            socket.emit("startMovingRight2");
                        }
                }
                function stopRight() {
                        if (name1 == planeName1) {
                            socket.emit("stopMovingRight1");
                        }
                        if (name1 == name2) {
                            socket.emit("stopMovingRight2");
                        }
                }
                document.addEventListener("keydown", (e) => {
                    if (e.key == "ArrowRight" || e.key == "d") { moveLeft(); }});
                document.addEventListener("keyup", (e) => {
                    if (e.key == "ArrowRight" || e.key == "d") { stopLeft(); }});
                function moveLeft() {
                        if (name1 == planeName1) {
                            socket.emit("startMovingLeft1");
                        }
                        if (name1 == name2) {
                            socket.emit("startMovingLeft2");
                        }
                }
                function stopLeft() {
                        if (name1 == planeName1) {
                            socket.emit("stopMovingLeft1");
                        }
                        if (name1 == name2) {
                            socket.emit("stopMovingLeft2");
                        }
                }
                moveUpButton.addEventListener("touchstart", moveUp);
                moveUpButton.addEventListener("touchend", stopUp);
                moveDownButton.addEventListener("touchstart", moveDown);
                moveDownButton.addEventListener("touchend", stopDown);
                moveRightButton.addEventListener("touchstart", moveRight);
                moveRightButton.addEventListener("touchend", stopRight);
                moveLeftButton.addEventListener("touchstart", moveLeft);
                moveLeftButton.addEventListener("touchend", stopLeft);
                moveUpButton.addEventListener("mousedown", moveUp);
                moveUpButton.addEventListener("mouseup", stopUp);
                moveDownButton.addEventListener("mousedown", moveDown);
                moveDownButton.addEventListener("mouseup", stopDown);
                moveRightButton.addEventListener("mousedown", moveRight);
                moveRightButton.addEventListener("mouseup", stopRight);
                moveLeftButton.addEventListener("mousedown", moveLeft);
                moveLeftButton.addEventListener("mouseup", stopLeft);
                var bulletCountMobile1 = 0;
                var bulletCountMobile2 = 0;
                    canvas.addEventListener("mouseup", shootBullet1);
                    canvas.addEventListener("touchend", shootBulletMobile1);
                    canvas.addEventListener("mouseup", shootBullet2);
                    canvas.addEventListener("touchend", shootBulletMobile2);
                function shootBullet1(mouse) {
                    if (name1 == planeName1) {
                    var mouseX = mouse.clientX - canvas.getBoundingClientRect().left - 7.5;
                    var mouseY = mouse.clientY - canvas.getBoundingClientRect().top - 7.5;
                        socket.emit("moveBullet1", {
                            mX: mouseX,
                            mY: mouseY
                        });
                    }
                }
                function shootBulletMobile1(mouse) {
                    if (setTimeout(() => {
                        if (bulletCountMobile1 > 1) {
                            return false;
                        }
                    }, 100)) { return; }
                    if (name1 == planeName1) {
                        bulletCountMobile1++;
                    var mouseX = mouse.changedTouches[0].clientX - canvas.getBoundingClientRect().left - 7.5;
                    var mouseY = mouse.changedTouches[0].clientY - canvas.getBoundingClientRect().top - 7.5;
                        socket.emit("moveBullet1", {
                            mX: mouseX,
                            mY: mouseY
                        });
                    }
                }
                function shootBullet2(mouse) {
                    if (name1 == name2) {
                    var mouseX = mouse.clientX - canvas.getBoundingClientRect().left - 7.5;
                    var mouseY = mouse.clientY - canvas.getBoundingClientRect().top - 7.5;
                    socket.emit("moveBullet2", {
                        mX: mouseX,
                        mY: mouseY
                    });
                    }
                }
                function shootBulletMobile2(mouse) {
                    if (setTimeout(() => {
                        if (bulletCountMobile2 > 1) {
                            return false;
                        }
                    }, 100)) { return; }
                    if (name1 == name2) {
                        bulletCountMobile2++;
                    var mouseX = mouse.changedTouches[0].clientX - canvas.getBoundingClientRect().left - 7.5;
                    var mouseY = mouse.changedTouches[0].clientY - canvas.getBoundingClientRect().top - 7.5;
                    socket.emit("moveBullet2", {
                        mX: mouseX,
                        mY: mouseY
                    });
                    }
                }
                    window.document.removeEventListener("keydown", enterKeyPressNickname);
                    plane2.addEventListener("load", gameState);
                    function gameState() {
                            var gameStateAnimation = requestAnimationFrame(gameState);
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.fillStyle = "black";
                            ctx.font = gameCodeFont = "30px arial";
                            ctx.fillText("Code: " + roominput.value, 125, 25);
                            ctx.drawImage(plane2, x2, y2, width2, height2);
                            ctx.font = nicknameFont;
                            ctx.fillStyle = plane2FillStyle;
                            ctx.fillText(name2, name2X, name2Y);
                            //score1
                            ctx.fillStyle = score1FillStyle;
                            ctx.font = scoreFont;
                            ctx.fillText(scoreCounter1, 50, 25);
                            //score2
                            ctx.fillStyle = score2FillStyle;
                            ctx.font = scoreFont;
                            ctx.fillText(scoreCounter2, 450, 25);
                            ctx.drawImage(plane, plane1X, plane1Y, width1, height1);
                            ctx.font = nicknameFont;
                            ctx.fillStyle = plane1Fillstyle;
                            ctx.fillText(planeName1, planeName1X, planeName1Y);
                            //buttons
                            moveUpButton.style.position = "absolute";
                            moveUpButton.style.fontSize = "50px";
                            moveUpButton.style.backgroundColor = "white";
                            moveUpButton.textContent = "^";
                            moveUpButton.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 230}px`;
                            moveUpButton.style.top = "365px";
                            moveDownButton.style.position = "absolute";
                            moveDownButton.style.fontSize = "49px";
                            moveDownButton.style.backgroundColor = "white";
                            moveDownButton.textContent = "v";
                            moveDownButton.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 230}px`;
                            moveDownButton.style.top = "440px";
                            moveRightButton.style.position = "absolute";
                            moveRightButton.style.fontSize = "50px";
                            moveRightButton.style.backgroundColor = "white";
                            moveRightButton.textContent = "<";
                            moveRightButton.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 172}px`;
                            moveRightButton.style.top = "402.5px";
                            moveLeftButton.style.position = "absolute";
                            moveLeftButton.style.fontSize = "50px";
                            moveLeftButton.style.backgroundColor = "white";
                            moveLeftButton.textContent = ">";
                            moveLeftButton.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 283}px`;
                            moveLeftButton.style.top = "402.5px";
                            colors.appendChild(moveUpButton);
                            colors.appendChild(moveDownButton);
                            colors.appendChild(moveRightButton);
                            colors.appendChild(moveLeftButton);
                            if (plane1X > canvas.width - width1) {
                                plane1X = canvas.width - width1;
                                planeName1X = plane1X - 3;
                            }
                            if (plane1X < 0) {
                                plane1X = 0;
                                planeName1X = plane1X - 3;
                            }
                            if (plane1Y < 0) {
                                plane1Y = 0;
                                planeName1Y = plane1Y + 3;
                            }
                            if (plane1Y > canvas.height - height1) {
                                plane1Y = canvas.height - height1;
                                planeName1Y = plane1Y + 3;
                            }
                            if (x2 > canvas.width - width1) {
                                x2 = canvas.width - width1;
                                name2X = x2 - 3;
                            }
                            if (x2 < 0) {
                                x2 = 0;
                                name2X = x2 - 3;
                            }
                            if (y2 < 0) {
                                y2 = 0;
                                name2Y = y2 + 3;
                            }
                            if (y2 > canvas.height - height1) {
                                y2 = canvas.height - height1;
                                name2Y = y2 + 3;
                            }
                            inputs();
                            socket.on("disconnected", (user) => {
                                localStorage.setItem("color", plane1FillStyle);
                                localStorage.setItem("name", name1);
                                localStorage.setItem("code", roominput.value);
                                document.body.removeChild(canvas);
                                document.location.reload();
                            });
                    }
                    socket.on("startMovingBothUp1", () => {
                        upPressed1 = true;
                    });
                    socket.on("stopMovingBothUp1", () => {
                        upPressed1 = false;
                    });
                    socket.on("startMovingBothUp2", () => {
                        upPressed2 = true;
                    });
                    socket.on("stopMovingBothUp2", () => {
                        upPressed2 = false;
                    });
                    socket.on("startMovingBothDown1", () => {
                        downPressed1 = true;
                    });
                    socket.on("stopMovingBothDown1", () => {
                        downPressed1 = false;
                    });
                    socket.on("startMovingBothDown2", () => {
                        downPressed2 = true;
                    });
                    socket.on("stopMovingBothDown2", () => {
                        downPressed2 = false;
                    });
                    socket.on("startMovingBothRight1", () => {
                        rightPressed1 = true;
                    });
                    socket.on("stopMovingBothRight1", () => {
                        rightPressed1 = false;
                    });
                    socket.on("startMovingBothRight2", () => {
                        rightPressed2 = true;
                    });
                    socket.on("stopMovingBothRight2", () => {
                        rightPressed2 = false;
                    });
                    socket.on("startMovingBothLeft1", () => {
                        leftPressed1 = true;
                    });
                    socket.on("stopMovingBothLeft1", () => {
                        leftPressed1 = false;
                    });
                    socket.on("startMovingBothLeft2", () => {
                        leftPressed2 = true;
                    });
                    socket.on("stopMovingBothLeft2", () => {
                        leftPressed2 = false;
                    });
                    function inputs() {
                        if (upPressed1) {
                            plane1Y -= speed;
                            planeName1Y -= speed;
                        }
                        if (upPressed2) {
                            y2 -= speed;
                            name2Y -= speed;
                        }
                        if (downPressed1) {
                            plane1Y += speed;
                            planeName1Y += speed;
                        }
                        if (downPressed2) {
                            y2 += speed;
                            name2Y += speed;
                        }
                        if (rightPressed1) {
                            plane1X -= speed;
                            planeName1X -= speed;
                        }
                        if (rightPressed2) {
                            x2 -= speed;
                            name2X -= speed;
                        }
                        if (leftPressed1) {
                            plane1X += speed;
                            planeName1X += speed;
                        }
                        if (leftPressed2) {
                            x2 += speed;
                            name2X += speed;
                        }
                    }
                        socket.on("moveBulletBoth1", (distance) => {
                            var dx = (distance.mX - bullet1X) / bulletSpeed;
                            var dy = (distance.mY - bullet1Y) / bulletSpeed;
                            bullet1Radius = 5;
                            var bullet = new Bullet1(bullet1X, bullet1Y, bullet1Radius);
                            bullets1.push(bullet);
                            for (var i = 0; i < bullets1.length; i++) {
                                bullets1[i].show();
                                bullets1[i].move();
                            }
                            function Bullet1(x, y, radius) {
                                this.x = x;
                                this.y = y;
                                this.radius = radius;
                                this.show = function() {
                                webkitRequestAnimationFrame(() => this.show());
                                ctx.beginPath();
                                ctx.fillStyle = bullet1FillStyle;
                                ctx.arc(x, y, radius, 0, Math.PI * 2);
                                ctx.closePath();
                                ctx.fill();
                                }
                                this.move = function() {
                                    if (x == bullet1X && y == bullet1Y) {
                                        setInterval(function() {
                                        x += dx;
                                        y += dy;
                                        }, 40);
                                        var hitBullet1 = setInterval(function() {
                                        if (x + radius >= x2 && x <= x2 + width1 && y <= y2 + height1 && y > y2) {
                                            clearInterval(hitBullet1);
                                            sound.play();
                                            radius = 0;
                                            scoreCounter1++;
                                            if (scoreCounter1 >= 5) {
                                                alert(planeName1 + " won!");
                                                document.location.reload();
                                            }
                                        }
                                    }, 0);
                                    }
                                    else {
                                        return;
                                    }
                                }
                            }
                    });
                    socket.on("moveBulletBoth2", (distance) => {
                            var dx = (distance.mX - bullet2X) / bulletSpeed;
                            var dy = (distance.mY - bullet2Y) / bulletSpeed;
                            bullet2Radius = 5;
                            var bullet = new Bullet2(bullet2X, bullet2Y, bullet2Radius);
                            bullets2.push(bullet);
                            for (var i = 0; i < bullets2.length; i++) {
                                bullets2[i].show();
                                bullets2[i].move();
                            }
                            function Bullet2(x, y, radius) {
                                this.x = x;
                                this.y = y;
                                this.radius = radius;
                                this.show = function() {
                                webkitRequestAnimationFrame(() => this.show());
                                ctx.beginPath();
                                ctx.fillStyle = bullet2FillStyle;
                                ctx.arc(x, y, radius, 0, Math.PI * 2);
                                ctx.closePath();
                                ctx.fill();
                                }
                                this.move = function() {
                                    if (x == bullet2X && y == bullet2Y) {
                                        setInterval(function() {
                                            x += dx;
                                            y += dy;
                                        }, 40);
                                        var hitBullet2 = setInterval(function() {
                                                if (x <= plane1X + width1 && x + radius >= plane1X && y >= plane1Y && y <= plane1Y + width1) {
                                                    clearInterval(hitBullet2);
                                                    sound.play();
                                                    radius = 0;
                                                    scoreCounter2++;
                                                    if (scoreCounter2 >= 5) {
                                                        alert(name2 + " won!");
                                                        document.location.reload();
                                                    }
                                                }
                                            }, 0);
                                        }
                                        else {
                                            return;
                                        }
                                    }
                                }
                    });
        });
    });
}
});
    }
}
function createARoomText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = createARoomTextFont;
    ctx.fillText("Create or Join a Game", 0, 200);
    ctx.fillText("With a Code", 120, 250);
}
red.onclick = redClick;
orange.onclick = orangeClick;
gold.onclick = goldClick;
green.onclick = greenClick;
blue.onclick = blueClick;
purple.onclick = purpleClick;
pink.onclick = pinkClick;
black.onclick = blackClick;
grey.onclick = greyClick;
function redClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planered.png";
    plane1FillStyle = "red";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function orangeClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planeorange.png";
    plane1FillStyle = "orange";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function goldClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planegold.png";
    plane1FillStyle = "gold";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function greenClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planegreen.png";
    plane1FillStyle = "green";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function blueClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planeblue.png";
    plane1FillStyle = "blue";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function purpleClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planepurple.png";
    plane1FillStyle = "purple";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function pinkClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planepink.png";
    plane1FillStyle = "pink";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function blackClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planeblack.png";
    plane1FillStyle = "black";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}
function greyClick() {
    pickAColorFont = "0px arial";
    red.style.display = "none";
    orange.style.display = "none";
    gold.style.display = "none";
    green.style.display = "none";
    blue.style.display = "none";
    purple.style.display = "none";
    pink.style.display = "none";
    black.style.display = "none";
    grey.style.display = "none";
    nicknameTextFont = "63px arial";
    nicknameinput.style.position = "absolute";
    nicknameinput.style.left = `${canvas.getBoundingClientRect().left + window.scrollX + 65}px`;
    nicknameinput.style.top = "300px";
    nicknameinput.style.borderWidth = "10px";
    nicknameinput.style.fontSize = "30px";
    colors.appendChild(nicknameinput);
    plane1.src = "planegrey.png";
    plane1FillStyle = "grey";
    nicknameinput.addEventListener("keydown", enterKeyPressNickname);
}