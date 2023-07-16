const express = require("express");
const router = express.Router();

const controller = require("../controller/pledge");
const { valToken } = require("../middleware/auth"); //Requiring Controllers

router.post("/create_new_pledge", controller.createNewPledge);
router.get("/get_all_pledges", controller.getPledges);
router.post("/get_indie_pledge", controller.getIndiePledge);

module.exports = router;
