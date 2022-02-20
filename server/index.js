const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
const User = require("./models/user.model");
const app = require("./app");

var users_m = [];

dotenv.config();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origins: ["192.168.0.54:3000"],
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket, user_id) => {
  socket.join("everyone");

  socket.on("c-get-all-users", async (user_id) => {
    const filter = { _id: user_id };
    const update = { socket_id: socket.id };
    await User.findOneAndUpdate(filter, update);

    users_m = await User.find({});
    const users = [];
    users_m.forEach((user) => {
      users.push({
        username: user.username,
        socket_id: user.socket_id,
      });
    });
    io.to("everyone").emit("s-get-all-users", users);
  });

  socket.on("c-new-direct-message", (data) => {
    io.to(data.socket_id).emit("s-new-message", data);
    if(data.socket_id !== "everyone") socket.emit("s-new-message", data);
  });

  socket.on("disconnect", async () => {
    console.log(`${socket.id} is disconnected`);
    const filter = { socket_id: socket.id };
    const update = { socket_id: null };
    let user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    const users_m = await User.find({});
    const users = [];
    users_m.forEach((user) => {
      users.push({
        username: user.username,
        socket_id: user.socket_id,
      });
    });
    io.to("everyone").emit("s-get-all-users", users);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
