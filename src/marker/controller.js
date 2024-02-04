const pool = require("../../db");
const queries = require("./queries");

const getMarker = (req, res) => {
  pool.query(queries.getMarkers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const setMarker = (req, res) => {
  const { latitude, longitude } = req.body;

  pool.query(queries.setMarkers, [latitude, longitude], (error, results) => {
    if (error) throw error;
    res.status(201).send("Marker create");
  });
};

module.exports = {
  getMarker,
  setMarker,
};
