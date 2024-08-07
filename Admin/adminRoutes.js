const express = require("express");
const router = express.Router();
const controller = require("../Admin/adminController");
const authenticateToken = require("../middlewares/adminAuthentication");
const cors = require("cors");

let corsOptions = {
  origin: ["http://localhost:5000"],
};

router.post("/addAdmin", cors(corsOptions), controller.addAdmin);
router.post("/adminLogin", cors(corsOptions), controller.adminLogin);
router.get(
  "/adminProfile/:id",
  cors(corsOptions),
  authenticateToken,
  controller.getAdminProfile
);
module.exports = router;
