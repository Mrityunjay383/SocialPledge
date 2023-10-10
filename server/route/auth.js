const express = require("express");
const router = express.Router();

const controller = require("../controller/auth"); //Requiring Controllers

router.post("/otp", controller.otp);
router.post("/register", controller.register);

router.get("/logout", controller.logout);

module.exports = router;
