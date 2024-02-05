const pool = require("../../db");
const queries = require("./queries");

const getMarker = (req, res) => {
  pool.query(queries.getUserMarkers, (error, results) => {
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

const getMarkerByCoordinates = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const markerId = await pool.query(queries.getMarkerByCoordinates, [
      latitude,
      longitude,
    ]);

    if (markerId && markerId.rows && markerId.rows.length > 0) {
      res
        .status(200)
        .json({ message: "Маркер найден", result: markerId.rows[0].id });
    } else {
      res
        .status(404)
        .json({ message: "Маркер не найден", latitude, longitude });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера: " + error.message });
  }
};

const setMarkerForUser = async (req, res) => {
  try {
    const { id, name } = req.body;

    const result = await pool.query(queries.setMarkerForUser, [id, name]);

    if (result && result.rows && result.rows.length > 0) {
      res.status(200).json({ message: "маркер установлен", result: result });
    } else res.status(402).json({ message: "маркер не установлен", name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const getMarkerById = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await pool.query(queries.getMarkerById, [id]);
    const markerId = result.rows[0];

    if (result && result.rows && result.rows.length > 0) {
      res.status(200).json({ message: "маркер найден", result: markerId });
    } else res.status(402).json({ message: "маркер найден" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getMarker,
  setMarker,
  getMarkerByCoordinates,
  setMarkerForUser,
  getMarkerById,
};
