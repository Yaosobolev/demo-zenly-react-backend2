const getMarkers = "select * from markers";
const setMarkers = "INSERT INTO markers (latitude, longitude) VALUES ($1, $2)";

module.exports = {
  getMarkers,
  setMarkers,
};
