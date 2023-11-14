const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");

require("dotenv").config();

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const PORT = process.env.PORT || 5000;

/**
 * Initializing our server
 */
const app = express();
const server = http.createServer(app);

/**
 * Instance for socket.io
 */
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST"],
    credentials: true,
  },
});

/**
 * Connection to database
 */
mongoose.connect(
  "mongodb+srv://vageigitian:xxxx@cluster0.kftx6.gcp.mongodb.net/chat?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

/**
 * Socket connection
 */
io.on("connection", (socket) => {
  const getCurrentTime = () => {
    let now = new Date();
    return now.getHours() + ":" + now.getMinutes();
  };

  /**
   * Joining
   */
  socket.on("join", ({ name, room, photo }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
      photo,
    });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to '${user.room}'`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  /**
   * Sending messages
   */
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      time: getCurrentTime(),
      photo: user.photo,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  /**
   * Disconnecting
   */
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} had left`,
      });
    }
  });
});

app.use(cors());
app.use(express.json());

/**
 * Using our apis from router
 */
app.use(router);

/**
 * Running our server
 */
server.listen(PORT, () => console.log(`Server has started on port:${PORT}`));
