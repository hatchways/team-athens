const socketio = require("socket.io");
const User = require("../models/User");
const connectedUsers = {online: []};

const initSocketServer = (server, req) => {

  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
    },
  });
  req.io = io;

  function userIsAuthenticated() {
    return req.user;
  }

  io.on("connection", async (socket) => {
    req.socket = socket;

    socket.on("disconnect", (reason) => {

      console.log(`${socket.id} disconnected for ${reason}`);
      const index = connectedUsers.online.findIndex((userOnline)=>{
        return userOnline.socket_id === socket.id;
      });

      if(index !== -1) {
        connectedUsers.online.splice(index, 1);
      }

      socket.disconnect();
      console.log(connectedUsers);
    });

    if(userIsAuthenticated()) {

      const user = await User.findById(req.user.id);

      if(!user) return;

      const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        socket_id: socket.id
      };

      const index = connectedUsers.online.findIndex((userOnline)=>{
        return String(userOnline.id) === String(user.id);
      });

      if(index === -1) {
        user.socket_id = socket.id;
        connectedUsers.online.push(userData);
      }

      sendNotification(socket, {
        message: `${user.username}: This is a notification from the api socket`,
        title: "Notification test",
      });

      console.log(connectedUsers);
    }

  });
};

// socket could be passed with req.socket
const sendNotification = (socket, { message, title }) => {
  socket.emit("notification", {
    message: message,
    title: title,
    date: new Date().toString(),
  });
};

module.exports = {
  initSocketServer,
  sendNotification,
};
