/**
 * Adding a new user
 */
const addUser = ({ id, name, room, photo }) => {
  name = name.trim();
  room = room.trim().toLowerCase();

  const user = { id, name, room, photo };

  if (!room) return { error: "Room name and password are required!" };

  users.push(user);

  return { user };
};

/**
 * Removing a user
 */
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

/**
 * Getting a specific user
 */
const getUser = (id) => users.find((user) => user.id === id);

/**
 * Getting all users in specific room
 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
