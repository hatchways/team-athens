const socketio = require("socket.io");
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

  io.on("connection", (socket) => {
    req.socket = socket;

    console.log(`${socket.id} connected`);

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

    socket.on("userJoin", (user) => {
      if(user === undefined) return;

      const index = connectedUsers.online.findIndex((userOnline)=>{
        return String(userOnline.id) === String(user.id);
      });

      if(index === -1) {
        user.socket_id = socket.id;
        connectedUsers.online.push(user);
      }

      sendNotification(socket, {
        message: `${user.username}: This is a notification from the api socket`,
        title: "Notification test",
      });

      console.log(connectedUsers);
    });

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
