const getMarkers = "select * from markers";
const getUserMarkers =
  "SELECT markers.latitude, markers.longitude FROM users INNER JOIN markers ON users.marker_id = markers.id;";
const setMarkers = "INSERT INTO markers (latitude, longitude) VALUES ($1, $2)";
const setMarkerForUser = "UPDATE users SET marker_id = $1 WHERE name = $2";

const getMarkerByCoordinates =
  "SELECT * FROM markers WHERE latitude = $1 AND longitude = $2 AND NOT EXISTS (SELECT 1 FROM users WHERE marker_id = markers.id)";

const getMarkerById = "SELECT * FROM markers WHERE id = $1 ";

module.exports = {
  getMarkers,
  setMarkers,
  setMarkerForUser,
  getMarkerByCoordinates,
  getMarkerById,
  getUserMarkers,
};
