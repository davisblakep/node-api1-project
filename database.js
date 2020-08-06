let users = [
  { id: "1", name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane" },
  { id: "2", name: "Blake Davis", bio: "I like cheeseburgers." },
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(data) {
  const payload = {
    id: String(Date.now()),
    ...data,
  };
  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  const index = users.findIndex((user) => user.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };
  return users[index];
}

function deleteUser(id) {
  users = users.filter((user) => user.id != id);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
