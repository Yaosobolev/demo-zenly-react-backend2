const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getMarker);
router.post("/", controller.setMarker);

module.exports = router;
