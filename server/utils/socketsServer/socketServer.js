const connectedUsers = [];
let socket = null;

const initSocketServer = (_socket) => {
  socket = _socket;
  socket.on('disconnect', (reason) => {
    userLeave(socket.id);
    console.log(`${socket.id} disconnected for ${reason}`);
  });
}

const userJoin = (user) => {

  socket.emit('notification', {
    message: "product on sale",
    date: (new Date()).toString()
  });
  const search = connectedUsers.find(connectedUser => {
    return String(connectedUser.user._id) == String(user._id)
  });

  if (search) {
    search.socket_id = socket.id;
    console.log(`${user._id} has updated his socket_id`);
  } else {
    connectedUsers.push({
      socket_id: socket.id,
      user: user
    });
    console.log(`${user._id} has just joined the network`);
  }

  return connectedUsers;
}

const getCurrentUser = (id) => {
  return connectedUsers.find(connectedUser => connectedUser.socket_id == id)
}

const getConnectedUsers = () => connectedUsers;

const userLeave = (id) => {
  const index = connectedUsers.find(connectedUser => connectedUser.socket_id == id);

  if (index !== -1) {
    return connectedUsers.splice(index, 1)[0];
  }
}

const sendNotification = ({
  userID,
  message,
  title
}) => {
  let socket_id = null;

  const search = connectedUsers.find(connectedUser => {
    return String(connectedUser.user._id) == String(userID)
  });

  if (search) {
    socket_id = search.socket_id;
    socket.to(socket_id).emit('notificatiation', {
      message: message,
      title: title
    });
  }

}

module.exports = {
  initSocketServer,
  userJoin,
  getConnectedUsers,
  getCurrentUser,
  userLeave,
  sendNotification,
};