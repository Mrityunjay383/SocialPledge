const express = require("express");
const router = express.Router();

const controller = require("../controller/auth"); //Requring Controllers

router.post("/otp", controller.otp);
router.post("/register", controller.register);

router.post("/login", controller.login);
router.get("/logout", controller.logout);

module.exports = router;
