const getUsers = "select * from users";
const setUsers =
  "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";
const getUserByUsername = "SELECT * FROM users WHERE name = $1";

module.exports = {
  getUsers,
  setUsers,
  getUserByUsername,
};
