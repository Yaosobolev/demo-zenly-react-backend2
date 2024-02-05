const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getMarker);
router.post("/", controller.setMarker);
router.get("/search-marker-id", controller.getMarkerByCoordinates);
router.put("/set-marker", controller.setMarkerForUser);
router.get("/search-marker-coor", controller.getMarkerById);

module.exports = router;
