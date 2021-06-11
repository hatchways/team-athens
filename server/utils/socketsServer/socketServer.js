const socketio = require("socket.io");

const connectedUsers = {};
let socket = null;
let io = null;

const initSocketServer = (server, req) => {

  if(!io) {
    io = socketio(server, {
      cors: {
        origin: "*"
      }
    });
    req.io = io;
  }

  io.on("connection", _socket => {
    socket = _socket;

    console.log(`${socket.id} connected`);

    socket.on('disconnect', (reason) => {
      userLeave(socket.id);
      socket.disconnect();
      console.log(`${socket.id} disconnected for ${reason}`);
    });

  });
}

const userJoin = (user) => {

  connectedUsers[socket.id] = user;

  console.log(connectedUsers);

  setTimeout(() => {
    sendNotification({
      message: `${user.username}: This is a notification from the api socket"`,
      title: "Notification test"
    });
  }, 1000);

  console.log(`${user._id} has just joined the network`);

  return connectedUsers;
}

const getCurrentUser = (socket_id) => {

  if(connectedUsers.hasOwnProperty(socket_id)) {
    return connectedUsers[socket_id]; 
  }

  return undefined;
}

const getConnectedUsers = () => connectedUsers;

const userLeave = (socket_id) => {

  console.log(connectedUsers);
  if(connectedUsers.hasOwnProperty(socket_id)) {
    delete connectedUsers[socket_id]; 
  }

  return connectedUsers;

}

const sendNotification = ({
  message,
  title
}) => {
  socket.emit('notification', {
    message: message,
    title: title,
    date: (new Date()).toString(),
  });

}

module.exports = {
  initSocketServer,
  userJoin,
  getConnectedUsers,
  getCurrentUser,
  userLeave,
  sendNotification,
};