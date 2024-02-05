const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/search-user", controller.getUserByUsername);

module.exports = router;
