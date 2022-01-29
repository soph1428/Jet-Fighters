const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/jetfighters.html");
});
app.use(express.static(__dirname));
const codes = [];
const planes = {};
io.on("connection", (socket) => {
  console.log("a user has connected");
  socket.on("new game", (code) => {
    console.log(code.code);
  const countDuplicates = function(codes, value) {
    return codes.reduce((count, elem) => {
      return (value == elem ? count + 1 : count)
    }, 0);
  }
  console.log(countDuplicates(codes, code.code));
    codes.push(code.code);
    console.log(codes);
  socket.on("join game", (gameInput) => {
    var duplicateCodes = codes.reduce((count, value, index, codes) => {
      if (codes.indexOf(value) != index && !count.includes(value))
      count.push(value);
      return count;
    }, []);
    socket.on("startMovingUp1", () => {
      io.in(gameInput).emit("startMovingBothUp1");
    });
    socket.on("stopMovingUp1", () => {
      io.in(gameInput).emit("stopMovingBothUp1");
    });
    socket.on("startMovingUp2", () => {
      io.in(gameInput).emit("startMovingBothUp2");
    });
    socket.on("stopMovingUp2", () => {
      io.in(gameInput).emit("stopMovingBothUp2");
    });
    socket.on("startMovingDown1", () => {
      io.in(gameInput).emit("startMovingBothDown1");
    });
    socket.on("stopMovingDown1", () => {
      io.in(gameInput).emit("stopMovingBothDown1");
    });
    socket.on("startMovingDown2", () => {
      io.in(gameInput).emit("startMovingBothDown2");
    });
    socket.on("stopMovingDown2", () => {
      io.in(gameInput).emit("stopMovingBothDown2");
    });
    socket.on("startMovingRight1", () => {
      io.in(gameInput).emit("startMovingBothRight1");
    });
    socket.on("stopMovingRight1", () => {
      io.in(gameInput).emit("stopMovingBothRight1");
    });
    socket.on("startMovingRight2", () => {
      io.in(gameInput).emit("startMovingBothRight2");
    });
    socket.on("stopMovingRight2", () => {
      io.in(gameInput).emit("stopMovingBothRight2");
    });
    socket.on("startMovingLeft1", () => {
      io.in(gameInput).emit("startMovingBothLeft1");
    });
    socket.on("stopMovingLeft1", () => {
      io.in(gameInput).emit("stopMovingBothLeft1");
    });
    socket.on("startMovingLeft2", () => {
      io.in(gameInput).emit("startMovingBothLeft2");
    });
    socket.on("stopMovingLeft2", () => {
      io.in(gameInput).emit("stopMovingBothLeft2");
    });
    socket.on("plane1 won", () => {
      io.in(gameInput).emit("plane1 won both");
    });
    socket.on("moveBullet1", (distance) => {
      io.in(gameInput).emit("moveBulletBoth1", {
        mX: distance.mX,
        mY: distance.mY
      });
    });
    socket.on("plane2 won", () => {
      io.in(gameInput).emit("plane2 won both");
    })
    socket.on("moveBullet2", (mouse) => {
      io.in(gameInput).emit("moveBulletBoth2", {
        mX: mouse.mX,
        mY: mouse.mY
    });
    });
    if (io.engine.clientsCount > 1) {
      if (countDuplicates(codes, code.code) == 3) {
        socket.emit("full room", code.code);
        socket.removeListener("disconnect", disconnect);
        return;
      }
      console.log(countDuplicates(codes, code.code));
      if (duplicateCodes.includes(gameInput) &&
      code.code == gameInput && countDuplicates(codes, code.code) == 2) {
        socket.join(gameInput);
        io.in(gameInput).emit("joined game", {
          code: gameInput,
          plane: code.plane,
          planeSrc: code.planeSrc,
          x: code.x,
          y: code.y,
          nickname: code.name,
          nameX: code.nameX,
          nameY: code.nameY,
          color: code.fillstyle
        });
        console.log("a user has joined a used room");
      planes[code.code][socket.id] = {
          name: code.name,
          x: code.x,
          y: code.y,
          nameX: code.nameX,
          nameY: code.nameY,
          plane: code.plane,
          planeSrc: code.planeSrc,
          color: code.fillstyle
      }
      if (Object.values(planes[code.code])[0].name == Object.values(planes[code.code])[1].name) {
        socket.emit("name used", code.name);
      }
      io.in(gameInput).emit("gameState", planes);
      console.log(planes);
    }
    else if (countDuplicates(codes, code.code) == 1) {
      socket.join(gameInput);
    console.log("a user has created a room");
    planes[code.code] = {
      [socket.id]: {
      name: code.name,
      x: code.x,
      y: code.y,
      nameX: code.nameX,
      nameY: code.nameY,
      plane: code.plane,
      planeSrc: code.planeSrc,
      color: code.fillstyle
    }
  }
    console.log(planes);
    }
  }
  if (io.engine.clientsCount === 1) {
  socket.join(gameInput);
    console.log("a user has created a room");
    planes[code.code] = {
      [socket.id]: {
      name: code.name,
      x: code.x,
      y: code.y,
      nameX: code.nameX,
      nameY: code.nameY,
      plane: code.plane,
      planeSrc: code.planeSrc,
      color: code.fillstyle
    }
  }
  console.log(planes);
  }
  function disconnect() {
    socket.leave(gameInput);
    delete planes[code.code][socket.id];
    var noDuplicateCodes = [...new Set(codes)];
    noDuplicateCodes.forEach((value, i) =>
      gameInput == value && codes.indexOf(value) != codes.lastIndexOf(value)
        ? codes.splice(codes.indexOf(value), 1)
        : null
    );
    io.in(gameInput)
      .allSockets()
      .then((result) => {
        console.log(result.size);
        if (result.size == 0) {
          codes.splice(codes.indexOf(gameInput), 1);
        }
      });
    console.log(codes);
    console.log(planes);
    if (
      io.engine.clientsCount > 0 &&
      Object.values(planes[code.code])[0] != undefined
    ) {
      console.log("a user in a used room disconnected");
      socket.to(gameInput).emit("disconnected", {
        planeSrc: Object.values(planes[code.code])[0].planeSrc,
        planeX: Object.values(planes[code.code])[0].x,
        planeY: Object.values(planes[code.code])[0].y,
        color: Object.values(planes[code.code])[0].color,
        nickname: Object.values(planes[code.code])[0].name,
        nicknameX: Object.values(planes[code.code])[0].nameX,
        nicknameY: Object.values(planes[code.code])[0].nameY,
      });
    }
    console.log("a user has disconnected");
  }
  socket.on("disconnect", disconnect);
});
});
});
http.listen(process.env.PORT || 5500, "0.0.0.0", () => {
  console.log("listening on server");
});