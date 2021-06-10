const connectedUsers = [];
let socket = null;

const initSocketServer = (_socket) => {
  socket = _socket;
  socket.on('disconnect', (reason)=>{
    console.log(`${socket.id} disconnected for ${reason}`);
  });
}

const userJoin = (user) => {

  const search = connectedUsers.find(connectedUser => {
    return connectedUser.user._id == user._id
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

module.exports = {
  initSocketServer,
  userJoin,
  getConnectedUsers,
  getCurrentUser,
  userLeave,
};