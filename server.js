const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   socket.join("room1");
//   io.to("room1").emit("chat message", "A new user has joined room1");
//   console.log("a user connected.");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

io.on("connection", (socket) => {
  socket.on("room", (room) => {
    socket.join(room);

    io.to(room).emit("chat message", `A user has joined ${room}`);

    socket.on("chat message", (msg) => {
      io.to(room).emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      io.to(room).emit("chat message", `A user has left ${room}`);
    });
  });
});

http.listen(5000, () => {
  console.log("listening on *:5000");
});
